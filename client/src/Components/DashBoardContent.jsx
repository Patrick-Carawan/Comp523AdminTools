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
import WelcomeCard from "./FunctionalCard/WelcomeCard";
import FutureEventCard from "./FunctionalCard/FutureEventCard";

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
    height: 520,
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


export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [semester, setSemester] = React.useState('');
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <DashBoard updateSemester={(sem) => setSemester(sem)}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* WelcomeCard */}
            <Grid item xs={12} md={7} lg={7}>
              <Paper className={fixedHeightPaper}>
                <WelcomeCard />
              </Paper>
            </Grid>
          {/*  <Grid item xs={12} md={5} lg={5}>*/}
          {/*    <Paper className={fixedHeightPaper}>*/}
          {/*      <FutureEventCard />*/}
          {/*    </Paper>*/}
          {/*  </Grid>*/}
          {/*  <Grid item xs={12}>*/}
          {/*    <Paper className={classes.paper}>*/}
          {/*      <Card />*/}
          {/*    </Paper>*/}
          {/*  </Grid>*/}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
