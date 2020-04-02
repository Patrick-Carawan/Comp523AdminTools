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
    const [teams, setTeams] = useState([]);
    const [currentTeam, setCurrentTeam] = useState('');
    const [tabIndex, setTabIndex] = useState(0);
    useEffect(() => {
        axios.get(`http://localhost:5000/teams`).then((res) => {
            console.log('teams',res['data']);
            setTeams(res['data']);
        })

    }, []);

    const handleChange = (event) => {
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
                                    {teams.map((teamItem, i) => (
                                        <MenuItem key={i} value={teamItem['teamName']}>
                                            {teamItem['teamName']}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Tabs
                        value={tabIndex}
                        onChange={handleTabClick}
                        aria-label="simple tabs example"
                        centered
                    >
                        <Tab label="Team's"/>
                        <Tab label="Daniel's"/>
                        <Tab label="Patrick's"/>
                    </Tabs>

                    <TabPanel value={tabIndex} index={0}>
                        <Box textAlign="center">
                        <Typography>
                            This is the team's report. It will have all of the info that teams need to report by the end of the year. {lorem}{lorem}
                        </Typography>
                        </Box>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={1}>
                        <Typography>
                            This is Daniel's report{lorem}{lorem}
                        </Typography>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={2}>
                        <Typography>
                            This is the Patrick's report{lorem}{lorem}
                        </Typography>
                    </TabPanel>
                </Container>
            </main>
        </div>);
}

export default FinalReports;
