import React, {useEffect, useState} from 'react';
import TeamBox from './TeamBox';
import Name from './Name';
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import DashBoard from "./DashBoard";
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
        justifyContent: 'space-around'
    }
}));


function AdminTeamSelection(props) {
    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState([]);
    const [newTeams, setNewTeams] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/users/students/Spring2020`).then(res => {
            console.log('students', res['data'].filter(student=> student['admin'] === false));
            setStudents(res['data'].filter(student => student['admin'] === false))
        });
        axios.get(`http://localhost:5000/teams/Spring2020`).then(res => {
            console.log(res['data']);
            setTeams(res['data'].sort((t1, t2) => t1['teamName'] < t2['teamName'] ? -1 : 1))
        })
    }, []);

    // let nameTeamMap = new Map();
    // students.forEach((student, index) => nameTeamMap.set(index, -1));
    let groupingArray = [];
    students.forEach(student => groupingArray.push({
        name: student['onyen'],
        team: 'NONE'
    }));

    const letters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    letters.unshift('NONE');

    const setTeam = function (oldTeamId, newTeamId, onyen, studentIndex) {
        let tempStudents = [...students];
        console.log('students',students)
        tempStudents[studentIndex]['teamId'] = newTeamId;
        console.log('tempStudents', tempStudents);
        console.log('teams',teams)

        // groupingArray[studentIndex]['team'] = teams[teamIndex]['teamName'];
    };

    const submitTeams = function () {
        console.log(students);
        console.log(teams);
        // console.log(groupingArray);
        //
        let payload = {};
        groupingArray.forEach((name) => {
            if (payload.hasOwnProperty(name['team'])) {
                payload[name['team']].push(name['name'])
            } else {
                payload[name['team']] = [name['name']]
            }
        });
        console.log('payload', payload);

        for (let [key, value] of Object.entries(payload)) {
            console.log(key, value)
            axios.post(`http://localhost:5000/teams/add`, {
                teamName: key,
                teamMembers: value,
                semester: 'Spring2020'
            })
        }
    };


    const classes = useStyles();

    function addNewTeam() {
        let temp = [...newTeams];
        temp.push(0);
        setNewTeams(temp);
    }

    function getBoxsStudents(teamId){
        return students.filter(student => student['teamId'] === teamId);
    }

    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <TeamBox id="Pending" className={classes.nameBank} setTeam={setTeam}>
                    {students.map((student, index) =>
                        student.teamId === "Pending" ?
                        <Name key={index} id={index} className="name" draggable="true" onyen={student['onyen']} studentIndex={index} teamId={student['teamId']}>
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
                            Drag student name to the top of the box for the team you want to place him or her in.
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
                                                  onyen={student['onyen']} studentIndex={index} teamId={student['teamId']} >
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
                </Container>
                <Button variant="outlined" onClick={addNewTeam}>Add new Team</Button>
                {/*{newTeams.length > 0 ?*/}
                {/*    newTeams.map((team, index) =>*/}
                {/*    <Card variant="outlined" className="teamTile">*/}
                {/*        <TeamBox id={`${0-index}box`} setTeam={setTeam}>*/}
                {/*            <Typography variant="h6">New Team</Typography>*/}
                {/*        </TeamBox>*/}
                {/*    </Card>*/}
                {/*    )*/}
                {/*    : null}*/}
                <Button variant="contained" color="secondary" onClick={submitTeams}
                        style={{'marginLeft': '30px', 'marginTop': '30px'}}>
                    Submit Teams
                </Button>
            </main>
        </div>
    );
}

export default AdminTeamSelection;
