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
    const [currentTeam, setCurrentTeam] = useState();
    useEffect(() => {
        axios.get(`http://localhost:5000/teams`).then((res) => {
            console.log(res['data']);
        })
    }, []);

    const handleChange = (event) => {
        setCurrentTeam(event.target.value);
    };
    return (
        <div className={classes.root}>
            <DashBoard/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container maxWidth="sm">
                    <h1>Select Team to View Reports</h1>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Name</InputLabel>
                        <Select
                            multiple
                            // value={personName}
                            onChange={handleChange}
                            input={<Input />}
                            MenuProps={MenuProps}
                        >
                            {teams.map((teamItem) => (
                                <MenuItem key={teamItem} value>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Container>
            </main>
        </div>);
}

export default FinalReports;
