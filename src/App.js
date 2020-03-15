import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ClientForm from "./Components/ClientForm";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ProposalsAdminView from "./Components/ProposalsAdminView";
import ProposalsStudentView from "./Components/ProposalsStudentView";
import TeamsGrid from "./Components/TeamsGrid";
import DashBoard from "./Components/DashBoard";
import StudentSetupPage from "./Components/StudentSetupPage";
import TeammateSelectionRules from "./Components/TeammateSelectionRules";
import TeamPreferences from "./Components/TeamPreferences";
import RankContainer from "./Components/RankContainer";
import TeamSelection from "./Components/TeamSelection";
import {createMuiTheme} from "@material-ui/core/styles";
import {MuiThemeProvider} from "@material-ui/core";
import AcceptedClientForm from "./Components/AcceptedClientForm";
import ComposeEmail from "./Components/ComposeEmail";

const theme = createMuiTheme({
    palette:{
        primary: {main: '#53c5e8'},
        secondary:{main: '#0a0960'},
        danger: {main: 'rgba(255,24,34,0.96)'}
    }
});
function App() {


    return (
        <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/clientForm" component={ClientForm} exact={true}/>
                <Route path="/login" component={Login} exact={true}/>
                <Route path="/dashboard" component={DashBoard} exact={true} />
                <Route path="/proposalsAdmin" component={ProposalsAdminView} exact={true}/>
                <Route path="/studentProps" component={ProposalsStudentView} exact={true}/>
                <Route path="/teams" component={TeamsGrid} exact={true}/>
                <Route path="/rank" component={RankContainer} exact={true}/>
                <Route path="/composeEmail" component={ComposeEmail} exact={true}/>
                <Route path="/teamSelection" component={TeamSelection} exact={true}/>
                <Route path="/acceptedClientForm" component={AcceptedClientForm} exact={true}/>
                <Route
                path="/studentSetupPage"
                component={StudentSetupPage}
                exact={true}
            />
                <Route
                    path="/teammateSelectionRules"
                    component={TeammateSelectionRules}
                    exact={true}
                />
                <Route
                    path="/teamPreferences"
                    component={TeamPreferences}
                    exact={true}
                />
            </Switch>

        </BrowserRouter>
        </MuiThemeProvider>
    )
}

export default App;
