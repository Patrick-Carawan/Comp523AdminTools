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
    height: 320,
  },
});

export default function Card() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Welcome Panel</Title>
      <Typography component="p" variant="h4">
        Welcome {window.localStorage.getItem('name')}
      </Typography>
      {/*<Typography color="textSecondary" className={classes.depositContext}>*/}
      {/*  on 30 March, 2020*/}
      {/*</Typography>*/}
      <Calendar />
    </React.Fragment>
  );
}
