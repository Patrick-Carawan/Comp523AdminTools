import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ClientForm from "./Components/ClientForm";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ProposalsAdminView from "./Components/ProposalsAdminView";
import DashBoard from "./Components/AdminDashboard";
import StudentSetupPage from "./Components/StudentSetupPage";
import TeammateSelectionRules from "./Components/TeammateSelectionRules";
import StudentTeamSelection from "./Components/StudentTeamSelection";
import RankContainer from "./Components/RankContainer";
import AdminTeamSelection from "./Components/AdminTeamSelection";
import { createMuiTheme } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";
import AcceptedClientForm from "./Components/AcceptedClientForm";
import ComposeEmail from "./Components/ComposeEmail";
import CreateAccount from "./Components/CreateAccount";
import DashBoardContent from "./Components/DashBoardContent";
import Meeting from "./Components/Meeting";
import AdminFinalReports from "./Components/AdminFinalReports";
import { AdminProtectedRoute, StudentProtectedRoute } from "./protected.route";
import ProposalAssignment from "./Components/ProposalAssignment";
import CssBaseline from "@material-ui/core/CssBaseline";
import Roster from "./Components/Roster";
import StudentDashboard from "./Components/StudentDashboard";
import StudentDashboardContent from "./Components/StudentDashboardContent";
import StudentFinalReport from "./Components/StudentFinalReport";
import TeamFinalReport from "./Components/TeamFinalReport";
import Verify from "./Components/Verify";
import PasswordReset from "./Components/PasswordReset";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#78b5e8", contrastText: "#ffffff" },
    secondary: { main: "#0a0960", contrastText: "#ffffff" },
    danger: { main: "rgba(255,24,34,0.96)", contrastText: "#ffffff" },
  },
});

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/verify/" component={Verify} exact={false} />
            <Route
              path="/passwordReset"
              component={PasswordReset}
              exact={false}
            />
            <Route path="/clientForm" component={ClientForm} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route
              path="/createAccount"
              component={CreateAccount}
              exact={true}
            />
            <Route path="/meeting" component={Meeting} exact={true} />
            <AdminProtectedRoute
              path="/dashboard"
              component={DashBoardContent}
              exact={true}
            />
            <AdminProtectedRoute
              path="/proposalsAdmin"
              component={ProposalsAdminView}
              exact={true}
            />
            <StudentProtectedRoute
              path="/studentDash"
              component={StudentDashboardContent}
              exact={true}
            />
            <StudentProtectedRoute
              path="/studentDash"
              component={StudentDashboard}
              exact={true}
            />
            <StudentProtectedRoute
              path="/formTeams"
              component={StudentTeamSelection}
              exact={true}
            />
            <StudentProtectedRoute
              path="/rank"
              component={RankContainer}
              exact={true}
            />
            <StudentProtectedRoute
              path="/individualReport"
              component={StudentFinalReport}
              exact={true}
            />
            <StudentProtectedRoute
              path="/teamReport"
              component={TeamFinalReport}
              exact={true}
            />
            <AdminProtectedRoute
              path="/composeEmail"
              component={ComposeEmail}
              exact={true}
            />
            <AdminProtectedRoute
              path="/teamSelection"
              component={AdminTeamSelection}
              exact={true}
            />
            <AdminProtectedRoute
              path="/viewFinalReports"
              component={AdminFinalReports}
              exact={true}
            />
            <Route
              path="/acceptedClientForm"
              component={AcceptedClientForm}
              exact={true}
            />
            <StudentProtectedRoute
              path="/studentSetupPage"
              component={StudentSetupPage}
              exact={true}
            />
            <AdminProtectedRoute
              path="/teammateSelectionRules"
              component={TeammateSelectionRules}
              exact={true}
            />
            <AdminProtectedRoute
              path="/proposalAssignment"
              component={ProposalAssignment}
              exact={true}
            />
            <AdminProtectedRoute
              path="/roster"
              component={Roster}
              exact={true}
            />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default App;
