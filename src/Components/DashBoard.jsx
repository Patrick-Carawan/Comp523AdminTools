import React, {useState} from 'react';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Proposals from '@material-ui/icons/Description';
import MailIcon from '@material-ui/icons/Mail';
import Team from '@material-ui/icons/Group';
import Calendar from '@material-ui/icons/DateRange';
import Deliverable from '@material-ui/icons/ListAlt';
import TeamSelection from "./TeamSelection";
import ProposalsAdminView from "./ProposalsAdminView";
import ComposeEmail from "./ComposeEmail";
import Box from "@material-ui/core/Box";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

const pages = {
    EMAIL: 'email',
    PROPOSALS: 'proposals',
    TEAMS: 'teams',
    MEETINGS: 'meetings',
    DELIVERABLES: 'deliverables'
};

export default function Dashboard() {
    const classes = useStyles();
    const [page, setPage] = useState();


    function renderPage() {
        switch (page) {
            case pages.TEAMS:
                return <TeamSelection/>;
            case pages.PROPOSALS:
                return <ProposalsAdminView/>;
            case pages.EMAIL:
                return <ComposeEmail/>;
            case undefined:
                return <Box textAlign="center">
                    <Typography variant="h6"> Welcome to your COMP 523 Administrator Dashboard</Typography>
                </Box>
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
        <AppBar style={{'color':'white'}} position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        COMP 523 Admin Tools
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    <ListItem button key={1} onClick={() => setPage(pages.EMAIL)}>
                        <ListItemIcon><MailIcon/></ListItemIcon>
                        <ListItemText primary="Email Clients"/>
                    </ListItem>
                    <ListItem button key={2} onClick={() => setPage(pages.PROPOSALS)}>
                        <ListItemIcon><Proposals/></ListItemIcon>
                        <ListItemText primary="View Proposals"/>
                    </ListItem>
                    <Divider/>
                    <ListItem button key={3} title="Change which students are in which teams"
                              onClick={() => setPage(pages.TEAMS)}>
                        <ListItemIcon><Team/></ListItemIcon>
                        <ListItemText primary="Manage Teams"/>
                    </ListItem>
                    <ListItem button key={4} title="Keep track of teams' progress in coach meetings">
                        <ListItemIcon><Calendar/></ListItemIcon>
                        <ListItemText primary="Track Coach Meetings"/>
                    </ListItem>
                    <ListItem button key={5} title="Give feedback on team deliverables">
                        <ListItemIcon><Deliverable/></ListItemIcon>
                        <ListItemText primary="Rate Deliverables"/>
                    </ListItem>
                </List>
                <Divider/>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {renderPage()}
            </main>
            }
            }
        </div>
    );
}
