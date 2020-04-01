import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export default function Title(props) {
  return (
    <AppBar
      style={{ color: "white" }}
      position="fixed"
      className={classes.appBar}
    >
      <Toolbar>
        <Typography component="h1" variant="h6" noWrap>
          COMP 523 Admin Tools
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

Title.propTypes = {
  children: PropTypes.node
};
