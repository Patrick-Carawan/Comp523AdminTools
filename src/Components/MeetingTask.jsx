import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Title from "./Title";
import FormControl from "@material-ui/core/FormControl";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useEffect } from "react";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function MeetingTask(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("Controlled");
  const [comment, setComment] = React.useState("");
  const [weeklyNote, setWeeklyNote] = React.useState("");
  const [demoStatus, setDemoStatus] = React.useState("");
  const [deliverableStatus, setDeliverableStatus] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <FormControl component="fieldset">
              <Title>Demo</Title>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
                onChange={(e) => {
                  setDemoStatus(e.target.value);
                }}
              >
                <FormControlLabel
                  value="demo fine"
                  control={<Radio color="primary" />}
                  label="demo fine"
                  labelPlacement="start"
                />{" "}
                <FormControlLabel
                  value="demo bad"
                  control={<Radio color="primary" />}
                  label="demo bad"
                  labelPlacement="start"
                />{" "}
                <FormControlLabel
                  value="no demo"
                  control={<Radio color="default" />}
                  label="no demo"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset">
              <Title>Deliverable</Title>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
                onChange={(e) => {
                  setDeliverableStatus(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <FormControlLabel
                  value="finished"
                  control={<Radio color="primary" />}
                  label="finished"
                  labelPlacement="start"
                />{" "}
                <FormControlLabel
                  value="unfinished"
                  control={<Radio color="secondary" />}
                  label="unfinished"
                  labelPlacement="start"
                />{" "}
                <FormControlLabel
                  value="excused"
                  control={<Radio color="default" />}
                  label="excused"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid className="commentSection" item xs={4}>
            <TextField
              id="outlined-multiline-static"
              label="Comment for the team"
              multiline
              rows="8"
              fullWidth
              defaultValue=""
              variant="outlined"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </Grid>
          <Grid className="commentSection" item xs={4}>
            <TextField
              id="outlined-multiline-static"
              label="To do for coming week"
              multiline
              fullWidth
              rows="8"
              defaultValue=""
              variant="outlined"
              onChange={(e) => {
                setWeeklyNote(e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
