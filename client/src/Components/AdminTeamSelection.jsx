import React, {useEffect, useState} from 'react';
import TeamBox from './TeamBox';
import Name from './Name';
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import DashBoard from "./AdminDashboard";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        ...theme.mixins.toolbar,
        padding: 0
    },
    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.default,
        // padding: theme.spacing(3),
    },
    nameBank: {
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '15px',
        justifyContent: 'space-around',
        minHeight: '3em'
    }
}));
let modifiedTeams = new Set();
let reassignedStudents = new Set();

function AdminTeamSelection(props) {
    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState([]);
    const [newTeams, setNewTeams] = useState([]);
    const [semester, setSemester] = useState(window.localStorage.getItem('semester'));

    //sets all the info to be accurate for the newly selected semester
    function setSemesterInfo() {
        axios.get(`/users/students/${semester}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log('students', res['data'].filter(student => student['admin'] === false));
            setStudents(res['data'].filter(student => student['admin'] === false))
        });
        axios.get(`/teams/semester/${semester}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res['data']);
            setTeams(res['data'].sort((t1, t2) => t1['teamName'] < t2['teamName'] ? -1 : 1))
        })
    }

    useEffect(() => {
        setSemesterInfo();
    }, [semester]);

    let groupingArray = [];
    students.forEach(student => groupingArray.push({
        name: student['onyen'],
        team: 'NONE'
    }));

    //sets the team for a student who is moved
    const setTeam = function (oldTeamId, newTeamId, onyen, studentIndex) {
        let tempStudents = [...students];
        tempStudents[studentIndex]['teamId'] = newTeamId;

        setStudents(tempStudents);

        if (!newTeamId.includes('new')) {
            // console.log('tempStudents', tempStudents);
            // console.log('teams', teams);
            modifiedTeams.add(oldTeamId);
            modifiedTeams.add(newTeamId);
            reassignedStudents.add(students[studentIndex]);
            // console.log('reassignedStudents', reassignedStudents);
        } else {
            // console.log('moved to new team')
        }
    };

    //posts all teams to the backend
    const submitTeams = function () {
        let teamMemberMap = new Map;
        students.forEach(student => {
            if (teamMemberMap.has(student['teamId'])) {
                teamMemberMap.get(student['teamId']).push(student['onyen']);
            } else {
                teamMemberMap.set(student['teamId'], [student['onyen']]);
            }
        });
        // console.log('teamMemberMap', teamMemberMap);
        let axiosPromises = [];
        modifiedTeams.forEach(team => {
            if (team !== "Pending") {
                // console.log('teamMembers', teamMemberMap.get(team))
                axiosPromises.push(axios.post(`/teams/updateMembers/${team}`, {
                    teamMembers: teamMemberMap.get(team) ? teamMemberMap.get(team) : [""]
                }, {
                    headers: {
                        Authorization: `Token ${window.localStorage.getItem('token')}`
                    }
                }));
            }
        });
        reassignedStudents.forEach(student => {
            axiosPromises.push(axios.post(`/users/updateTeam/${student.onyen}`, {
                teamId: student.teamId
            },{
                headers: {
                    Authorization: `Token ${window.localStorage.getItem('token')}`
                }
            }));
        });
        let tempNewTeams = [...newTeams];
        tempNewTeams.forEach((newTeam, index) => tempNewTeams[index] = []);
        students.filter(student => student['teamId'].includes('new')).forEach(student => {
            let regex = /[0-9]+/;
            let index = student['teamId'].match(regex);
            // console.log(index);
            tempNewTeams[index - 1].push(student['onyen']);
        });
        tempNewTeams.forEach(team => {
            axiosPromises.push(axios.post(`/teams/addAsAdmin`, {
                teamName: `Team ${Math.floor(Math.random() * 100)}`,
                teamMembers: team,
                semester: semester
            },{
                headers: {
                    Authorization: `Token ${window.localStorage.getItem('token')}`
                }
            }).then((res) => {
                team.forEach((onyen, i) => {
                    axios.post(`/users/updateTeam/${onyen}`, {
                        teamId: res['data']['id']
                    },{
                        headers: {
                            Authorization: `Token ${window.localStorage.getItem('token')}`
                        }
                    }).then(() => {
                    }).catch(err => alert(err))
                })
            }))
        });
        setNewTeams(tempNewTeams);

        Promise.all(axiosPromises).then(() => alert('teams updated')).catch(err => alert(err))
    };


    const classes = useStyles();

    //adds new team box
    function addNewTeam() {
        let temp = [...newTeams];
        temp.push(0);
        setNewTeams(temp);
    }

    return (
        <div className={classes.root}>
            <DashBoard updateSemester={(sem) => setSemester(sem)}/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <TeamBox id="Pending" className={classes.nameBank} setTeam={setTeam}>
                    {students.map((student, index) =>
                        student.teamId === "Pending" ?
                            <Name key={index} id={index} className="name" draggable="true" onyen={student['onyen']}
                                  studentIndex={index} teamId={student['teamId']}>
                                <Card variant="outlined">
                                    <CardContent>
                                        {`${student['firstName']} ${student['lastName']}`}
                                    </CardContent>
                                </Card>
                            </Name> : null
                    )}
                </TeamBox>

                <Container className="disable-select">
                    <Box textAlign="center">
                        <Typography>
                            Drag student name to the top of the box for the team you want to place him or her in. Drag
                            him or her to the navy box to remove them from all teams.
                        </Typography>
                    </Box>
                    <Grid container spacing={3}>
                        {teams.map((team, index) =>
                            <Grid item key={0 - index - 1} xs={3} ml={5}>
                                <Card variant="outlined" className="teamTile">
                                    <TeamBox id={`${team['_id']}`} setTeam={setTeam}>
                                        <Typography variant="h6">{team['teamName']}</Typography>
                                        {students.map((student, index) =>
                                            student['teamId'] === team['_id'] ?
                                                <Name key={index} id={index} className="name" draggable="true"
                                                      onyen={student['onyen']} studentIndex={index}
                                                      teamId={student['teamId']}>
                                                    <Card variant="outlined">
                                                        <CardContent>
                                                            {`${student['firstName']} ${student['lastName']}`}
                                                        </CardContent>
                                                    </Card>
                                                </Name> : null
                                        )}
                                    </TeamBox>
                                </Card>
                            </Grid>
                        )}
                    </Grid>

                    <Button title="To add multiple new teams, submit one new team then refresh the page" disabled={newTeams.length > 0} variant="outlined" style={{'marginBottom': '2em', 'marginTop': '2em'}} onClick={addNewTeam}>Add
                        new
                        Team</Button>
                    <Grid container spacing={3}>
                        {newTeams.map((team, index) =>
                            <Grid item key={0 - index - 1} xs={3} ml={5}>
                                <Card variant="outlined" className="teamTile">
                                    <TeamBox id={`new${index + 1}`} setTeam={setTeam}>
                                        <Typography variant="h6">{`New Team`}</Typography>
                                        {students.map((student, i) =>
                                            student['teamId'] === `new${index + 1}` ?
                                                <Name key={i} id={i} className="name" draggable="true"
                                                      onyen={student['onyen']} studentIndex={i}
                                                      teamId={student['teamId']}>
                                                    <Card variant="outlined">
                                                        <CardContent>
                                                            {`${student['firstName']} ${student['lastName']}`}
                                                        </CardContent>
                                                    </Card>
                                                </Name>
                                                : null
                                        )}
                                    </TeamBox>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Container>
                <Button variant="contained" color="secondary" onClick={submitTeams}
                        style={{'marginLeft': '30px', 'marginTop': '30px'}}>
                    Submit Teams
                </Button>
            </main>
        </div>
    );
}

export default AdminTeamSelection;
