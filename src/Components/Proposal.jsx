import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function Proposal(props) {
    const [collapsed, setCollapsed] = useState(true);
    let index = props.index ? props.index + 1 + '.' : '';
    return (
        <>
            <Grid container direction="row" justify="space-between">
                <Typography variant="h5">{index} {props.title}</Typography>
                <Button onClick={() => setCollapsed(!collapsed)}>{collapsed ? 'Expand' : 'Collapse'}</Button>
            </Grid>
            <Typography variant="h6">{`${props.firstName}  ${props.lastName}`}</Typography>
            {
                !collapsed ? <>
                    <Typography>
                        <a href={props.url}>{props.url}
                        </a>
                    </Typography>
                    <Typography>{props.description}</Typography>
                    <br/>
                    <Typography>{props.softwareReq}</Typography>
                    <br/>
                    <Typography>{props.hardwareReq}</Typography>
                </> : null
            }
        </>
    );
}

export default Proposal;
