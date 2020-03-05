import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TopNav from "./TopNav";
import Proposal from "./Proposal";

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

function ProposalsAdminView(props) {
    return (
        <div>
            <TopNav/>
            {proposals.map((prop, i) =>
                <Card className="MiddleText" variant="outlined">
                    <CardContent>
                        <Grid container spacing={3}>
                            <Proposal title={prop.title}
                                      firstName={prop.firstName}
                                      lastName={prop.lastName}
                                      url={prop.url}
                                      description={prop.description}
                                      hardwareReq={prop.hardwareReq}
                                      softwareReq={prop.hardwareReq}
                            />
                            <Grid className="MiddleText" item={4}>
                                <Button>Accept</Button>
                                <Button>Reject</Button>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>)}</div>
    );
}

export default ProposalsAdminView;
