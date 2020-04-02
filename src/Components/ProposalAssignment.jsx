import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import DashBoard from "./DashBoard";
import Container from "@material-ui/core/Container";
import axios from 'axios';
import {Card, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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
        maxWidth: '60%'
    }
}));

function ProposalAssignment(props) {
    const classes = useStyles();
    const [teams, setTeams] = useState([]);
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/teams/Spring2020`).then(res => {
            console.log('teams', res);
            setTeams(res['data']);
        });
        axios.get(`http://localhost:5000/proposals`).then(res => {
            console.log('proposals', res);
            let acceptedProps = res['data'].filter(proposal => proposal['status'] === "Accepted");
            console.log(acceptedProps);
            setProposals(acceptedProps);
        })
    }, []);
    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container maxWidth="xs">
                    <h1>Assign Projects to Teams</h1>
                    {
                        teams.map((team, i)=>
                        <Card className={classes.card} key={i}>
                            {/*<CardContent>*/}
                                <Typography>{team.teamName}</Typography>
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
