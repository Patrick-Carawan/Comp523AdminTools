import React, {useEffect, useState} from "react";
import '../App.css'
import CSVReader from "react-csv-reader";
import {makeStyles} from "@material-ui/core/styles";
import DashBoard from "./AdminDashboard";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from 'axios';


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
    csvInput: {
        padding: '10px',
        display: 'block',
        margin: '15px auto',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    uploadContainer: {
        textAlign: 'center',
        padding: '15px',
        margin: '10px auto',
    }
}));

const parseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

function Roster() {
    const classes = useStyles();
    const [roster, setRoster] = useState([]);
    const [semester, setSemester] = useState(window.localStorage.getItem('semester'));

    function setAllSemesterInfo() {
        axios.get(`/roster/${semester}`,{
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            if (res.data[0]) {
                console.log(res.data)
                setRoster(res.data[0].studentList);
            } else{
                setRoster([]);
            }
        }).catch(err => console.log(err));
    }

    useEffect(() => {
      setAllSemesterInfo();
    }, [semester]);

    //sets the roster to be the contents of the csv
    const readfile = (data) => {
        setRoster(data)
    };

    function submitRoster() {
        axios.post(`/roster/add/${semester}`, {
            studentList: roster
        },{
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then(() => alert('Roster submitted')).catch(e => alert(e))
    }

    return (
        <div className={classes.root}>
            <DashBoard updateSemester={(sem) => setSemester(sem)}/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {/*<Container maxWidth="md">*/}
                <Grid container direction="row">
                    <Grid item style={{'width': '50%'}}>
                        <Typography variant="h4">
                            Please submit your roster.
                        </Typography>
                        <Typography>
                            If you have already submitted a roster for this semester, it will overwrite the existing one.
                        </Typography>
                        <div className={classes.uploadContainer}>
                            <p>Follow this example's formatting</p>
                            <img alt="Example CSV" src={require("../Images/exampleCSV.PNG")}/>
                            <CSVReader
                                cssClass="react-csv-input"
                                label="Upload Roster CSV (comma delimited, NOT XSLX or XSL) here. "
                                onFileLoaded={readfile}
                                parserOptions={parseOptions}
                            />
                            <Button variant="contained" color="secondary" onClick={submitRoster}>Submit Roster</Button>
                        </div>
                    </Grid>
                    <Grid item style={{'width': '50%'}}>
                        {
                            roster.length > 0 ? <Card style={{'padding': '10px'}}>
                                {roster.map((roster, index) =>
                                    <Grid container key={index} direction="row" justify="space-around">
                                        <Grid item style={{'width': '50%'}}>
                                            <Typography align="left">
                                                {roster.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item style={{'width': '50%'}}>
                                            <Typography align="left">
                                                {roster.onyen}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </Card> : null
                        }
                    </Grid>
                </Grid>
                {/*</Container>*/}
            </main>
        </div>
    );
}

export default Roster;

