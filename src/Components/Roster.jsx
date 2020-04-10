import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import DashBoard from "./DashBoard";
import Container from "@material-ui/core/Container";
import {TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

const dummyRoster = [
    {onyen: 'dan97w', firstName: 'Daniel', lastName: 'Weber'}
];


function Roster() {
    const classes = useStyles();
    const [names, setNames] = useState([]);
    const [onyens, setOnyens] = useState([]);

    function onyensChange(e) {
        let onyensArr = e.target.value.split('\n');
        setOnyens(onyensArr)
        // console.log(onyensArr)
    }

    function namesChange(e) {
        let namesArr = e.target.value.split('\n');
        setNames(namesArr);
        // console.log(namesArr)
    }

    function submitRoster(){
        let payload = [];
        if (names.length === 0){
            alert('Please enter names and onyens')
        } else if(names.length !== onyens.length) {
            alert('You must enter the same number of names and onyens');
        } else{
            names.forEach((name, index) =>{
                let lastAndFirstName = name.split(',');
                payload.push({
                    firstName: lastAndFirstName[1],
                    lastName: lastAndFirstName[0],
                    onyen: onyens[index]
                });
            });
            console.log(payload)
        }
    }

    return (
        <div className={classes.root}>
            <DashBoard/>
            {console.log(window.innerHeight)}
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container maxWidth="md">

                    <Card>

                    </Card>
                    <Button color="secondary" variant="contained">Add Roster</Button>
                    <Typography>Type your roster here</Typography>
                    <TextField value={names} onChange={(e)=>namesChange(e)} multiline variant="outlined"
                               label="Names (Last, First)">

                    </TextField>
                    <TextField value={onyens} onChange={(e)=> onyensChange(e)} multiline variant="outlined"
                               label="Corresponding Onyens">

                    </TextField>
                    <Button variant="outlined" onClick={submitRoster}>Submit Roster</Button>
                </Container>
            </main>
        </div>
    );
}

export default Roster;
