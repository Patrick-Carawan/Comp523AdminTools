import React, {useEffect, useState} from 'react';
import TeamBox from './TeamBox';
import Name from './Name';
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, Container, TextField} from "@material-ui/core";
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
        justifyContent: 'space-around',
        minHeight: '3em'
    },
    teamBox: {
        marginTop: '3em'
    }
}));


function StudentTeamSelection(props) {
    const [allStudents, setAllStudents] = useState([]);
    const [teams, setTeams] = useState([]);
    const [onyenBoxes, setOnyenBoxes] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/users/students/Spring2020`).then(res => setAllStudents(res['data'].filter(student => student['admin'] === false)));
        axios.get(`http://localhost:5000/teams/Spring2020`).then(res => {
            console.log(res['data']);
            setTeams(res['data'].sort((t1, t2) => t1['teamName'] < t2['teamName'] ? -1 : 1))
        })
    }, []);

    // let nameTeamMap = new Map();
    // students.forEach((student, index) => nameTeamMap.set(index, -1));
    let groupingArray = [];
    allStudents.forEach(student => groupingArray.push({
        name: student['onyen'],
        team: 'NONE'
    }));

    const setTeam = function (studentIndex, teamIndex) {
        groupingArray[studentIndex]['team'] = teams[teamIndex]['teamName'];
        if(teamIndex > 0){
            console.log('set team index > 0');
            let temp = [...onyenBoxes];
            temp.push(0);
            setOnyenBoxes(temp);
        } else{
            let temp = [...onyenBoxes];
            temp.pop();
            setOnyenBoxes(temp);
        }
        console.log(onyenBoxes)
    };

    const submitTeams = function () {
        console.log(groupingArray);

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


    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <TeamBox id="0box" className={classes.nameBank} setTeam={setTeam}>
                    {allStudents.map((student, index) =>
                        <Name key={index} id={index} className="name" draggable="true">
                            <Card variant="outlined">
                                <CardContent>
                                    {`${student['firstName']} ${student['lastName']}`}
                                </CardContent>
                            </Card>
                        </Name>
                    )}
                </TeamBox>

                <Container className="disable-select">
                    <Grid container
                          direction="column"
                          justify="center"
                          alignItems="center"
                          className={classes.teamBox}>
                        <Grid item>
                            <Card variant="outlined" className="teamTile">
                                <TeamBox id={`-1box`} setTeam={setTeam}>
                                    <Box textAlign="center">
                                        <Typography variant="h6">Drag Names Onto This Text</Typography>
                                    </Box>
                                </TeamBox>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Grid item>
                                <Grid container direction="row" justify="center">
                                    {onyenBoxes.map((box, index )=><Grid item key={index}>
                                        <TextField variant="outlined" label="Onyen" style={{'marginLeft': '10px', 'marginTop': '30px'}}>>
                                        </TextField>
                                    </Grid>)}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="secondary" onClick={submitTeams}
                                    style={{'marginLeft': '30px', 'marginTop': '30px'}}>
                                Submit Team
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}

export default StudentTeamSelection;
