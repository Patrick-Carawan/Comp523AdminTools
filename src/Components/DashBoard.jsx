import React  from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Proposals from '@material-ui/icons/Description';
import MailIcon from '@material-ui/icons/Mail';
import Team from '@material-ui/icons/Group';
import Calendar from '@material-ui/icons/DateRange';
import Deliverable from '@material-ui/icons/ListAlt';
import {Link} from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
    listItem: {
        padding: '0px'
    },
    link: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        margin: 0,
        padding: '10px',
        textDecoration:'none',
        color: 'black'
    }
}));

export default function Dashboard() {
    const classes = useStyles();

    return (
        <div>

            <AppBar style={{'color': 'white'}} position="fixed" className={classes.appBar}>
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
                    <Divider/>
                <List>
                    <ListItem button key={1} className={classes.listItem}>
                        <Link to="/composeEmail" className={classes.link}>
                            <ListItemIcon><MailIcon/></ListItemIcon>
                            <Typography>Email Clients</Typography>
                        </Link>
                    </ListItem>
                    <ListItem button key={2} className={classes.listItem}>
                        <Link to="/proposalsAdmin" className={classes.link}>
                            <ListItemIcon><Proposals/></ListItemIcon>
                            <Typography>View Proposals</Typography>
                        </Link>
                    </ListItem>
                    <Divider/>
                    <ListItem button key={3} title="Change which students are in which teams"
                              className={classes.listItem}>
                        <Link to="/teamSelection" className={classes.link}>
                            <ListItemIcon><Team/></ListItemIcon>
                            <Typography>Manage Teams</Typography>
                        </Link>
                    </ListItem>
                    <ListItem button key={4} className={classes.listItem}
                              title="Keep track of teams' progress in coach meetings">
                        <Link to="/nowhere" className={classes.link}>
                            <ListItemIcon><Calendar/></ListItemIcon>
                            <Typography>Track Coach Meetings</Typography>
                        </Link>
                    </ListItem>
                    <ListItem button key={5} className={classes.listItem} title="Give feedback on team deliverables">
                        <Link to="/nowhere" className={classes.link}>
                            <ListItemIcon><Deliverable/></ListItemIcon>
                            <Typography>Rate Deliverables</Typography>
                        </Link>
                    </ListItem>
                </List>
                <Divider/>
            </Drawer>
        </div>

    );
}
