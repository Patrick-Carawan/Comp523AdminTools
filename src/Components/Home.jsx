import React, {useState} from "react";
import Login from "./Login";
import {Redirect} from "react-router-dom";
import StudentPage from "./StudentPage";

const status = {
    OUT: 'out',
    STUDENT: 'student',
    ADMIN: 'admin'
};



function Home(props) {
    const [userStatus, setUserStatus] = useState();

    const getUserStatus = function(statusInput){
        statusInput === status.STUDENT ? setUserStatus(status.STUDENT) : setUserStatus(status.ADMIN);
    };

    const renderSwitch = function(){
        switch (userStatus) {
            case status.OUT:
                return <Login getUserStatus={getUserStatus}/>;
            case status.STUDENT:
                console.log('going to student page')
                return <StudentPage/>;
            case status.ADMIN:
                return <Redirect to="/dashboard"/>;
            default:
                return <Login getUserStatus={getUserStatus}/>
        }
    };

    return (
        <div className="App">
            { renderSwitch()}
        </div>
    );
}

export default Home;
