import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Roster from "@material-ui/icons/PermContactCalendar";
import AssignIcon from "@material-ui/icons/ExitToApp";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MailIcon from "@material-ui/icons/Mail";
import Proposals from "@material-ui/icons/Description";
import Team from "@material-ui/icons/Group";
import Calendar from "@material-ui/icons/DateRange";
import Deliverable from "@material-ui/icons/ListAlt";
import DashboardContent from "./DashBoardContent";
import AssignmentIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";

import NavPanel from "./NavPanel";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

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
    textColor: "white !important",
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

export default function AdminDashboard(props) {
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [semester, setSemester] = useState("");
  const [allSemesters, setAllSemesters] = useState([]);
  const [hasRoster, setHasRoster] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem("semester")) {
      axios
        .get(`/semesters/current`, {
          headers: {
            Authorization: `Token ${window.localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          // console.log('current semester',res['data']);
          setSemester(res["data"]);
          window.localStorage.setItem("semester", res["data"]);
        });
    } else {
      setSemester(window.localStorage.getItem("semester"));
    }
  }, []);
  //sets the roster for the semester whenever the semester is changed
  useEffect(() => {
    axios
      .get(`/roster/${semester}`, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res['data'][0])
        if (res.data[0]) {
          setHasRoster(true);
        } else {
          setHasRoster(false);
          alert("Upload a roster to get access disabled menu buttons");
        }
      });
  }, [semester]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  function logout() {
    window.localStorage.setItem("teamId", "");
    window.localStorage.setItem("onyen", "");
    window.localStorage.setItem("token", "");
    window.localStorage.setItem("name", "");
    window.localStorage.setItem("studentUser", "false");
    window.localStorage.setItem("adminUser", "false");
    history.push("/login");
  }

  function handleSemesterChange(e) {
    setSemester(e.target.value);
    props.updateSemester(e.target.value);
    window.localStorage.setItem("semester", e.target.value);
  }
  //gets all the semesters stored in the backend to display in dropdown
  useEffect(() => {
    axios
      .get(`/semesters`, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res['data'][0]);
        if (res["data"].length === 0) {
          alert(
            "Please upload a list of semesters in Mongo. \n Ex. 'Spring2020','Fall2021'"
          );
        } else {
          setAllSemesters(res["data"][0]["semesters"]);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/semesters`, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res['data'][0]);
        if (res["data"].length === 0) {
          alert(
            "Please upload a list of semesters in Mongo. \n Ex. 'Spring2020','Fall2021'"
          );
        } else {
          setAllSemesters(res["data"][0]["semesters"]);
        }
      });
  }, []);

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
            // color="secondary"
            noWrap
            className={classes.title}
          >
            COMP 523 Admin Tools
          </Typography>
          <FormControl>
            <InputLabel>Semester</InputLabel>
            <Select
              onChange={handleSemesterChange}
              displayEmpty={true}
              value={semester}
              label="Current Semester"
              style={{ minWidth: "7em", marginBottom: "1em", color: "white" }}
            >
              {allSemesters
                ? allSemesters.map((semester, index) => (
                    <MenuItem key={index} value={allSemesters[index]}>
                      {semester}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <Button style={{ color: "white" }} onClick={logout}>
            Logout
          </Button>
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
          <ListItem button key={0} className={classes.listItem}>
            <Link to="/dashboard" className={classes.link}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="AdminDashboard" />
            </Link>
          </ListItem>
          <ListItem button key={1} className={classes.listItem}>
            <Link to="/composeEmail" className={classes.link}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Email Clients" />
            </Link>
          </ListItem>
          <ListItem button key={2} className={classes.listItem}>
            <Link to="/proposalsAdmin" className={classes.link}>
              <ListItemIcon>
                <Proposals />
              </ListItemIcon>
              <ListItemText primary="View Proposals" />
            </Link>
          </ListItem>
          <ListItem
            button
            disabled={!hasRoster}
            key={3}
            title={
              hasRoster
                ? "Change which students are in which teams"
                : "Add roster to access this component"
            }
            className={classes.listItem}
          >
            <Link to="/teamSelection" className={classes.link}>
              <ListItemIcon>
                <Team />
              </ListItemIcon>
              <ListItemText primary="Regroup Teams" />
            </Link>
          </ListItem>
          <ListItem
            button
            disabled={!hasRoster}
            key={4}
            className={classes.listItem}
            title={
              hasRoster
                ? "Keep track of teams' progress in coach meetings"
                : "Add roster to access this component"
            }
          >
            <Link to="/meeting" className={classes.link}>
              <ListItemIcon>
                <Calendar />
              </ListItemIcon>
              <ListItemText primary="Track Meetings" />
            </Link>
          </ListItem>
          <Divider />
          <ListItem
            button
            disabled={!hasRoster}
            key={5}
            className={classes.listItem}
            title={
              hasRoster
                ? "View Team and Individual Final Reports"
                : "Add roster to access this component"
            }
          >
            <Link to="/viewFinalReports" className={classes.link}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Final Reports" />
            </Link>
          </ListItem>
          <ListItem
            button
            disabled={!hasRoster}
            key={6}
            className={classes.listItem}
            title={
              hasRoster
                ? "Give feedback on team deliverables"
                : "Add roster to access this component"
            }
          >
            <Link to="/proposalAssignment" className={classes.link}>
              <ListItemIcon>
                <Deliverable />
              </ListItemIcon>
              <ListItemText primary="Project Assignment" />
            </Link>
          </ListItem>
          <ListItem
            button
            key={7}
            className={classes.listItem}
            title="View or upload roster for selected semester"
          >
            <Link to="/roster" className={classes.link}>
              <ListItemIcon>
                <Roster />
              </ListItemIcon>
              <ListItemText primary="Roster" />
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
