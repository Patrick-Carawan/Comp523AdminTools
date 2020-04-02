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
    card:{
        padding: '.5em',
        marginBottom: '1em',
        // maxWidth: '60%'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginLeft: '5%'
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
    const [teams, setTeams] = useState([]);
    const [teamSelect, setTeamSelect] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [pairings, setPairings] = useState(new Map());

    useEffect(()=> console.log(pairings),[pairings]);
    useEffect(() => {
        axios.get(`http://localhost:5000/teams/Spring2020`).then(res => {
            console.log('teams', res);
            const allTeams = res['data'];
            let teamMap = new Map();
            allTeams.forEach(team => teamMap.set(team,'No Project'));
            setPairings(teamMap);
            const fillArray = new Array(allTeams.length);
            fillArray.fill(-1);
            setTeamSelect(fillArray);
            setTeams(allTeams);
        });
        axios.get(`http://localhost:5000/proposals`).then(res => {
            console.log('proposals', res);
            let acceptedProps = res['data'].filter(proposal => proposal['status'] === "Accepted");
            setProposals(acceptedProps);
            console.log(acceptedProps);

        })
    }, []);

    function handleChange(e,index) {
        const copy = [...teamSelect];
        copy.splice(index, 1, e.target.value);
        setTeamSelect(copy);
    }

    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container maxWidth="xs">
                    <h1>Assign Projects to Teams</h1>
                    {
                        teams.map((team, index)=>
                        <Card className={classes.card} key={index}>
                            {/*<CardContent>*/}
                                <Typography>{team.teamName}</Typography>

                            <FormControl className={classes.formControl}>
                                <InputLabel>Select Project</InputLabel>
                                <Select
                                    value={teamSelect[index]}
                                    onChange={(e)=>handleChange(e,index)}
                                    MenuProps={MenuProps}
                                >
                                    {proposals.map((proposal, i) => (
                                        <MenuItem key={i} value={proposal._id}>
                                            {proposal.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {/*</CardContent>*/}
                        </Card>
                        )
                    }
                </Container>
            </main>
        </div>
    );
}

export default ProposalAssignment;
