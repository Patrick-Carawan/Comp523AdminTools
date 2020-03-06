import React from 'react';
import TeamBox from './TeamBox';
import Name from './Name';
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, Container} from "@material-ui/core";

const studentNames = [
    "Daniel", "Abraham", "Patrick", "Zion",
    "Bill", "Jim", "Billy", "Bob",
    "Cory", "Josiah", "Ezekial", "Al",
    "Fred", "Keaton", "Hector", "Susie",
    "Rachael", "Taylor", "Jack", "Broheim",
    "Jason", "Said", "Hank", "Sally",
    "Renee", "Tim", "Chester", "Alex",
    "Rick", "Lewis", "Jenna", "Ella",
    "Charles", "Julie", "Marcus", "Barbara",
    "Judy", "Kate", "Bradley", "Circle"
];

const letters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

function TeamSelection(props) {
    return (
        <div>
            <TeamBox id="box-1" className="nameBank">
                        {/*<Name id="name-1" className="card" draggable="true">*/}
                        {/*        <p>Card One</p>*/}
                        {/*</Name>*/}
                        {studentNames.map((studentName, index) =>
                                <Name id={index} className="name" draggable="true">
                                    <Card variant="outlined">
                                        <CardContent>
                                            {studentName}
                                        </CardContent>
                                    </Card>
                                </Name>
                        )}
            </TeamBox>
            <TeamBox id="box-2" className="teamTile">
                <Name id="name-2" className="card" draggable="true">
                    <p>Card Two</p>
                </Name>
            </TeamBox>


        </div>
    );
}

export default TeamSelection;
