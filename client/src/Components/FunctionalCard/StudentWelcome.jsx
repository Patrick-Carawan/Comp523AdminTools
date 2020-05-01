import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "../Title";
import Calendar from "./Calendar";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  fixedHeight: {
    height: 310,
  },
});

export default function Card(props) {
  const classes = useStyles();
  const das = 123;

  return (
    <React.Fragment>
      <Title> {props.teamName}</Title>
      <Typography component="p" variant="h4" className={classes.depositContext}>
        Welcome, {props.name}
      </Typography>
      {/* <Typography color="textSecondary" className={classes.depositContext}>
        30 March, 2020
      </Typography> */}
      <Calendar />
    </React.Fragment>
  );
}
