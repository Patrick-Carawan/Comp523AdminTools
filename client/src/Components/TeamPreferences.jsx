import React from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TopNav from "./TopNav";

function TeamPreferences() {
    return(
        <React.Fragment>
            <TopNav/>
            <Container maxWidth="sm">
            <h3>Rank your preferences</h3>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                >
                    <Grid item xs={12}>                       
                        <Paper style={{"backgroundColor": "#d7dbe0"}}>Project A</Paper>
                    </Grid>
                    <br/>
                    <Grid item xs={6}>
                        <Paper style={{"backgroundColor": "#d7dbe0"}}>Project B</Paper>
                    </Grid>
            </Grid>
        </Container>
        </React.Fragment>
        
    )
}

export default TeamPreferences;