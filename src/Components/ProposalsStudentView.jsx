import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import {Checkbox} from "@material-ui/core";

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

function ProposalsStudentView(props) {
    return (
        <div>
            <AppBar position="static">
                <Box textAlign="center" style={{'marginBottom': '5px'}}>
                    <Typography variant="h3">
                        Please select your favorite 7 proposals
                    </Typography>
                </Box>
            </AppBar>
            {
                proposals.map((prop, i) =>
                    <div key={i} style={{'display':'inline', 'align-item':'middle'}}>
                        <Checkbox/>
                        <Card className="MiddleText" variant="outlined">
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>

                                        <Typography variant="h2">{prop.title}</Typography>
                                        <Typography variant="h3">{`${prop.firstName}  ${prop.lastName}`}</Typography>
                                        <Typography variant="h5">{prop.description}</Typography>
                                        <Typography variant="h5">
                                            <a href={prop.url}>{prop.url}
                                            </a>
                                        </Typography>
                                        <Typography variant="h5">{prop.softwareReq}</Typography>
                                        <Typography variant="h5">{prop.hardwareReq}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </div>)
            }
        </div>
    );
}

export default ProposalsStudentView;
