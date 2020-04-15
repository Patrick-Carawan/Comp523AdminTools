import React, {useEffect, useState} from 'react'
import DraggableProposal from './DraggableProposal'
import update from 'immutability-helper'
import Grid from "@material-ui/core/Grid";
import lorem from "../lorem";
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

const staticProposals = [{
    title: 'iPhone App',
    firstName: 'Jane',
    lastName: 'Doe',
    description: `This is the description of the first project. Hopefully some students would like to work on this project because it is really cool ${lorem}`,
    url: 'www.project1url.com',
    hardwareReq: 'These are the hardware restrictions for the first project. You have to use Apple, sheeple.',
    softwareReq: 'You can only code in fortran because I am a progressive professor.'
}, {
    title: 'Website',
    firstName: 'John',
    lastName: 'Smith',
    description: `This is the description of the second project. Hopefully some students would like to work on this project because it is really cool. ${lorem}`,
    url: 'www.project2url.com',
    hardwareReq: 'These are the hardware restrictions for the second project. You have to use Windows, #PCMasterRace.',
    softwareReq: 'You can use whatever language you want.'
}, {
    title: 'Android App',
    firstName: 'Sam',
    lastName: 'Sung',
    description: `This is the description of the third project. Hopefully some students would like to work on this project because it is really cool. ${lorem}`,
    url: 'www.project3url.com',
    hardwareReq: 'These are the hardware restrictions for the third project. Android dev, Oreo or newer.',
    softwareReq: 'Let\'s use Kotlin.'
}];
const ProjectRanking = () => {
    const classes = useStyles();
    const [proposals, setProposals] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:5000/proposals/`).then((res)=>{
            console.log(res['data']);
            setProposals(res['data'].filter(proposal => proposal['status'].toLowerCase() === "accepted"))
        })
    },[]);

    useEffect(()=> console.log(proposals),[proposals]);


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
            {console.log(window.innerHeight)}
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container maxWidth="lg">
                    <Button>Submit Rankings</Button>
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
