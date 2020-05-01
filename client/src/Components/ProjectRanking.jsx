import React, {useEffect, useState} from 'react'
import DraggableProposal from './DraggableProposal'
import update from 'immutability-helper'
import Grid from "@material-ui/core/Grid";
import DashBoard from "./StudentDashboard";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios';
import Button from "@material-ui/core/Button";


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
}));

const ProjectRanking = () => {
    const classes = useStyles();
    const [proposals, setProposals] = useState([]);

    useEffect(() => {


        //gets all available proposals from backend
        axios.get(`/proposals/`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log(res['data']);
            setProposals(res['data'].filter(proposal => proposal['status'].toLowerCase() === "accepted"))
        })
    }, []);

    useEffect(() => console.log(proposals), [proposals]);


    const submitRanking = function () {
        let teamId = window.localStorage.getItem('teamId');
        let rankings = proposals.map(proposal => proposal['_id']);
        axios.post(`/teams/updateRankings/${teamId}`, {
            proposalRanks: rankings
        }, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then(()=>alert('Project preferences submitted')).catch(err => alert(err))
    };

    //lets user drag and drop proposals in order
    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = proposals[dragIndex];
        setProposals(
            update(proposals, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }),
        )
    };
    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container maxWidth="lg">
                    <Button variant="contained" color="secondary" onClick={submitRanking}>Submit Rankings</Button>
                    {proposals.map((proposal, i) => (
                        <Grid container direction="column" justify="flex-start" alignItems="stretch" key={i}>
                            <Grid item>
                                <DraggableProposal
                                    index={i}
                                    id={i}
                                    title={proposal.title}
                                    prop_name={proposal.prop_name}
                                    info_url={proposal.info_url}
                                    description={proposal.description}
                                    hardware_requirements={proposal.hardware_requirements}
                                    tech_requirements={proposal.tech_requirements}
                                    moveCard={moveCard}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Container>
            </main>
        </div>
    )
};
export default ProjectRanking
