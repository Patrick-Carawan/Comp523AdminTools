import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const clientAppState = {
  WELCOME: "welcome",
  FORM: "form",
  SUBMITTED: "submitted"
};

function ClientForm(props) {
  const [appState, setAppState] = useState();
  switch (appState) {
    case clientAppState.WELCOME:
      return Welcome();
    case clientAppState.FORM:
      return Form();
    case clientAppState.SUBMITTED:
      return ThankYouScreen();
    case undefined:
      return Welcome();
  }

  function Welcome() {
    return (
      <Container>
        <div className="MiddleText">
          <Typography component="h1" variant="h2" align="center">
            Welcome, Client!
          </Typography>
          <br />
          <Typography component="h1" variant="h5">
            This is where we'll put all the information that Stotts wants the
            clients to know before they send in an application to work with 523
            students for this project. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur.
          </Typography>
          <br />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setAppState(clientAppState.FORM)}
          >
            Begin Application
          </Button>
        </div>
      </Container>
    );
  }

  function Form() {
    const submitForm = function(e) {
      e.preventDefault();
      console.log("submit form called");
      setAppState(clientAppState.SUBMITTED);
    };

    return (
      <Container maxWidth="sm">
        <h1>UNC COMP 523 Client Application</h1>
        <form onSubmit={submitForm}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <span>1. Your project name</span>
            <br />
            <TextField
              id="outlined-basic"
              label="Project Title"
              variant="outlined"
            />
            <br />
          </Grid>

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <span>2. First name</span>
            <br />
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
            />
            <br />
          </Grid>

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <span>3. Last name</span>
            <br />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
            />
            <br />
          </Grid>

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <span>4. Project description</span>
            <br />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
          </Grid>

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <br />
            <Typography variant="h6" gutterBottom>
              Please add a link to any supporting documents, such as PowerPoints
              or published papers below:
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <TextField id="outlined-basic" label="URL" variant="outlined" />
          </Grid>
          <br />

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <TextField
              id="outlined-basic"
              label="Hardware restrictions"
              variant="outlined"
            />
          </Grid>
          <br />

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <TextField
              id="outlined-basic"
              label="Software requirements"
              variant="outlined"
            />
          </Grid>
          <br />

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Button type="submit" variant="contained" color="primary">
              Submit Application
            </Button>
          </Grid>
        </form>
      </Container>
    );
  }

  function ThankYouScreen() {
    return (
      <div className="MiddleText">
        <Typography component="h1" variant="h3">
          Thanks for submitting your application to work with UNC COMP 523. Dr.
          Stotts will be in touch with you soon with more details.
        </Typography>
        <Link to="/">Go Home</Link>
      </div>
    );
  }
}

export default ClientForm;
