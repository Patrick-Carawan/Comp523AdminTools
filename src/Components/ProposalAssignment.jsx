import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import DashBoard from "./DashBoard";
import Container from "@material-ui/core/Container";
import axios from 'axios';
import {Card, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    card: {
        padding: '.5em',
        marginBottom: '1em',
        // maxWidth: '60%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 340
    },
    redBackground: {
        backgroundColor: '#ff3a52 !important'
    }
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
    const [rankings, setRankings] = useState([]);
    const [titleMap, setTitleMap] = useState(new Map());

    const [selectedProjects, setSelectedProjects] = useState([]);
    const [remainingProjects, setRemainingProjects] = useState([]);
    // const [pairings, setPairings] = useState(new Map());

    useEffect(() => {
        axios.get(`http://localhost:5000/teams/rankings`).then(res => {
            console.log('rankings', res);
            setRankings(res.data);
            const fillArray = new Array(res.data.length);
            fillArray.fill('None Selected');
            setSelectedProjects(fillArray)
        });

        axios.get(`http://localhost:5000/proposals`).then(res => {
            console.log('proposals', res);
            let acceptedProps = res['data'].filter(proposal => proposal['status'] === "Accepted");
            setRemainingProjects(acceptedProps.map(project => project['title']));
            let tempMap = new Map();
            acceptedProps.forEach(project => tempMap.set(project['title'], project));
            setTitleMap(tempMap)
            console.log('in setup useeffect', tempMap)

        });

    }, []);


    function handleChange(e, index, team) {
        let temp;
        temp = [...selectedProjects];
        temp[index] = e.target.value;
        setSelectedProjects(temp);
    }

    function submitAssignments() {
        // const newObj = {};
        // pairings.forEach((value, key)=>{
        //     if(key['_id'] === undefined) key = "No Project Assigned"
        //
        //     newObj[`${key['_id']}`] = value['_id']
        // });
        // console.log(newObj)

        // let assignmentsArray = [];
        // pairings.forEach((v, k) => {
        //     let tempObj = {}
        //     if (k['_id'] === undefined) {
        //         tempObj['teamId'] = `${k['_id']}`;
        //         tempObj['projectId'] = "Pending";
        //     } else {
        //         tempObj['teamId'] = `${k['_id']}`;
        //         tempObj['projectId'] = v['_id'];
        //     }
        //     assignmentsArray.push(tempObj);
        //
        // });
        // console.log(assignmentsArray);
    }

    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container maxWidth="md">
                    <h1>Assign Projects to Teams</h1>
                    {
                        rankings.map((team, index) =>
                            <Card className={classes.card} key={index} variant="outlined">
                                <Typography>{team.teamName}</Typography>
                                <Divider/>
                                <Grid container direction="row">
                                    <Grid item>
                                        <Grid container direction="column">
                                            <Grid item>
                                                <Typography>Ideal Rankings</Typography>
                                            </Grid>
                                            {team.proposalRanks.map((t, i) => <Grid item key={i}>
                                                <Typography>{t}</Typography>
                                            </Grid>)}
                                        </Grid>
                                    </Grid>
                                    <Grid item style={{'marginLeft': '20%', 'marginTop': '1%'}}>
                                        {selectedProjects.length > 0 ?
                                            <FormControl className={classes.formControl}>
                                                <InputLabel>Select Project</InputLabel>
                                                <Select
                                                    value={selectedProjects[index]}
                                                    onChange={(e) => handleChange(e, index, team)}
                                                    MenuProps={MenuProps}
                                                >
                                                    {remainingProjects.map((proposal, i) => (
                                                        <MenuItem key={i} value={proposal} className={
                                                            selectedProjects.includes(proposal) ? classes.redBackground: 'none'
                                                        }>
                                                            {proposal}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            : null}
                                    </Grid>
                                </Grid>
                            </Card>
                        )
                    }
                    <Button variant="contained" onClick={submitAssignments}>Submit</Button>
                </Container>
            </main>
        </div>
    );
}

export default ProposalAssignment;
