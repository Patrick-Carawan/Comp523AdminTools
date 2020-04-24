import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios'
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

function PasswordReset(props) {
    const [password, setPassword] = useState('');
    let history = useHistory();
    let url = window.location.href;
    let onyenAndToken = url.replace(new RegExp('.*/passwordReset/'), '');
    onyenAndToken = onyenAndToken.split('/');
    console.log(onyenAndToken);
    window.localStorage.setItem('token', onyenAndToken[1]);


    function submitNewPassword() {
        axios.post(`http://localhost:5000/users/reset`, {onyen: onyenAndToken[0], password: password}, {
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
    }

    return (
        <div>
            <Card>
                <Typography>Please enter your new password</Typography>
                <TextField label="New Password"
                           onChange={(e) => setPassword(e.target.value)}
                           value={password}
                type="password">

                </TextField>
                <Button onClick={submitNewPassword} variant="contained">
                    Submit New Password
                </Button>
            </Card>
        </div>
    );
}

export default PasswordReset;
