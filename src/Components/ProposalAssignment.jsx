import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import DashBoard from "./AdminDashboard";
import Container from "@material-ui/core/Container";
import axios from "axios";
import {Card, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    card: {
        padding: ".5em",
        marginBottom: "1em",
        // maxWidth: '60%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 340,
    },
    redBackground: {
        backgroundColor: "#ff3a52 !important",
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function ProposalAssignment(props) {
    const classes = useStyles();
    const [teams, setTeams] = useState([]);
    const [titleMap, setTitleMap] = useState(new Map());
    const [idMap, setIdMap] = useState(new Map());
    const [pairings, setPairings] = useState([]);
    const [showPairings, setShowPairings] = useState(false);

    const [selectedProjects, setSelectedProjects] = useState([]);
    const [remainingProjects, setRemainingProjects] = useState([]);
    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/proposals`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            let acceptedProps = res["data"].filter(
                (proposal) => proposal["status"] === "Accepted"
            );
            setRemainingProjects(acceptedProps.map((project) => project["title"]));
            let tempMap = new Map();
            let tempIdMap = new Map();
            acceptedProps.forEach((project) => {
                    tempMap.set(project["title"], project);
                    tempIdMap.set(project["_id"], project);
                }
            );
            console.log('tempIdMap', tempIdMap)
            setTitleMap(tempMap);
            setIdMap(tempIdMap);
        });
        axios.get(`http://localhost:5000/teams`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            // console.log('teams', res);
            setTeams(res.data);
            const fillArray = new Array(res.data.length);
            fillArray.fill("None Selected");
            setSelectedProjects(fillArray);
            let localPairingArray = [];
            for (let i = 0; i < res.data.length; i++) {
                localPairingArray.push({teamName: res.data[i].teamName, projectTitle: res.data[i].projectTitle});
                if (res.data[i].projectId !== "Pending") {
                    setShowPairings(true);
                }
            }
            setPairings(localPairingArray)
        });
    }, []);


    function handleChange(e, index, team) {
        let temp;
        temp = [...selectedProjects];
        temp[index] = e.target.value;
        setSelectedProjects(temp);
        setDisableButton(false);
    }

    function submitAssignments() {
        let assignmentArray = [];
        let localPairingsArray = [];
        teams.forEach((team, index) => {
            const teamId = team["_id"];
            const projectId = titleMap.get(selectedProjects[index])["_id"];
            const projectTitle = titleMap.get(selectedProjects[index])["title"];
            assignmentArray.push({teamId: teamId, projectId: projectId, projectTitle: projectTitle});

            const teamName = team["teamName"];
            localPairingsArray.push({teamName: teamName, projectTitle: projectTitle});
        });
        setPairings(localPairingsArray);
        axios
            .post(`http://localhost:5000/teams/assignments`, {
                assignments: assignmentArray,
            })
            .then(() => {
                alert("Assignments submitted");
                setShowPairings(true);
            });
    }

    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container maxWidth="md">
                    <List>
                        {
                            showPairings ?
                                <><Typography variant="h4">Current Assignments</Typography>
                                    <Card>
                                        {pairings.map((pairing, i) => <React.Fragment key={i}>
                                                <ListItem>
                                                    <ListItemText>{pairing.teamName} : {pairing.projectTitle}</ListItemText>
                                                </ListItem>
                                                <Divider/>
                                            </React.Fragment>
                                        )
                                        }

                                    </Card>
                                </>
                                : null}
                    </List>
                    <h1>Assign Projects to Teams</h1>
                    {teams.map((team, index) => (
                        <Card className={classes.card} key={index} variant="outlined">
                            <Typography>{team.teamName}</Typography>
                            <Divider/>
                            <Grid container direction="row">
                                <Grid item>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Typography>Ideal Rankings</Typography>
                                        </Grid>
                                        {team.proposalRanks.map((t, i) => (
                                            <Grid item key={i}>
                                                {idMap.get(t) ?
                                                    <Typography>{i+1}. {idMap.get(t).title}</Typography>
                                                    : null}
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                                <Grid item style={{marginLeft: "20%", marginTop: "1%"}}>
                                    {selectedProjects.length > 0 ? (
                                        <FormControl className={classes.formControl}>
                                            <InputLabel>Select Project</InputLabel>
                                            <Select
                                                value={selectedProjects[index]}
                                                onChange={(e) => handleChange(e, index, team)}
                                                MenuProps={MenuProps}
                                            >
                                                {remainingProjects.map((proposal, i) => (
                                                    <MenuItem
                                                        key={i}
                                                        value={proposal}
                                                        className={
                                                            selectedProjects.includes(proposal)
                                                                ? classes.redBackground
                                                                : "none"
                                                        }
                                                    >
                                                        {proposal}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : null}
                                </Grid>
                            </Grid>
                        </Card>
                    ))}
                    <Button disabled={disableButton} variant="contained" onClick={submitAssignments}>
                        Submit
                    </Button>

                </Container>
            </main>
        </div>
    );
}

export default ProposalAssignment;
