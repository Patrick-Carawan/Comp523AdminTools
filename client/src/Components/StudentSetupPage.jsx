import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TopNav from "./TopNav";

function StudentSetupPage() {
    return (
        <React.Fragment>
            <TopNav/>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ height: '100vh' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <Chip style={{"backgroundColor": "#9198a3"}} label="1"/>
                        <ListItemText primary=" Activate your account"/>
                    </ListItem>
                    <br/>
                    <ListItem button>
                        <Chip style={{"backgroundColor": "#9198a3"}} label="2"/>
                        <ListItemText primary=" Create your team"/>
                    </ListItem>
                    <br/>
                    <ListItem button>
                        <Chip style={{"backgroundColor": "#9198a3"}} label="3"/>
                        <ListItemText primary=" Select your project"/>
                    </ListItem>
                </List>
                </Typography>
            </Container>
        </React.Fragment>
    )
}

export default StudentSetupPage;