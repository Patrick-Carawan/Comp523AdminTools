import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Switch ,Route} from 'react-router-dom';
import ClientForm from "./Components/ClientForm";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ProposalsAdminView from "./Components/ProposalsAdminView";

function App() {


    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/clientForm" component={ClientForm} exact={true}/>
                <Route path="/login" component={Login} exact={true}/>
                <Route path="/admin" component={ProposalsAdminView} exact={true}/>
            </Switch>

        </BrowserRouter>
    )
}

export default App;
