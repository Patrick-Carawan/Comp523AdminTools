import React from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios'

function Verify(props) {
    let history = useHistory();
    let url = window.location.href;
    let onyenAndToken = url.replace(new RegExp('.*/verify/'), '');
    onyenAndToken = onyenAndToken.split('/');
    // console.log(onyenAndToken);
    window.localStorage.setItem('token', onyenAndToken[1]);
    axios.post(`/users/verifyUser`, {onyen: onyenAndToken[0]}, {
        headers: {
            Authorization: `Token ${onyenAndToken[1]}`
        }
    }).then(res => {
        window.localStorage.setItem('onyen', res.data.onyen);
        window.localStorage.setItem('name', res.data.name);
        if (res.data.admin) {
            window.localStorage.setItem("adminUser", "true");
            history.push("/dashboard");
        } else {
            window.localStorage.setItem("teamId", res.data.teamId);
            window.localStorage.setItem("studentUser", "true");
            history.push("/studentDash");
        }
    });
    return (
        null
    );
}

export default Verify;
