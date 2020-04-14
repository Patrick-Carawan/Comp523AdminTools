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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid className="commentSection" item xs={6}>
            <TextField
              id="standard-multiline-static"
              label="Comment for the team"
              multiline
              rows="4"
              defaultValue="Leave your comment"
            />
            <div className={classes.root}>
              {" "}
              <Button variant="contained" color="primary">
                Save comment
              </Button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <Title>Demo</Title>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value="demo fine"
                  control={<Radio color="primary" />}
                  label="demo fine"
                  labelPlacement="start"
                />{" "}
                <FormControlLabel
                  value="demo bad"
                  control={<Radio color="secondary" />}
                  label="absent unexcused"
                  labelPlacement="start"
                />{" "}
                <FormControlLabel
                  value="no demo"
                  control={<Radio color="default" />}
                  label="excused"
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
              >
                <FormControlLabel
                  value="demo fine"
                  control={<Radio color="primary" />}
                  label="finished"
                  labelPlacement="start"
                />{" "}
                <FormControlLabel
                  value="demo bad"
                  control={<Radio color="secondary" />}
                  label="unfinished"
                  labelPlacement="start"
                />{" "}
                <FormControlLabel
                  value="no demo"
                  control={<Radio color="default" />}
                  label="excused"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
          </Grid>{" "}
        </Grid>
      </Container>
    </div>
  );
}
