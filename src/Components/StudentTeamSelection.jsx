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
    const [draggedOnyens, setDraggedOnyens] = useState([]);
    const [typedOnyens, setTypedOnyens] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:5000/users/students/Spring2020`).then(res => {
            console.log('allStudents', res['data'].filter(student => student['admin'] === false));
            setAllStudents(res['data'].filter(student => student['admin'] === false))
        });
        axios.get(`http://localhost:5000/teams/Spring2020`).then(res => {
            console.log('teams', res['data']);
            setTeams(res['data'].sort((t1, t2) => t1['teamName'] < t2['teamName'] ? -1 : 1))
        })
    }, []);

    // useEffect(() => console.log(draggedOnyens), [draggedOnyens]);

    const setTeam = function (studentIndex, teamIndex, onyen) {
        if (teamIndex > 0) {
            // console.log('set team index > 0');
            let temp = [...draggedOnyens];
            temp.push(onyen);
            setDraggedOnyens(temp);
        } else {
            let tempDragged = [...draggedOnyens];
            tempDragged.splice(draggedOnyens.indexOf(onyen), 1);
            setDraggedOnyens(tempDragged);
            let tempTyped = [...typedOnyens];
            tempTyped.splice(typedOnyens.indexOf(onyen), 1);
            setTypedOnyens(tempTyped)
            ;tempTyped.splice(typedOnyens.indexOf(onyen), 1);
        }
    };

    const submitTeams = function (e) {
        e.preventDefault();
        console.log('draggedOnyens', draggedOnyens);
        console.log('typedOnyens', typedOnyens);
        if (!typedOnyens.every((onyen) =>
            draggedOnyens.includes(onyen)
        ) || typedOnyens.length !== draggedOnyens.length || typedOnyens.length === 0) {
            alert(`Onyens must all match their student's names to submit your team.`)
        } else {
            // axios.post(`http://localhost:5000/teams/add`,{
            //     teamName: '12:30 test',
            //     teamMembers: draggedOnyens,
            //     semester: 'Spring2020'
            // }).then(alert('Team successfully submitted'))
            //need to redirect to another component here
            alert('good')
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
                <TeamBox id="0box" className={classes.nameBank} setTeam={setTeam}>
                    {allStudents.map((student, index) =>
                        <Name key={index} id={index} className="name" draggable="true" onyen={student['onyen']}>
                            <Card variant="outlined">
                                <CardContent>
                                    {`${student['firstName']} ${student['lastName']}`}
                                </CardContent>
                            </Card>
                        </Name>
                    )}
                </TeamBox>

                <Container className="disable-select">
                    <form onSubmit={submitTeams}>
                        <Grid container
                              direction="column"
                              justify="center"
                              alignItems="center"
                              className={classes.teamBox}>
                            <Grid item>
                                <Typography variant="h6" style={{'marginBottom':'10px'}}>Drag the names of the people you want in your team into the box
                                    below.</Typography>
                            </Grid>
                            <Grid item>
                                <Card variant="outlined" className="teamTile">
                                    <TeamBox id={`-1box`} setTeam={setTeam}>
                                        <Box textAlign="center">
                                            <Typography>Drag Names Onto This Text</Typography>
                                        </Box>
                                    </TeamBox>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Grid item>
                                    <Typography style={{'marginTop':'10px'}}>Type the onyens for the people you are choosing to be on your team in the boxes below.
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
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="secondary" onClick={submitTeams}
                                        style={{'marginLeft': '30px', 'marginTop': '30px'}}>
                                    Submit Team
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </main>
        </div>
    );
}

export default StudentTeamSelection;
