import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function Card() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Some Info</Title>
      <Typography component="p" variant="h4">
        Some Info
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 30 March, 2020
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Some Info
        </Link>
      </div>
    </React.Fragment>
  );
}
