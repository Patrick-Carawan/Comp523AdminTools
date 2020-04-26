import React, {useEffect, useState} from 'react';
import DashBoard from "./AdminDashboard";
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

function AdminFinalReports() {
    const classes = useStyles();
    const [teamReports, setTeamReports] = useState([]);
    const [studentReports, setStudentReports] = useState([]);
    const [currentTeam, setCurrentTeam] = useState({});
    const [tabIndex, setTabIndex] = useState(0);
    const [teamToMembersMap, setTeamToMembersMap] = useState(new Map());
    const [teamIdsToNames, setTeamIdsToNames] = useState(new Map());
    const [teams, setTeams] = useState([]);
    const [onyenMap, setOnyenMap] = useState(new Map());
    const [semester, setSemester] = useState(window.localStorage.getItem('semester'));

    // useEffect(() => {
    //     console.log('currentTeam', currentTeam);
    //     console.log('teamIdsToNames', teamIdsToNames);
    //     console.log('teamToMemebers', teamToMembersMap);
    // }, [currentTeam]);

    const setAllSemesterInfo = () => {
        console.log(onyenMap)
        setCurrentTeam({});
        axios.get(`http://localhost:5000/teams/semester/${semester}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log('teams', res['data']);
            const myTeams = res['data'].sort((team1, team2) => team1['teamName'] < team2['teamName'] ? -1 : 1);
            let tempMap = new Map();
            let tempIdToName = new Map();
            myTeams.forEach(team => {
                tempMap.set(team['teamName'], team['teamMembers']);
                tempIdToName.set(team['_id'], team['teamName']);
            });
            // console.log(tempMap);
            setTeams(myTeams);
            setTeamToMembersMap(tempMap);
            setTeamIdsToNames(tempIdToName);
        });

        axios.get(`http://localhost:5000/finalReports/students/${semester}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log('student reports', res['data']);
            setStudentReports(res['data'].sort((team1, team2) => team1['team'] < team2['team'] ? -1 : 1));
        });

        axios.get(`http://localhost:5000/finalReports/teams/${semester}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log('team reports', res['data']);
            setTeamReports(res['data'].sort((team1, team2) => team1['team'] < team2['team'] ? -1 : 1));
        });
        axios.get(`http://localhost:5000/roster/${semester}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log('roster', res.data);
            let tempOnyenMap = new Map();
            if (res.data[0]) {
                res.data[0].studentList.forEach(obj => tempOnyenMap.set(obj.onyen, obj.name));
                console.log(tempOnyenMap);
                setOnyenMap(tempOnyenMap);
            }
        })
    };

    useEffect(() => {
        setAllSemesterInfo()
    }, [semester]);

    useEffect(() => {
        // axios.get(`http://localhost:5000/roster/${semester}`, {
        //     headers: {
        //         Authorization: `Token ${window.localStorage.getItem('token')}`
        //     }
        // }).then((res) => {
        //     console.log('roster', res.data);
        //     let tempOnyenMap = new Map();
        //     if (res.data[0]) {
        //         res.data[0].studentList.forEach(obj => tempOnyenMap.set(obj.onyen, obj.name));
        //         console.log(tempOnyenMap);
        //         setOnyenMap(tempOnyenMap);
        //     }
        // })
    }, [semester]);

    const handleChange = (event) => {
        // console.log('will be current team', event.target.value);
        setCurrentTeam(event.target.value);
        console.log(currentTeam);
    };

    const handleTabClick = (event, newValue) => {
        setTabIndex(newValue)
    };

    return (
        <div className={classes.root}>
            <DashBoard updateSemester={(sem) => setSemester(sem)}/>
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
                                    {/*{teamReports.map((teamItem, i) => (*/}
                                    {/*    <MenuItem key={i} value={teamItem}>*/}
                                    {/*        {teamIdsToNames.get(teamItem['team'])}*/}
                                    {/*    </MenuItem>*/}
                                    {/*))}*/}

                                    {teams.map((team, i) => (
                                        <MenuItem key={i} value={team}>
                                            {team['teamName']}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {
                        // teamToMembersMap.get(teamIdsToNames.get(currentTeam['team'])) ?
                        currentTeam.hasOwnProperty('_id') ?
                            <Tabs
                                value={tabIndex}
                                onChange={handleTabClick}
                                aria-label="simple tabs example"
                                centered
                            >
                                <Tab label="Team"></Tab>
                                {/*{*/}
                                {/*    studentReports.filter(rep => teamToMembersMap.get(teamIdsToNames.get(currentTeam['team'])).includes(rep['onyen'])).map((report, index) =>*/}
                                {/*        // <Tab label={onyenMap.get(report['onyen'])} key={index}>{onyenMap.get(report['onyen'])}</Tab>*/}
                                {/*        <Tab label={onyenMap.get(report['onyen'])} key={index}></Tab>*/}
                                {/*    )*/}
                                {/*}*/}
                                {currentTeam.teamMembers.map((teamMember,i) =>
                                <Tab label={onyenMap.get(teamMember)} key={i}>{teamMember}</Tab>)}
                            </Tabs>
                            : null
                    }
                    <TabPanel value={tabIndex} index={0}>
                        <Typography>
                            {currentTeam['text']}
                        </Typography>
                    </TabPanel>
                    {
                        teamToMembersMap.get(teamIdsToNames.get(currentTeam['team'])) ?
                            studentReports.filter(report => teamToMembersMap.get(teamIdsToNames.get(currentTeam['team'])).includes(report['onyen'])).map((rep, i) =>
                            // studentReports.map((rep, i) =>
                                <TabPanel key={i} value={tabIndex} index={i+1}>
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

export default AdminFinalReports;
