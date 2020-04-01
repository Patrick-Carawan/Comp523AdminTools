import React, {useEffect, useState} from 'react';
import DashBoard from "./DashBoard";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
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

function FinalReports() {
    const classes = useStyles();
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/teams`).then((res) => {
            console.log(res['data']);
        })
    }, []);
    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container maxWidth="sm">
                    <h1>Select Team to View Reports</h1>
                </Container>
            </main>
        </div>);
}

export default FinalReports;
