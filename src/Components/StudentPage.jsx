import React, {useEffect, useState} from 'react';
import {Redirect} from "react-router-dom";
import Login from "./Login";

const state = {
    NEW: 'new',
    HAS_TEAM: 'hasTeam',
    HAS_PROJECT: 'hasProject'
};

function StudentPage(props) {
    const [studentState, setStudentState] = useState();
    useEffect(() => {
        //hit backend to get the student's status
        setStudentState(state.HAS_PROJECT)
    }, []);

    const renderSwitch = function () {
        switch (studentState) {
            case state.NEW:
                console.log('should redirect to teamSelection');
                return <Redirect to="/teamSelection"/>;
            case state.HAS_TEAM:
                return <Redirect to="/rank"/>;
            default:
                return <Login/>
        }
    };

    return (
        <div>
            {renderSwitch()}
        </div>
    );
}

export default StudentPage;
