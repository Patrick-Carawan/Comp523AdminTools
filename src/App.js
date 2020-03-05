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
import {DndProvider} from "react-dnd";
import Example from './Components/ProjectRanking';
import Backend from 'react-dnd-html5-backend'
import RankContainer from "./Components/RankContainer";


function App() {


    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/clientForm" component={ClientForm} exact={true}/>
                <Route path="/login" component={Login} exact={true}/>
                <Route path="/dashboard" component={DashBoard} exact={true} />
                <Route path="/admin" component={ProposalsAdminView} exact={true}/>
                <Route path="/studentProps" component={ProposalsStudentView} exact={true}/>
                <Route path="/teams" component={TeamsGrid} exact={true}/>
                <Route path="/rank" component={RankContainer} exact={true}/>
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
    )
}

export default App;
