import React, {useEffect, useState} from 'react';
import DashBoard from "./AdminDashboard";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import axios from 'axios';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from 'prop-types';
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";


//Function to general tabs content
function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

//makes the tabs scrollable
function tabProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
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
    const [currentTeam, setCurrentTeam] = useState({});
    const [tabIndex, setTabIndex] = useState(0);
    const [teamIdToReport, setTeamIdToReport] = useState(new Map());
    const [onyenToReport, setOnyenToReport] = useState(new Map());
    const [teams, setTeams] = useState([]);
    const [onyenMap, setOnyenMap] = useState(new Map());
    const [semester, setSemester] = useState(window.localStorage.getItem('semester'));

    //whenever the semester changes, sets all values, such as teams, final reports, students to be
    //accurate for the new semester
    const setAllSemesterInfo = () => {
        // console.log(onyenMap);
        setCurrentTeam({});
        axios.get(`/teams/semester/${semester}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            // console.log('teams', res['data']);
            const myTeams = res['data'].sort((team1, team2) => team1['teamName'] < team2['teamName'] ? -1 : 1);
            let tempMap = new Map();
            myTeams.forEach(team => {
                tempMap.set(team['teamName'], team['teamMembers']);
            });
            // console.log(tempMap);
            setTeams(myTeams);
        });

        axios.get(`/finalReports/students/${semester}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            // console.log('student reports', res['data']);
            let tempReportMap = new Map();
            res['data'].forEach(report => tempReportMap.set(report.onyen, report.text));
            setOnyenToReport(tempReportMap);
        });

        axios.get(`/finalReports/teams/${semester}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            // console.log('team reports', res['data']);
            let tempMap = new Map();
            res['data'].forEach(report => tempMap.set(report['team'], report['text']));
            setTeamIdToReport(tempMap);

        });
        axios.get(`/roster/${semester}`, {
            headers: {
                Authorization: `Token ${window.localStorage.getItem('token')}`
            }
        }).then((res) => {
            // console.log('roster', res.data);
            let tempOnyenMap = new Map();
            if (res.data[0]) {
                res.data[0].studentList.forEach(obj => tempOnyenMap.set(obj.onyen, obj.name));
                // console.log(tempOnyenMap);
                setOnyenMap(tempOnyenMap);
            }
        })
    };

    useEffect(() => {
        setAllSemesterInfo()
    }, [semester]);

    const handleChange = (event) => {
        // console.log('will be current team', event.target.value);
        setCurrentTeam(event.target.value);
        // console.log(currentTeam);
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
                        currentTeam.hasOwnProperty('_id') ?
                            <Tabs
                                value={tabIndex}
                                onChange={handleTabClick}
                                aria-label="scrollable auto tabs example"
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                <Tab label="Team" {...tabProps(0)}></Tab>
                                {currentTeam.teamMembers.map((teamMember, i) =>
                                    <Tab label={onyenMap.get(teamMember)} key={i} {...tabProps(i+1)} >{teamMember}</Tab>)}
                            </Tabs>
                            : null
                    }
                    <TabPanel value={tabIndex} index={0}>
                        <Typography>
                            {teamIdToReport.get(currentTeam['_id']) ? teamIdToReport.get(currentTeam['_id']) : `No Submission for ${currentTeam['teamName']} Yet`}
                        </Typography>
                    </TabPanel>
                    {
                        currentTeam['teamName'] ?
                            currentTeam['teamMembers'].map((onyen, i) =>
                                    onyenMap.get(onyen) ?
                                        <TabPanel key={i} value={tabIndex} index={i + 1}>
                                            <Typography>
                                                {onyenToReport.get(onyen) ? onyenToReport.get(onyen) : `No Submission  for ${onyenMap.get(onyen)} Yet`}
                                            </Typography>
                                        </TabPanel>
                                        : null
                            )
                            : null
                    }
                </Container>
            </main>
        </div>
    );
}

export default AdminFinalReports;
