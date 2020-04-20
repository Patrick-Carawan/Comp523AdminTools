import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DataSelector(props) {
  const classes = useStyles();
  //   console.log(props);
  //   console.log("Property: " + props.teams["data"]);
  //   console.log(typeof props.teams);
  const [week, setWeek] = React.useState("");
  const [teams, setTeams] = React.useState([]);
  const [selectedTeam, setSelectedTeam] = React.useState([]);

  const handleWeekChange = (event) => {
    props.changeWeek(event.target.value);
    setWeek(event.target.value);
  };

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
    props.changeSelectedTeam(event.target.value);
  };

  //   Radio
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      {/* Week Selection */}
      <Grid container>
        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel shrink id="">
              Week
            </InputLabel>
            <Select
              labelId=""
              id=""
              value={week}
              onChange={handleWeekChange}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Week 1</MenuItem>
              <MenuItem value={2}>Week 2</MenuItem>
              <MenuItem value={3}>Week 3</MenuItem>
              <MenuItem value={4}>Week 4</MenuItem>
              <MenuItem value={5}>Week 5</MenuItem>
              <MenuItem value={6}>Week 6</MenuItem>
              <MenuItem value={7}>Week 7</MenuItem>
              <MenuItem value={8}>Week 8</MenuItem>
              <MenuItem value={9}>Week 9</MenuItem>
              <MenuItem value={10}>Week 10</MenuItem>
              <MenuItem value={11}>Week 11</MenuItem>
              <MenuItem value={12}>Week 12</MenuItem>
              <MenuItem value={13}>Week 13</MenuItem>
              <MenuItem value={14}>Week 14</MenuItem>
              <MenuItem value={15}>Week 15</MenuItem>
              <MenuItem value={16}>Week 16</MenuItem>
            </Select>
            <FormHelperText>Choose the week</FormHelperText>
          </FormControl>
        </Grid>

        {/* Team Selection */}
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="">
            Team
          </InputLabel>
          <Select
            labelId=""
            id=""
            value={selectedTeam}
            onChange={handleTeamChange}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {props.teams.map((team, index) => (
              <MenuItem value={team} key={index}>
                {team["teamName"]}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Choose the team</FormHelperText>
        </FormControl>
      </Grid>
    </div>
  );
}
