import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Switch from "react-router-dom/es/Switch";
import ClientForm from "./Components/ClientForm";
import Home from "./Components/Home";

function App() {


    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/ClientForm" component={ClientForm} exact={true}/>
            </Switch>

        </BrowserRouter>
    )
}

export default App;
