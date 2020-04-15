import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ReportIcon from '@material-ui/icons/PostAdd';
import TeamReportIcon from '@material-ui/icons/Assignment';
import RankIcon from '@material-ui/icons/FormatListNumbered';
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import GroupIcon from '@material-ui/icons/GroupAdd';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        height: `calc(100vh)`,
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 240,
    },
    link: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        margin: 0,
        padding: "10px",
        textDecoration: "none",
        color: "black",
        decoration: "none",
    },
}));

export default function AdminDashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    function logout() {

    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        COMP 523
                    </Typography>
                    <Button style={{'color':'white'}} onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {" "}
                    <ListItem button key={0} className={classes.listItem}>
                        <Link to="/formTeams" className={classes.link}>
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Form Team" />
                        </Link>
                    </ListItem>
                    <ListItem button key={1} className={classes.listItem}>
                        <Link to="/rank" className={classes.link}>
                            <ListItemIcon>
                                <RankIcon />
                            </ListItemIcon>
                            <ListItemText primary="Rank Proposals" />
                        </Link>
                    </ListItem>
                    <ListItem button key={2} className={classes.listItem} title="Submit your individual final report">
                        <Link to="/individualReport" className={classes.link}>
                            <ListItemIcon>
                                <ReportIcon />
                            </ListItemIcon>
                            <ListItemText primary="Individual Final Report" />
                        </Link>
                    </ListItem>
                    <ListItem button key={3} className={classes.listItem} title="Submit your team's final report">
                        <Link to="/teamReport" className={classes.link}>
                            <ListItemIcon>
                                <TeamReportIcon />
                            </ListItemIcon>
                            <ListItemText primary="Team Final Report" />
                        </Link>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}
