import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { InputLabel } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import DashBoard from "./AdminDashboard";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Axios from "axios";

const clientGroups = {
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  PENDING: "Pending",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function ComposeEmail(props) {
  const classes = useStyles();
  const [pendingLetter, setPendingLetter] = useState("");
  const [acceptanceLetter, setAcceptanceLetter] = useState("");
  const [rejectionLetter, setRejectionLetter] = useState("");
  const [acceptedEmails, setAcceptedEmails] = useState([]);
  const [pendingEmails, setPendingEmails] = useState([]);
  const [rejectedEmails, setRejectedEmails] = useState([]);
  const [semester, setSemester] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/proposals/emails", {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("emails", response.data);
        let tempAcc = [];
        let tempPend = [];
        let tempRej = [];
        response.data.forEach((obj) => {
          if (obj.status.toLowerCase() === "accepted") {
            tempAcc.push(obj.email);
          } else if (obj.status.toLowerCase() === "pending") {
            tempPend.push(obj.email);
          } else if (obj.status.toLowerCase() === "rejected") {
            tempRej.push(obj.email);
          }
        });
        setAcceptedEmails(tempAcc);
        setPendingEmails(tempPend);
        setRejectedEmails(tempRej);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/proposals/pendingLetter", {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        response.data[0]
          ? setPendingLetter(response.data[0]["text"])
          : setPendingLetter("Your project proposal is still pending.");
      })
      .catch(function (error) {
        console.log(error);
        setPendingLetter("Your project proposal is still pending.");
      });
    axios
      .get("http://localhost:5000/proposals/rejectionLetter", {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        response.data[0]
          ? setRejectionLetter(response.data[0]["text"])
          : setRejectionLetter("Your project proposal has been rejected.");
      })
      .catch(function (error) {
        console.log(error);
        setRejectionLetter("Your project proposal has been rejected.");
      });
    axios
      .get("http://localhost:5000/proposals/acceptanceLetter", {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        response.data[0]
          ? setAcceptanceLetter(response.data[0]["text"])
          : setAcceptanceLetter("Your project proposal has been accepted.");
      })
      .catch(function (error) {
        console.log(error);
        setAcceptanceLetter("Your project proposal has been accepted.");
      });
  }, []);

  function sendEmail(e) {
    e.preventDefault();
    console.log(clientGroup);
  }

  const [clientGroup, setClientGroup] = useState("");
  const [subject, setSubject] = useState("");
  const [letter, setLetter] = useState("");

  const handleChange = (event) => {
    setClientGroup(event.target.value);
  };

  const arrToStringList = function () {
    let arr;
    switch (clientGroup) {
      case clientGroups.ACCEPTED:
        arr = acceptedEmails;
        break;
      case clientGroups.REJECTED:
        arr = rejectedEmails;
        break;
      case clientGroups.PENDING:
        arr = pendingEmails;
        break;
      default:
        arr = [];
    }
    let concat = "";
    arr.forEach((email, index) => {
      concat += index < arr.length - 1 ? `${email},` : email;
    });
    return concat;
  };

  useEffect(() => {
    switch (clientGroup) {
      case clientGroups.ACCEPTED:
        setLetter(acceptanceLetter);
        break;
      case clientGroups.PENDING:
        setLetter(pendingLetter);
        break;
      case clientGroups.REJECTED:
        setLetter(rejectionLetter);
        break;
      default:
        setLetter("");
    }
    //Also update the string for the list of clients to send to here.
    // currently being sent to dummyClientString
  }, [clientGroup]);

  function changeSubject(e) {
    setSubject(e.target.value);
  }

  function changeBody(e) {
    setLetter(e.target.value);
    console.log(e.target.value);
  }

  function setMessage() {
    let path = "";

    switch (clientGroup) {
      case clientGroups.ACCEPTED:
        path = "acceptance";
        break;
      case clientGroups.PENDING:
        path = "pending";
        break;
      case clientGroups.REJECTED:
        path = "rejection";
        break;
      default:
    }

    Axios.post(
      `http://localhost:5000/proposals/${path}Letter`,
      { text: letter },
      {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      }
    );
  }

  return (
    <div className={classes.root}>
      <DashBoard updateSemester={(sem) => setSemester(sem)} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="sm">
          <h1>Compose Email to Send to Clients</h1>
          <form onSubmit={sendEmail}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
            >
              <span>1. Choose which group of clients you'd like to email</span>
              <FormControl>
                <InputLabel>Client Group</InputLabel>
                <Select
                  style={{ maxWidth: "8em" }}
                  autoWidth={true}
                  value={clientGroup}
                  onChange={handleChange}
                >
                  <MenuItem value={clientGroups.ACCEPTED}>Accepted</MenuItem>
                  <MenuItem value={clientGroups.REJECTED}>Rejected</MenuItem>
                  <MenuItem value={clientGroups.PENDING}>Pending</MenuItem>
                </Select>
              </FormControl>
              <br />
            </Grid>

            <Button
              title="Save the current message body to be the default message for this client group"
              variant="contained"
              color="secondary"
              onClick={() => setMessage()}
            >
              Save Message Body
            </Button>

            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
            >
              <span>2. Subject</span>
              <br />
              <TextField
                id="outlined-basic"
                label="Subject"
                variant="outlined"
                onChange={changeSubject}
              />
              <br />
            </Grid>

            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
            >
              <span>3. Message Body</span>
              <br />
              <TextField
                id="outlined-basic"
                label="Body"
                variant="outlined"
                onChange={changeBody}
                value={letter}
              />
              <br />
            </Grid>

            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              <a
                style={{
                  padding: "10px",
                  color: "white",
                  borderRadius: "5px",
                  backgroundColor: "#003b9e",
                  //   text-decoration: "none",
                }}
                href={`mailto:${arrToStringList()}?body=${letter}&subject=${subject}`}
              >
                Email Clients
              </a>
            </Grid>
          </form>
        </Container>
      </main>
    </div>
  );
}

export default ComposeEmail;
