import React from 'react';
import TeamBox from './TeamBox';
import Name from './Name';
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//This will need to come from the backend. Teacher should be able to set this parameter.
const numTeams = 8;

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
console.log('setting blank student map');
studentNames.forEach((name, index) => nameTeamMap.set(index, -1));
let studentArray = []
studentNames.forEach(name => studentArray.push({
    name: name,
    group: 'NONE'
}));

const letters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

const setTeam = function (studentIndex, teamIndex) {
    // nameTeamMap.set(studentIndex, teamIndex);
    // console.log(nameTeamMap.get(studentIndex));
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
    return (
        <div>
            <TeamBox id="box-1" className="nameBank">
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
                <Grid container spacing={3}>
                    {letters.map((letter, index) =>
                        index < numTeams ?
                            <Grid item key={0 - index-1} xs={3} ml={5}>
                                <Card className="teamTile">
                                    <TeamBox id={`${index}box`} setTeam={setTeam}>
                                        <Typography variant="h6">Team {letter}</Typography>
                                    </TeamBox>
                                </Card>
                            </Grid>
                            : null
                    )}
                </Grid>
            </Container>
            <Button variant="contained" color="primary" onClick={submitTeams}
                    style={{'marginLeft': '30px', 'marginTop': '30px'}}>
                Submit Teams
            </Button>
        </div>
    );
}

export default TeamSelection;
