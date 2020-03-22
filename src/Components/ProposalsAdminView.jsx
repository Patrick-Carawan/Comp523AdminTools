import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Proposal from "./Proposal";
import {makeStyles} from "@material-ui/core/styles";
import DashBoard from "./DashBoard";
import Box from "@material-ui/core/Box";

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
    proposal:{
        marginTop:'5px'
    },
    acceptButton:{
        margin: '0px 5px',
        color:'white'
    },
    rejectButton:{
        margin: '0px 5px'
    }
}));

function ProposalsAdminView(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {proposals.map((prop, i) =>
                    <Card variant="outlined" key={i} className={classes.proposal}>
                        <CardContent>
                            <Grid container direction="column" justify="space-between">
                                <Grid item>
                                    <Proposal title={prop.title}
                                              firstName={prop.firstName}
                                              lastName={prop.lastName}
                                              url={prop.url}
                                              description={prop.description}
                                              hardwareReq={prop.hardwareReq}
                                              softwareReq={prop.softwareReq}
                                    />
                                </Grid>
                                <Box mx="auto">
                                    <Grid item>
                                        <Button variant="contained" color="primary" className={classes.acceptButton}>Accept</Button>
                                        <Button variant="contained" color="secondary" className={classes.rejectButton}>Reject</Button>
                                    </Grid>
                                </Box>
                            </Grid>
                        </CardContent>
                    </Card>)}  </main>
        </div>
    );
}

export default ProposalsAdminView;
