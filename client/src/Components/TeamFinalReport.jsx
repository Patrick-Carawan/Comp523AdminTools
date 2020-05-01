import React, {useEffect, useState} from 'react'
import DashBoard from "./StudentDashboard";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


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
    textField: {
        width: '100%',
        marginBottom: '2em'
    }
}));

const TeamFinalReport = () => {
    const classes = useStyles();
    const [report, setReport] = useState('');

    const submitReport = function () {
        axios.post(`/finalReports/teams`, {
            team: window.localStorage.getItem('teamId'),
            text: report
        },{
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            alert('Final Report Submitted')
        })
    };


    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container maxWidth="lg">
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <Typography variant="h3">
                                Team Final Report
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                Only one group member needs to submit this report.
                            </Typography>
                        </Grid>
                        <Grid item className={classes.textField}>
                            <TextField
                                multiline
                                fullWidth
                                variant="outlined"
                                label="Type final report here."
                                onChange={(e) => setReport(e.target.value)}>
                            </TextField>
                        </Grid>
                        <Grid item>
                            <Button variant="contained"
                                    color="secondary"
                                    title="This will overwrite any previous submissions"
                                    onClick={submitReport}>
                                Submit Team Final Report
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )
};
export default TeamFinalReport;
