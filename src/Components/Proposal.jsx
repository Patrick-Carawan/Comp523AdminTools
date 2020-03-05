import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function Proposal(props) {
    return (
        <Grid item xs={8}>
            <Typography variant="h2">{props.title}</Typography>
            <Typography variant="h3">{`${props.firstName}  ${props.lastName}`}</Typography>
            <Typography variant="h5">{props.description}</Typography>
            <Typography variant="h5">
                <a href={props.url}>{props.url}
                </a>
            </Typography>
            <Typography variant="h5">{props.softwareReq}</Typography>
            <Typography variant="h5">{props.hardwareReq}</Typography>

        </Grid>
    );
}

export default Proposal;
