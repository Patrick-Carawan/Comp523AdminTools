import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import DashBoard from "./DashBoard";
import Container from "@material-ui/core/Container";
import axios from 'axios';

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
}));

function ProposalAssignment(props) {
    const classes = useStyles();
    const [teams, setTeams] = useState([]);
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/teams/Spring2020`).then(res => {
            console.log('teams',res);
            setTeams(res['data']);
        });
        axios.get(`http://localhost:5000/proposals`).then(res =>{
            console.log('proposals',res);
            setProposals(res['data']);
        })
    },[]);
    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container maxWidth="md">


                </Container>
            </main>
        </div>
    );
}

export default ProposalAssignment;
