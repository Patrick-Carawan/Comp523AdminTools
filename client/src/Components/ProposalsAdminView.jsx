import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Proposal from "./Proposal";
import { makeStyles } from "@material-ui/core/styles";
import DashBoard from "./AdminDashboard";
import Box from "@material-ui/core/Box";
import axios from "axios";
import {createMuiTheme, ExpansionPanel, ExpansionPanelDetails, withStyles} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import {green, red} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
  },
  proposal: {
    marginTop: "5px",
  },
  acceptButton: {
    margin: "0px 5px",
    color: "white",
  },
  rejectButton: {
    margin: "0px 5px",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  acceptedBackground: {
    backgroundColor: "rgba(17,255,113,0.21)",
  },
  rejectedBackground: {
    backgroundColor: "rgba(255,58,82,0.35)",
  },
  pendingBackground: {
    backgroundColor: "rgba(183,183,175,0.34)",
  },
  completedBackground: {
    backgroundColor: "rgba(112,197,255,0.69)",
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});
const RedButton = withStyles({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
})(Button);


const GreenButton = withStyles({
  root: {
    color: '#ffffff',
    backgroundColor: green[400],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
})(Button);



function ProposalsAdminView(props) {
  const classes = useStyles();
  const [allProposals, setAllProposals] = useState([]);
  const [semester, setSemester] = useState(window.localStorage.getItem('semester'));
  useEffect(() => {
    axios
      .get(`/proposals/pendingOrCurrent/${semester}`, {
        headers: {
          Authorization: `Token ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        const proposals = response["data"];
        setAllProposals(response['data'])
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const changeStatus = function (proposal, newStatus, index) {
    // post to backend, wrap everything else in .then()
    axios
      .post(
        `/proposals/update/${proposal._id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Token ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        let tempProps = [...allProposals];
        tempProps[index].status=newStatus;
        setAllProposals(tempProps);
      })
      .catch((err) => alert(err));
  };

  const proposalGroup = function (label, className) {
    return (
      <>
        <Grid item style={{ marginBottom: "5px" }}>
          <ExpansionPanel className={className}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography className={classes.heading}>
                {label} Proposals
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container direction="column">
                {allProposals.map((prop, i) => (
                    prop.status===label ?
                  <Card variant="outlined" key={i} className={classes.proposal}>
                    <CardContent>
                      <Grid
                        container
                        direction="column"
                        justify="space-between"
                      >
                        <Grid item>
                          <Proposal
                            title={prop.title}
                            prop_name={prop.prop_name}
                            url={prop.info_url}
                            description={prop.description}
                            hardwareReq={prop.hardware_requirements}
                            softwareReq={prop.tech_requirements}
                          />
                        </Grid>
                        <Box mx="auto">
                          <Grid item>
                            <GreenButton
                              variant="contained"
                              color="primary"
                              className={classes.acceptButton}
                              onClick={() =>
                                changeStatus(prop, "Accepted", i)
                              }
                            >
                              Accept
                            </GreenButton>
                            <Button
                              variant="contained"
                              className={classes.pendingButton}
                              onClick={() =>
                                  changeStatus(prop, "Pending", i)
                              }
                            >
                              Leave Pending
                            </Button>
                            <RedButton
                              variant="contained"
                              style={{'marginLeft':'5px'}}
                              // color="danger"
                              // className={classes.rejectButton}
                              onClick={() =>
                                changeStatus(prop, "Rejected", i)
                              }
                            >
                              Reject
                            </RedButton>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.rejectButton}
                              onClick={() =>
                                  changeStatus(prop, "Completed", i)
                              }
                          >
                            Completed
                          </Button>
                          </Grid>
                        </Box>
                      </Grid>
                    </CardContent>
                  </Card> : null
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <DashBoard updateSemester={(sem) => setSemester(sem)} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container direction="column">
          {proposalGroup("New")}
          {proposalGroup(
            "Accepted",
            classes.acceptedBackground
          )}
          {proposalGroup(
            "Rejected",
            classes.rejectedBackground
          )}
          {proposalGroup(
            "Pending",
            classes.pendingBackground
          )}
          {proposalGroup(
              "Completed", classes.completedBackground
          )}
        </Grid>
      </main>
    </div>
  );
}

export default ProposalsAdminView;
