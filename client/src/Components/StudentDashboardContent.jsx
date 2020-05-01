import React from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "./FunctionalCard/Card";
import {Link} from "react-router-dom";
import DashBoard from "./AdminDashboard";
import WelcomeCard from "./FunctionalCard/WelcomeCard";
import FutureEventCard from "./FunctionalCard/FutureEventCard";
import StudentDashboard from "./StudentDashboard";
import StudentWelcome from "./FunctionalCard/StudentWelcome";
import StudentProject from "./FunctionalCard/StudentProject";
import Axios from "axios";
import {useEffect} from "react";

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
        height: 450,
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
    const [semester, setSemester] = React.useState("");
    const [name, setName] = React.useState("");
    const [teamId, setTeamId] = React.useState("");
    const [teamName, setTeamName] = React.useState("");
    const [team, setTeam] = React.useState("");
    const [projectId, setProjectId] = React.useState("");
    const [project, setProject] = React.useState("");

    useEffect(() => {
        setName(window.localStorage.getItem("name"));
        setTeamId(window.localStorage.getItem("teamId"));
        console.log('teamId from window', window.localStorage.getItem("teamId"))

        Axios.get(`/teams/${window.localStorage.getItem('teamId')}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem("token")}`,
            },
        }).then((response) => {
            setTeamName(response["data"].teamName);
            setProjectId(response["data"].projectId);
            console.log('team', response["data"]);
        });
    }, []);

    useEffect(() => {
        console.log('projectId', projectId)
        if (projectId === "Pending" || !projectId) {
              setProject("Pending")
        } else {
            Axios.get(`/proposals/${projectId}`, {
                headers: {
                    Authorization: `Token ${window.localStorage.getItem("token")}`,
                },
            }).then((response) => {
                console.log('project',response["data"]);
                //   setProject(response["data"]);
              setProject(response['data']);
            });
        }
    }, [projectId]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <StudentDashboard updateSemester={(sem) => setSemester(sem)}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* WelcomeCard */}
                        <Grid item xs={12} md={7} lg={7}>
                            <Paper className={fixedHeightPaper}>
                                <StudentWelcome name={name} teamName={teamName}/>
                            </Paper>
                        </Grid>
                        {/* FutureEventCard */}
                        <Grid item xs={12} md={5} lg={5}>
                            <Paper className={fixedHeightPaper}>
                                <StudentProject project={project}/>
                            </Paper>
                        </Grid>
                        {/* Recent Orders
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Card />
              </Paper>
            </Grid> */}
                    </Grid>
                </Container>
            </main>
        </div>
    );
}
