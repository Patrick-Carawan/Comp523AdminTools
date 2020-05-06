import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function Proposal(props) {
    const [collapsed, setCollapsed] = useState(true);
    let index = props.index || props.index === 0 ? props.index + 1 + '.' : '';
    return (
        <>
            <Grid container direction="row" justify="space-between">
                <Typography variant="h5">{index} {props.title}</Typography>
                <Button onClick={() => setCollapsed(!collapsed)}>{collapsed ? 'Expand' : 'Collapse'}</Button>
            </Grid>
            <Typography variant="h6">{`${props.prop_name}`}</Typography>
            {
                !collapsed ? <>
                    <Typography>
                        <a href={props.url}>{props.url}
                        </a>
                    </Typography>
                    <Typography>Description: {props.description}</Typography>
                    <br/>
                    <Typography>Software requirements: {props.softwareReq}</Typography>
                    <br/>
                    <Typography>Hardware requirements: {props.hardwareReq}</Typography>
                    {props.powerpoint? <Typography>PowerPoint link:  <a href={props.powerpoint}>{props.powerpoint}
                    </a></Typography>:null}
                </> : null
            }
        </>
    );
}

export default Proposal;
