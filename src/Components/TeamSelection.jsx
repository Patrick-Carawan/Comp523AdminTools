import React from 'react';
import TeamBox from './TeamBox';
import Name from './Name';
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import DashBoard from "./DashBoard";

//This will need to come from the backend. Teacher should be able to set this parameter.
const numTeams = 8;


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    nameBank: {
        backgroundColor: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '15px',
    }
}));

const studentNames = [
    "Daniel Austin Weber Longname", "Abraham", "Patrick", "Zion", "Bill",
    "Jim", "Billy", "Bob", "Cory", "Josiah",
    "Ezekial", "Al", "Fred", "Keaton", "Hector",
    "Susie", "Rachael", "Taylor", "Jack", "Broheim",
    "Jason", "Said", "Hank", "Sally", "Renee",
    "Tim", "Chester", "Alex", "Rick", "Lewis",
    "Jenna", "Ella", "Charles", "Julie", "Marcus",
    "Barbara", "Judy", "Kate", "Bradley", "Circle"
];

let nameTeamMap = new Map();
studentNames.forEach((name, index) => nameTeamMap.set(index, -1));
let studentArray = [];
studentNames.forEach(name => studentArray.push({
    name: name,
    group: 'NONE'
}));

const letters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
letters.unshift('NONE');

const setTeam = function (studentIndex, teamIndex) {
    studentArray[studentIndex]['group'] = letters[teamIndex];
};

const submitTeams = function () {
    let groups = studentArray.reduce((r, a) => {
        r[a.group] = [...r[a.group] || [], a];
        return r;
    }, {});
    //send to backend instead of just logging
    console.log(groups);
};

function TeamSelection(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <TeamBox id="0box" className={classes.nameBank} setTeam={setTeam}>
                    {studentNames.map((studentName, index) =>
                        <Name key={index} id={index} className="name" draggable="true">
                            <Card variant="outlined">
                                <CardContent>
                                    {studentName}
                                </CardContent>
                            </Card>
                        </Name>
                    )}
                </TeamBox>

                <Container className="disable-select">
                    <Box textAlign="center">
                        <Typography>
                            Drag your name to the top of the box for the team you want to join.
                        </Typography>
                    </Box>
                    <Grid container spacing={3}>
                        {letters.map((letter, index) =>
                            index < numTeams && index !== 0 ?
                                <Grid item key={0 - index - 1} xs={3} ml={5}>
                                    <Card variant="outlined" className="teamTile">
                                        <TeamBox id={`${index}box`} setTeam={setTeam}>
                                            <Typography variant="h6">Team {letter}</Typography>
                                        </TeamBox>
                                    </Card>
                                </Grid>
                                : null
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

export default TeamSelection;
