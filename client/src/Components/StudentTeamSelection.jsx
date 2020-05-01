import React, {useEffect, useState} from 'react';
import TeamBox from './TeamBox';
import Name from './Name';
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, Container, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import DashBoard from "./StudentDashboard";
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
    },
    columnPad: {
        padding: '15px'
    }

}));


function StudentTeamSelection(props) {
    const [students, setStudents] = useState([]);
    const [draggedOnyens, setDraggedOnyens] = useState([]);
    const [typedOnyens, setTypedOnyens] = useState([]);
    const [semester, setSemester] = useState('');

    useEffect(() => {
        axios.get(`/semesters/current`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then(res => {
            setSemester(res['data']);
            let currentSemester = res['data'];
            axios.get(`/users/students/${currentSemester}`, {
                headers: {
                    Authorization: `Token ${window.localStorage.getItem('token')}`
                }
            }).then(res => {
                console.log('allStudents', res['data'].filter(student => student['admin'] === false));
                setStudents(res['data'].filter(student => student['admin'] === false))
            }).catch(err => alert(err));
        }).catch(err => alert(err))
    }, []);


    //puts dragged student into a team
    const setTeam = function (oldBoxId, newBoxId, onyen, studentIndex) {
        console.log('newBoxId', newBoxId);
        let tempStudents = [...students];
        tempStudents[studentIndex]['teamId'] = newBoxId;
        setStudents(tempStudents);
        let tempDragged = [...draggedOnyens];
        if (newBoxId === "Assigned") {
            tempDragged.push(onyen);
            setDraggedOnyens(tempDragged);
        } else {
            tempDragged.splice(tempDragged.indexOf(onyen), 1);
            setDraggedOnyens(tempDragged);
        }
    };

    const submitTeams = function (e) {
        e.preventDefault();
        let assignedStudents = students.filter(student => student['teamId'] !== "Assigned").map(student => student['onyen']);
        for (let i = 0; i < typedOnyens.length; i++) {
            if (assignedStudents.includes(draggedOnyens[i])) {
                alert(`${draggedOnyens[i]} is already in another team. Please have your teacher manually move you to the new team.`);
                return;
            }
        }
        //verifies that students must  know onyen to put themselves in a team
        //so they can' t put random students into random teams
        //for mischievous purposes
        if (!typedOnyens.every((onyen) =>
            draggedOnyens.includes(onyen)
        ) || typedOnyens.length !== draggedOnyens.length || typedOnyens.length === 0) {
            alert(`Onyens must all match their student's names to submit your team.`)
        } else {
            axios.post(`/teams/addAsUser/${window.localStorage.getItem('onyen')}`, {
                teamMembers: draggedOnyens,
                semester: semester
            }, {
                headers: {
                    Authorization: `Token ${window.localStorage.getItem('token')}`
                }
            }).then((res) => {
                alert('posted initial team');
                draggedOnyens.forEach((onyen, i) => {
                    axios.post(`/users/updateTeam/${onyen}`, {
                        teamId: res['data']['id']
                    },{
                        headers: {
                            Authorization: `Token ${window.localStorage.getItem('token')}`
                        }
                    }).then(() => {

                        if (i === draggedOnyens.length - 1) {
                            alert('Team successfully submitted')
                        }
                    }).catch(err => alert(err))
                })
            }).catch(err => alert(err));
        }
    };

    const classes = useStyles();

    function updateTypedOnyens(e, index) {
        let copy = [...typedOnyens];
        copy[index] = e.target.value;
        setTypedOnyens(copy);
    }

    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <TeamBox id="Pending" className={classes.nameBank} setTeam={setTeam}>
                    {students.map((student, index) =>
                        student['teamId'] === "Pending" ?
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

                <Container className="disable-select">
                    <form onSubmit={submitTeams}>
                        <Grid container direction="row" justify="space-between">
                            <Grid item style={{'maxWidth': '45%', 'marginRight': '5%'}} className={classes.teamBox}>
                                <Card className={classes.columnPad} variant="outlined">
                                    <Grid container
                                          direction="column"
                                          justify="center"
                                          alignItems="center"
                                    >
                                        <Grid item>
                                            <Typography variant="h6" style={{'marginBottom': '10px'}}>Drag the names of
                                                the
                                                people you want in your team into the box
                                                below.</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Card variant="outlined" className="teamTile">
                                                <TeamBox id="Assigned" setTeam={setTeam}>
                                                    <Box textAlign="center">
                                                        <Typography>Drag Names Onto This Text</Typography>
                                                    </Box>
                                                    {students.map((student, index) =>
                                                        student['teamId'] === "Assigned" ?
                                                            <Name key={index} id={index} className="name"
                                                                  draggable="true"
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
                                    </Grid>
                                </Card>
                            </Grid>
                            <Grid item style={{'maxWidth': '50%'}} className={classes.teamBox}>
                                <Card variant="outlined" className={classes.columnPad}>
                                    <Grid container direction="column" justify="space-around" alignItems="center">
                                        <Grid item>
                                            <Typography>Type the onyens for the people you are choosing to be on your
                                                team
                                                in the boxes below.
                                                (They will appear once you drag the names)
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container direction="row" justify="center">
                                                {draggedOnyens.map((box, index) => <Grid item key={index}>
                                                    <TextField variant="outlined" label="Onyen"
                                                               style={{'marginLeft': '10px', 'marginTop': '30px'}}
                                                               onChange={(e) => updateTypedOnyens(e, index)}>
                                                    </TextField>
                                                </Grid>)}
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="secondary" onClick={submitTeams}
                                                    style={{'marginTop': '30px'}}>
                                                Submit Team
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </main>
        </div>
    );
}

export default StudentTeamSelection;
