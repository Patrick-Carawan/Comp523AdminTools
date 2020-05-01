import React, {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MaterialCard from "@material-ui/core/Card";
import DashBoard from "./AdminDashboard";
import MeetingSelector from "./MeetingSelector";
import Calendar from "./FunctionalCard/Calendar";
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
    const [teams, setTeams] = React.useState([]);
    const [attendanceObj, setAttendanceObj] = React.useState({});
    const [selectedTeam, setSelectedTeam] = React.useState({});
    const [demoStatus, setDemoStatus] = React.useState("");
    const [week, setWeek] = React.useState(-1);
    const [deliverableStatus, setDeliverableStatus] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [weekTodo, setWeekTodo] = React.useState("");
    const [semester, setSemester] = React.useState(window.localStorage.getItem('semester'));
    const [showSummary, setShowSummary] = React.useState(false);
    const [onyenToNameMap, setOnyenToNameMap] = useState(new Map());

    //states for the ytd summary
    const [timesDemoFine, setTimesDemoFine] = useState(0);
    const [timesDemoBad, setTimesDemoBad] = useState(0);
    const [timesNoDemo, setTimesNoDemo] = useState(0);
    const [timesDemoNA, setTimesDemoNA] = useState(0);

    const [timesDeliverableFinished, setTimesDeliverableFinished] = useState(0);
    const [timesDeliverableUnfinished, setTimesDeliverableUnfinished] = useState(0);
    const [timesDeliverableNA, setTimesDeliverableNA] = useState(0);
    const [timesDeliverableExcused, setTimesDeliverableExcused] = useState(0);
    const [timesMembersAttended, setTimesMembersAttended] = useState([]);
    const pageEndRef = useRef(null);

    //changes all relevant info when semester is changed
    useEffect(() => {
        setSemesterInfo()
    }, [semester]);

    //unselects current team
    const blankTeamMembers = () => {
        setSelectedTeam({});
    };

    //sets the teams, coach meeting data, students for the current semester
    function setSemesterInfo() {
        Axios.get(`/teams/semester/${semester}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem("token")}`,
            },
        }).then((res) => {
            // console.log("teams", res);
            setTeams(res["data"]);
        });
        Axios.get(`/coachMeetings/${semester}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            // console.log("allCoachMeetings", res["data"]);
        });
        Axios.get(`/roster/${semester}`,{
          headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then(res =>{
            // console.log('roster', res['data']);
            let tempMap = new Map();
            res['data'][0]['studentList'].forEach(student =>{
                tempMap.set(student['onyen'],student['name'])
            });
            setOnyenToNameMap(tempMap);
        })
    }

    useEffect(() => {
        generateSummary();
        setShowSummary(false)
    }, [selectedTeam]);

    const changeAttendance = (member, attendanceValue) => {
        const tempAttendanceObj = Object.assign({}, attendanceObj);
        tempAttendanceObj[`${member}`] = attendanceValue;
        // console.log(tempAttendanceObj);
        setAttendanceObj(tempAttendanceObj);
    };

    const changeSelectedTeam = (team) => {
        setSelectedTeam(team);
        // console.log(team);
        if (week !== -1 && team.hasOwnProperty('_id')) {
            Axios.get(
                `/coachMeetings/${semester}/${week}/${team._id}`, {
                    headers: {
                        Authorization: `Token ${window.localStorage.getItem('token')}`
                    }
                }
            ).then((res) => {
                // console.log("SpecificCoachMeetings", res["data"]);
                if (res['data'].length !== 0) {
                    setAttendanceObj(res['data'][0]["attendance"]);
                    setDemoStatus(res["data"][0]["demoStatus"]);
                    setDeliverableStatus(res["data"][0]["deliverableStatus"]);
                    setComment(res["data"][0]["comment"]);
                    setWeekTodo(res["data"][0]["weekTodo"]);
                } else {
                    setAttendanceObj({});
                    setDemoStatus("");
                    setDeliverableStatus("");
                    setComment("");
                    setWeekTodo("");
                }
            });
        }
    };


    const changeWeek = (week) => {
        if (week !== -1 && selectedTeam.hasOwnProperty('_id')) {
            Axios.get(
                `/coachMeetings/${semester}/${week}/${selectedTeam._id}`, {
                    headers: {
                        Authorization: `Token ${window.localStorage.getItem('token')}`
                    }
                }
            ).then((res) => {
                // console.log("SpecificCoachMeetings", res["data"]);
                // changeDemoStatus(res["data"]["demoStatus"]);
                if (res["data"].length !== 0) {
                    setAttendanceObj(res["data"][0]["attendance"]);
                    setDemoStatus(res["data"][0]["demoStatus"]);
                    setDeliverableStatus(res["data"][0]["deliverableStatus"]);
                    setComment(res["data"][0]["comment"]);
                    setWeekTodo(res["data"][0]["weekTodo"]);
                } else {
                    setAttendanceObj({});
                    setDemoStatus("");
                    setDeliverableStatus("");
                    setComment("");
                    setWeekTodo("");
                }
            });
        }
        // console.log(week);
        setWeek(week);
    };

    const changeDemoStatus = (status) => {
        setDemoStatus(status);
    };
    const changeDeliverableStatus = (status) => {
        setDeliverableStatus(status);
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
        if (!(week && selectedTeam) || week === -1 || !selectedTeam.hasOwnProperty('teamMembers')) {
            alert('Please select a week and team')
            return
        }
        let semester = window.localStorage.getItem("semester");
        let teamId = selectedTeam["_id"];
        if (week)
            Axios.post(
                `/coachMeetings/add/${semester}/${week}/${teamId}`,
                {
                    demoStatus: demoStatus,
                    deliverableStatus: deliverableStatus,
                    comment: comment,
                    weekTodo: weekTodo,
                    attendance: attendanceObj,
                },
                {
                    headers: {
                        Authorization: `Token ${window.localStorage.getItem("token")}`,
                    },
                }
            ).then(() => alert("meeting submitted"));
    }


    //scrolls to bottom of page to show the summary
    useEffect(() => {
        if (showSummary) {
            pageEndRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [showSummary]);

    //generates year-to-date info about the selected team
    function generateSummary() {
        if (!selectedTeam || !selectedTeam.hasOwnProperty('teamMembers')) {
            return null
        }
        Axios.get(`/coachMeetings/${semester}/${selectedTeam["_id"]}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem("token")}`,
            },
        }).then(res => {
            // console.log(res['data'])
            let attendances = {};
            let numDemoFine = 0;
            let numDemoBad = 0;
            let numNoDemo = 0;
            let numDemoNA = 0;
            let numDeliverableFinished = 0;
            let numDeliverableUnfinished = 0;
            let numDeliverableExcused = 0;
            let numDeliverableNA = 0;
            res['data'].forEach((report, index) => {
                switch (report['deliverableStatus']) {
                    case "N/A":
                        numDeliverableNA++;
                        break;
                    case "unfinished":
                        numDeliverableUnfinished++;
                        break;
                    case "finished":
                        numDeliverableFinished++;
                        break;
                    case "excused":
                        numDeliverableExcused++;
                        break;
                }
                switch (report['demoStatus']) {
                    case "N/A":
                        numDemoNA++;
                        break;
                    case "no demo":
                        numNoDemo++;
                        break;
                    case "demo fine":
                        numDemoFine++;
                        break;
                    case "demo bad":
                        numDemoBad++;
                        break;
                }
                for (let key in report['attendance']) {
                    if (!attendances.hasOwnProperty(key)) {
                        attendances[key] = {
                            attended: 0,
                            excused: 0,
                            unexcused: 0
                        }
                    }
                    switch (report['attendance'][key]) {
                        case 'attended':
                            attendances[key]['attended']++;
                            break;
                        case 'absent unexcused':
                            attendances[key]['unexcused']++;
                            break;
                        case 'excused':
                            attendances[key]['excused']++;
                            break;
                    }
                }
            });
            // console.log('attendances',attendances);
            let tempArray = [];
            for (let key in attendances) {
                let tempObj = {};
                tempObj[key] = attendances[key];
                tempArray.push(tempObj);
            }
            setTimesMembersAttended(tempArray);
            setTimesDemoFine(numDemoFine);
            setTimesDemoBad(numDemoBad);
            setTimesDemoNA(numDemoNA);
            setTimesNoDemo(numNoDemo);
            setTimesDeliverableExcused(numDeliverableExcused);
            setTimesDeliverableFinished(numDeliverableFinished);
            setTimesDeliverableUnfinished(numDeliverableUnfinished);
            setTimesDeliverableNA(numDeliverableNA);
        }).catch(err => {
            alert(err)
        });
    }

    return (
        <div className={classes.root}>
            <DashBoard updateSemester={(sem) => setSemester(sem)}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Paper className={fixedHeightPaper}>
                                <Calendar/>
                                <DataSelector
                                    teams={teams}
                                    semester={semester}
                                    changeSelectedTeam={(team) => {
                                        changeSelectedTeam(team);
                                    }}
                                    changeWeek={(week) => changeWeek(week)}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={fixedHeightPaper}>
                                <MeetingSelector
                                    roster={onyenToNameMap}
                                    team={selectedTeam}
                                    semester={semester}
                                    week={week}
                                    blankTeamMembers={blankTeamMembers}
                                    attendance={attendanceObj}
                                    changeAttendance={(e, index, member) =>
                                        changeAttendance(e, index, member)
                                    }
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={MeetingTaskPaper}>
                                <MeetingTask
                                    demoStatus={demoStatus}
                                    deliverableStatus={deliverableStatus}
                                    comment={comment}
                                    weekTodo={weekTodo}
                                    semester={semester}
                                    changeComment={(comment) => changeComment(comment)}
                                    changeWeeklyTodo={(todo) => changeWeekTodo(todo)}
                                    changeDeliverableStatus={(status) =>
                                        changeDeliverableStatus(status)
                                    }
                                    changeDemoStatus={(status) => changeDemoStatus(status)}
                                    teams={teams}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Container>
                    <Grid container>
                        <Grid container direction="row">
                            <Grid item>
                                <Button
                                    onClick={submitCoachMeeting}
                                    variant="contained"
                                    color="primary"
                                    style={{'marginBottom': '2em'}}
                                >
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={() => setShowSummary(true)}
                                    variant="contained"
                                    color="primary"
                                    style={{'marginBottom': '2em', 'marginLeft': '2em', 'width': 'fitContent'}}
                                >
                                    Generate YTD Summary
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {
                        showSummary ?
                            <MaterialCard variant="outlined" style={{'padding': '5px', 'marginBottom': '10px'}}>
                                <Grid container direction="row">
                                    <Grid item>
                                        <Typography>Times demo was fine: {timesDemoFine}</Typography>
                                        <Typography>Times demo was bad: {timesDemoBad}</Typography>
                                        <Typography>Times demo wasn't delivered: {timesNoDemo}</Typography>
                                        <Typography>Times demo was N/A: {timesDemoNA}</Typography>
                                        {timesMembersAttended.map((member, i) =>
                                            <Typography key={i}>{onyenToNameMap.get(Object.keys(member)[0])}-
                                                Attended: {member[Object.keys(member)[0]]['attended']} Excused: {member[Object.keys(member)[0]]['excused']} Unexcused: {member[Object.keys(member)[0]]['unexcused']}</Typography>)}
                                    </Grid>
                                    <Grid item>
                                        <Typography>Times deliverable was
                                            finished: {timesDeliverableFinished}</Typography>
                                        <Typography>Times deliverable was unfinished/not
                                            submitted: {timesDeliverableUnfinished}</Typography>
                                        <Typography>Times deliverable was
                                            excused: {timesDeliverableExcused}</Typography>
                                        <Typography>Times deliverable was N/A: {timesDeliverableNA}</Typography>
                                    </Grid>
                                </Grid>


                            </MaterialCard> : null
                    }
                    <div ref={pageEndRef}/>
                </Container>
            </main>
        </div>
    );
}
