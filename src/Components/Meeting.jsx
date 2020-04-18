import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "./FunctionalCard/Card";
import { Link } from "react-router-dom";
import DashBoard from "./AdminDashboard";
import MeetingSelector from "./MeetingSelector";
import Calendar from "./FunctionalCard/Calendar";
import { useEffect } from "react";
import MeetingTask from "./MeetingTask";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import DataSelector from "./FunctionalCard/DataSelector";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerPaper: {
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
    height: 430,
  },
  meetingTaskHeight: {
    height: 260,
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

export default function MeetingPage() {
  useEffect(() => {
    Axios.get(`http://localhost:5000/teams/semester/Spring2020`).then((res) => {
      console.log("teams", res);
      setTeams(res["data"]);
    });
  }, []);

  const [teams, setTeams] = React.useState([]);
  const [attendanceMap, setAttendanceMap] = React.useState(new Map());
  const [selectedTeam, setSelectedTeam] = React.useState({});
  const [demoStatus, setDemoStatus] = React.useState('');
  const [week, setWeek] = React.useState(-1);
  const [deliverableStatus, setDeliverableStatus] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [weekTodo, setWeekTodo] = React.useState('');

  const changeAttendance = (member, attendanceValue) => {
    let tempAttendanceMap = new Map(attendanceMap);
    tempAttendanceMap.set(member, attendanceValue);
    console.log(tempAttendanceMap);
    setAttendanceMap(tempAttendanceMap);
  };

  const changeSelectedTeam = (team) => {
    setSelectedTeam(team);
    console.log(team);
  };

  const changeDemoStatus = (status) =>{
    setDemoStatus(status);
  };
  const changeDeliverableStatus = (status) =>{
    setDeliverableStatus(status);
  };
  const changeWeek = (week) =>{
    setWeek(week);
  };

  const changeComment = (comment) => {
    setComment(comment);
  };

  const changeWeekTodo = (weekTodo) => {
    setWeekTodo(weekTodo);
  };


  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const MeetingTaskPaper = clsx(classes.paper, classes.meetingTaskHeight);

  function submitCoachMeeting() {
    console.log('week', week);
    console.log('team', selectedTeam);
    console.log('demo', demoStatus);
    console.log('deliverable', deliverableStatus);
    console.log('attendance', attendanceMap);
    console.log('comment', comment);
    console.log('weekly todo', weekTodo);
  }

  return (
    <div className={classes.root}>
      <DashBoard />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={fixedHeightPaper}>
                <Calendar />
                <DataSelector
                  teams={teams}
                  changeSelectedTeam={(team) => {
                    changeSelectedTeam(team);
                  }}
                  changeWeek={(week)=> changeWeek(week)}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={fixedHeightPaper}>
                <MeetingSelector
                  team={selectedTeam}
                  changeAttendance={(e, index, member) =>
                    changeAttendance(e, index, member)
                  }
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={MeetingTaskPaper}>
                <MeetingTask
                    changeComment={(comment) =>changeComment(comment)}
                    changeWeeklyTodo={(todo) => changeWeekTodo(todo)}
                    changeDeliverableStatus={(status) => changeDeliverableStatus(status)}
                    changeDemoStatus={(status) => changeDemoStatus(status)}
                    teams={teams} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Grid container>
            <Grid item xs={5}>
            <Grid item xs={2}>
              <div className={classes.root}>
                <Button onClick={submitCoachMeeting} variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
