import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TopNav from "./TopNav";


function TeammateSelectionRules() {
    return (
        <React.Fragment>
            <TopNav/>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ height: '100vh' }}>
                    <br/>
                    <br/>
                    <h3>Team Selection</h3>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemText primary="Rule 1"/>
                        </ListItem>
                        <br/>
                        <ListItem button>
                            <ListItemText primary="Rule 2"/>
                        </ListItem>
                        <br/>
                        <ListItem button>
                            <ListItemText primary="Rule 3"/>
                        </ListItem>
                    </List>
                </Typography>
            </Container>
        </React.Fragment>
    )
}

export default TeammateSelectionRules;