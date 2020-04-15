import React, {useEffect, useState} from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Proposal from "./Proposal";
import {makeStyles} from "@material-ui/core/styles";
import DashBoard from "./AdminDashboard";
import Box from "@material-ui/core/Box";
import axios from 'axios';
import {ExpansionPanel, ExpansionPanelDetails} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";

const proposals = [{
    title: 'iPhone App',
    firstName: 'Jane',
    lastName: 'Doe',
    description: 'This is the description of the first project. Hopefully some students would like to work on this project because it is really cool',
    url: 'www.project1url.com',
    hardwareReq: 'These are the hardware restrictions for the first project. You have to use Apple, sheeple.',
    softwareReq: 'You can only code in fortran because I am a progressive professor.'
}, {
    title: 'Website',
    firstName: 'John',
    lastName: 'Smith',
    description: 'This is the description of the second project. Hopefully some students would like to work on this project because it is really cool',
    url: 'www.project2url.com',
    hardwareReq: 'These are the hardware restrictions for the second project. You have to use Windows, #PCMasterRace.',
    softwareReq: 'You can use whatever language you want.'
}, {
    title: 'Android App',
    firstName: 'Sam',
    lastName: 'Sung',
    description: 'This is the description of the third project. Hopefully some students would like to work on this project because it is really cool',
    url: 'www.project3url.com',
    hardwareReq: 'These are the hardware restrictions for the third project. Android dev, Oreo or newer.',
    softwareReq: 'Let\'s use Kotlin.'
}];

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1),
    },
    proposal: {
        marginTop: '5px'
    },
    acceptButton: {
        margin: '0px 5px',
        color: 'white'
    },
    rejectButton: {
        margin: '0px 5px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    acceptedBackground: {
        backgroundColor: 'rgba(17,255,113,0.21)'
    },
    rejectedBackground: {
        backgroundColor: 'rgba(255,58,82,0.35)'
    },
    pendingBackground: {
        backgroundColor: 'rgba(183,183,175,0.34)'
    }

}));


function ProposalsAdminView(props) {

    const classes = useStyles();
    const [acceptedProposals, setAcceptedProposals] = useState([]);
    const [newProposals, setNewProposals] = useState([]);
    const [pendingProposals, setPendingProposals] = useState([]);
    const [rejectedProposals, setRejectedProposals] = useState([]);
    useEffect(()=>{
        console.log(acceptedProposals)
    },[acceptedProposals])
    useEffect(() => {
        axios.get("http://localhost:5000/proposals/")
            .then(response => {
                console.log(response);
                const proposals = response['data'];
                setNewProposals(proposals.filter(prop => prop['status'] === "New"));
                setAcceptedProposals(proposals.filter(prop => prop['status'] === "Accepted"));
                setRejectedProposals(proposals.filter(prop => prop['status'] === "Rejected"));
                setPendingProposals(proposals.filter(prop => prop['status'] === "Pending"));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const changeStatus = function (prevIndex, oldStatus, newStatus, id) {
        if (oldStatus === newStatus) {
            return
        }
        // post to backend, wrap everything else in .then()
        axios.post(`http://localhost:5000/proposals/update/${id}`, {
            status: newStatus
        }).then(() => {

            let proposal;
            let copy;
            switch (oldStatus) {
                case "Accepted":
                    copy = [...acceptedProposals];
                    proposal = copy.splice(prevIndex, 1)[0];
                    setAcceptedProposals(copy);
                    break;
                case "Rejected":
                    copy = [...rejectedProposals];
                    proposal = copy.splice(prevIndex, 1)[0];
                    setRejectedProposals(copy);
                    break;
                case "Pending":
                    copy = [...pendingProposals];
                    proposal = copy.splice(prevIndex, 1)[0];
                    setPendingProposals(copy);
                    break;
                case "New":
                    copy = [...newProposals];
                    proposal = copy.splice(prevIndex, 1)[0];
                    setNewProposals(copy);
                    break;
            }

            switch (newStatus) {
                case "Accepted":
                    copy = [...acceptedProposals];
                    copy.push(proposal);
                    setAcceptedProposals(copy);
                    break;
                case "Rejected":
                    copy = [...rejectedProposals];
                    copy.push(proposal);
                    setRejectedProposals(copy);
                    break;
                case "Pending":
                    copy = [...pendingProposals];
                    copy.push(proposal);
                    setPendingProposals(copy);
                    break;
            }
        }).catch(err => alert(err));
    };

    const proposalGroup = function (propType, label, className) {
        return (
            <>
                <Grid item style={{'marginBottom': '5px'}}>
                    <ExpansionPanel className={className}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                        >
                            <Typography className={classes.heading}>{label} Proposals</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container direction="column">
                                {propType.map((prop, i) =>
                                    <Card variant="outlined" key={i} className={classes.proposal}>
                                        <CardContent>
                                            <Grid container direction="column" justify="space-between">
                                                <Grid item>
                                                    <Proposal title={prop.title}
                                                              prop_name={prop.prop_name}
                                                              url={prop.info_url}
                                                              description={prop.description}
                                                              hardwareReq={prop.hardwareReq}
                                                              softwareReq={prop.softwareReq}
                                                    />
                                                </Grid>
                                                <Box mx="auto">
                                                    <Grid item>
                                                        <Button variant="contained" color="primary"
                                                                className={classes.acceptButton}
                                                                onClick={() => changeStatus(i, label, "Accepted", prop['_id'])}>Accept</Button>
                                                        <Button variant="contained" className={classes.pendingButton}
                                                                onClick={() => changeStatus(i, label, "Pending", prop['_id'])}>Leave
                                                            Pending</Button>
                                                        <Button variant="contained" color="secondary"
                                                                className={classes.rejectButton}
                                                                onClick={() => changeStatus(i, label, "Rejected", prop['_id'])}>Reject</Button>
                                                    </Grid>
                                                </Box>
                                            </Grid>
                                        </CardContent>
                                    </Card>)}
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            </>
        )
    };


    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Grid container direction="column">
                    {proposalGroup(newProposals, 'New')}
                    {proposalGroup(acceptedProposals, 'Accepted', classes.acceptedBackground)}
                    {proposalGroup(rejectedProposals, 'Rejected', classes.rejectedBackground)}
                    {proposalGroup(pendingProposals, 'Pending', classes.pendingBackground)}
                </Grid>


            </main>
        </div>
    );
}


export default ProposalsAdminView;
