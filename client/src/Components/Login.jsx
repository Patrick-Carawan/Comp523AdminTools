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
import Grid from "@material-ui/core/Grid";

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
        textDecoration: 'none'
    },
    resetLink: {
        cursor: 'pointer',
    }
}));

export default function Login(props) {
    let history = useHistory();
    window.localStorage.setItem("adminUser", "false");
    window.localStorage.setItem("studentUser", "false");
    // console.log(window.localStorage.getItem('token'));

    const [onyen, setOnyen] = useState('');
    const [password, setPassword] = useState('');

    const classes = useStyles();

    function submit(e) {
        e.preventDefault();
        console.log('submitted');
        axios.post(`/users/login`, {
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


    function sendPasswordResetEmail() {
        if (onyen === '') {
            alert('Please fill in your onyen');
        }
        axios.post(`/users/emailPasswordReset`, {
            onyen: onyen
        }).then(() => alert('Please check your school email to finish resetting your password.')).catch(err => alert('err'));
    }

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
                        label="Onyen (not email)"
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
                    <Grid container
                          direction="row"
                          justify="space-around"
                          alignItems="center">
                        <Grid item>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </Grid>
                        <Grid item>
                            <Link to="/createAccount" className={classes.link}><Typography color="primary">Create
                                Account</Typography></Link>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.resetLink} onClick={sendPasswordResetEmail} color="secondary">Reset
                                Password</Typography>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
