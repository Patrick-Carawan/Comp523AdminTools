import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: 'white'
    },
    link: {
        margin: 'auto',
        color: 'primary',
        textDecoration: 'none'
    }
}));

export default function Login(props) {
    window.localStorage.setItem("adminUser", "false");
    window.localStorage.setItem("studentUser", "false");

    const [onyen, setOnyen] = useState('');
    const [password, setPassword] = useState('');

    const classes = useStyles();

    function submit(e) {
        e.preventDefault();
        console.log('submitted');
        axios.post(`http://localhost:5000/users/login`, {
            user: {
                onyen: onyen,
                password: password
            }
        }).then(res => {
            console.log(res);
            window.localStorage.setItem('token', res.data.user.token);
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
            // history.push('/studentDash')
        }).catch(err => {
            console.log(err);
            alert('Username or password is invalid');
        });
    }

    let history = useHistory();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form method="post" className={classes.form} noValidate onSubmit={submit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="onyen"
                        label="Onyen"
                        name="onyen"
                        autoFocus
                        onChange={(e) => setOnyen(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={() => {
                            window.localStorage.setItem("studentUser", "true");
                            history.push("/studentDash");
                        }}
                    >
                        Grant student access
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={() => {
                            window.localStorage.setItem("adminUser", "true");
                            history.push("/dashboard")
                        }}
                    >
                        Grant admin access
                    </Button>
                </form>
                <Link to="/createAccount" className={classes.link}>Create Account</Link>
            </div>
        </Container>
    );
}
