import React from 'react';
import {CardContent, Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TopNav from "./TopNav";

const teams = [
    ["Daniel", "Abraham", "Patrick", "Zion"],
    ["Bill", "Jim", "Billy", "Bob"],
    ["Cory", "Josiah", "Ezekial", "Al"],
    ["Fred", "Keaton", "Hector", "Susie"],
    ["Rachael", "Taylor", "Jack", "Broheim"],
    ["Jason", "Said", "Hank", "Sally"],
    ["Renee", "Tim", "Chester", "Alex"],
    ["Rick", "Lewis", "Jenna", "Ella"],
    ["Charles", "Julie", "Marcus", "Barbara"],
    ["Judy", "Kate", "Bradley", "Circle"]
];
const letters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

function TeamsGrid(props) {

    return (
        <div>
            <TopNav/>
            <Box mt={6}>
                <Container>
                    <Grid container spacing={3}>
                        {teams.map((team, index) =>
                            <Grid item key={index} xs={3} ml={5}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Grid item>
                                            <Box textAlign="center" fontWeight="fontWeightBold">
                                                <Typography variant="title">Team {letters[index]}</Typography>
                                            </Box>
                                            <Typography variant="h6">{team[0]}</Typography>
                                            <Typography variant="h6">{team[1]}</Typography>
                                            <Typography variant="h6">{team[2]}</Typography>
                                            <Typography variant="h6">{team[3]}</Typography>
                                            <Box textAlign="right">
                                                <Button variant="contained" color="primary">Edit</Button>
                                            </Box>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </Box>
        </div>
    );
}

export default TeamsGrid;
