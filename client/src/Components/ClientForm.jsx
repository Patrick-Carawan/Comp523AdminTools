import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ClearIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Axios from "axios";

const clientAppState = {
  WELCOME: "welcome",
  FORM: "form",
  SUBMITTED: "submitted",
};

function ClientForm(props) {
  const [appState, setAppState] = useState();
  const [projectTitle, setProjectTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [URL, setURL] = useState("");
  const [softwareReq, setSoftwareReq] = useState("");
  const [hardwareReq, setHardwareReq] = useState("");
  const [showError, setShowError] = useState(false);
  const [instructions, setInstructions] = useState('');

  //gets the message to display to the client
  useEffect(()=>{
    Axios.get("/proposals/clientForm").then(res => {
      setInstructions(res['data'][0]['text']);
      console.log(res)
    }).catch(err => console.log(err));
  },[]);

  switch (appState) {
    case clientAppState.WELCOME:
      return Welcome();
    case clientAppState.FORM:
      return Form();
    case clientAppState.SUBMITTED:
      return ThankYouScreen();
    default:
      return Welcome();
  }



  function Welcome() {
    return (
      <Container>
        <Grid>
          <Box className="MiddleText">
            <Typography component="h1" variant="h2" align="center">
              Welcome, Client!
            </Typography>
            <br />
            <Typography component="h1" variant="h5">
              {instructions}
            </Typography>
            <br />
            <br />
            <Box justifyContent="center">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => setAppState(clientAppState.FORM)}
              >
                Begin Application
              </Button>
            </Box>
          </Box>
        </Grid>
      </Container>
    );
  }

  function Form() {

    //posts proposal to backend
    const submitForm = function (e) {
      e.preventDefault();
      if (firstName && lastName && projectTitle && description && email) {
        // console.log("submit form called");

        Axios.post("/proposals", {
          title: projectTitle,
          email: email,
          prop_name: `${firstName} ${lastName}`,
          description: description,
          info_url: URL,
          tech_requirements: softwareReq,
          hardware_requirements: hardwareReq,
        });
        setAppState(clientAppState.SUBMITTED);
        setShowError(false);
      } else {
        setShowError(true);
      }
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
              onChange={(e) => setProjectTitle(e.target.value)}
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
              onChange={(e) => setFirstName(e.target.value)}
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
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
          </Grid>

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <span>4. Email</span>
            <br />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
          </Grid>

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <span>5. Project description</span>
            <br />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <br />
            <Typography variant="subtitle1" gutterBottom>
              Please add a link (or a comma separated list of links) to any supporting documents, such as PowerPoints
              or published papers below.
            </Typography>
              <Typography>
            (Upload your files to Google drive and use a shareable link if your documents aren't hosted anywhere)
              </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <TextField
              id="outlined-basic"
              label="URL(s)"
              variant="outlined"
              onChange={(e) => setURL(e.target.value)}
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
              label="Hardware restrictions"
              variant="outlined"
              onChange={(e) => setHardwareReq(e.target.value)}
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
              onChange={(e) => setSoftwareReq(e.target.value)}
            />
          </Grid>
          <br />

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid container direction="row">
              <Grid item>
                <Button type="submit" variant="contained" color="secondary">
                  Submit Application
                </Button>
              </Grid>
              <Grid item>
                {showError ? (
                  <Button
                    style={{ color: "red", marginLeft: ".5em" }}
                    variant="outlined"
                    onClick={() => setShowError(false)}
                  >
                    <ClearIcon style={{ marginRight: "8px" }} />
                    Please fill out the first 5 fields
                  </Button>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }

  function ThankYouScreen() {
    return (
      <Box className="MiddleText">
        <Typography component="h1" variant="h3">
          Thanks for submitting your application to work with UNC COMP 523. Dr.
          Stotts will be in touch with you soon with more details.
        </Typography>
      </Box>
    );
  }
}

export default ClientForm;
