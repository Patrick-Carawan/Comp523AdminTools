import React, {useEffect, useState} from 'react';
import DashBoard from "./DashBoard";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {Input} from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";
import lorem from "../lorem";


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginLeft: '5%'
    },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function FinalReports() {
    const classes = useStyles();
    const [teamReports, setTeamReports] = useState([]);
    const [studentReports, setStudentReports] = useState([]);
    const [teams, setTeams] = useState([])
    const [currentTeam, setCurrentTeam] = useState({});
    const [tabIndex, setTabIndex] = useState(0);
    const [teamMap, setTeamMap] = useState(new Map());
    useEffect(() => {
        axios.get(`http://localhost:5000/teams`).then((res) => {
            console.log('teams', res['data']);
            const myTeams = res['data'].sort((team1, team2) => team1['teamName'] < team2['teamName'] ? -1 : 1);
            setTeams(myTeams);
            let tempMap = new Map();
            myTeams.forEach(team => tempMap.set(team['teamName'], team['teamMembers']));
            console.log(tempMap);
            setTeamMap(tempMap);
        });
        axios.get(`http://localhost:5000/finalReports/students`).then((res) => {
            console.log('student reports', res['data']);
            setStudentReports(res['data'].sort((team1, team2) => team1['team'] < team2['team'] ? -1 : 1));
        });
        axios.get(`http://localhost:5000/finalReports/teams`).then((res) => {
            console.log('team reports', res['data']);
            setTeamReports(res['data'].sort((team1, team2) => team1['team'] < team2['team'] ? -1 : 1));
        })

    }, []);

    const handleChange = (event) => {
        console.log('will be current team', event.target.value)
        setCurrentTeam(event.target.value);
    };

    const handleTabClick = (event, newValue) => {
        setTabIndex(newValue)
    };

    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container maxWidth="md">
                    <Grid container direction="row" justify="center">
                        <Grid item>
                            <h1>Select Team to View Reports</h1>
                        </Grid>
                        <Grid item style={{'marginLeft': '5%'}}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Select Team</InputLabel>
                                <Select
                                    value={currentTeam}
                                    onChange={handleChange}
                                    MenuProps={MenuProps}
                                >
                                    {teamReports.map((teamItem, i) => (
                                        <MenuItem key={i} value={teamItem}>
                                            {teamItem['team']}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {
                        teamMap.get(currentTeam['team']) ?
                            <Tabs
                                value={tabIndex}
                                onChange={handleTabClick}
                                aria-label="simple tabs example"
                                centered
                            >
                                <Tab label="Team">Team</Tab>
                                {
                                    studentReports.filter(rep => teamMap.get(currentTeam['team']).includes(rep['onyen'])).map((report, index) =>
                                        <Tab label={report['onyen']} key={index}>{report['onyen']}</Tab>)
                                }
                            </Tabs>
                            : null
                    }
                    <TabPanel value={tabIndex} index={0}>
                        <Typography>
                            {currentTeam['text']}
                        </Typography>
                    </TabPanel>
                    {
                        teamMap.get(currentTeam['team']) ?
                            studentReports.filter(report => teamMap.get(currentTeam['team']).includes(report['onyen'])).map((rep, i) =>
                                <TabPanel value={tabIndex} index={i + 1}>
                                    <Typography>
                                        {rep['text']}
                                    </Typography>
                                </TabPanel>
                            )
                            : null
                    }

                </Container>
            </main>
        </div>
    );
}

export default FinalReports;
