import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import {Redirect, useHistory} from "react-router-dom";


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
    name: {
        width: '46%'
    }
}));

export default function CreateAccount() {
    const classes = useStyles();
    const [onyen, setOnyen] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [adminToken, setAdminToken] = useState('');
    const [adminEmail, setAdminEmail] = useState('');

    let history = useHistory();

    function toLogin() {
        console.log('toLogin called')
        return (<Redirect to="/login"/>);
    }

    //posts to backend, creates user, sends verification email
    function submit(e) {
        e.preventDefault();
        console.log('onyen', onyen);
        console.log('password', password);
        console.log('firstname', firstName);
        console.log('lastname ', lastName);
        let data = adminEmail === '' ? {
            "user": {
                onyen: onyen,
                password: password,
                firstName: firstName,
                lastName: lastName,
                adminToken: adminToken
            }
        } :  {
            "user": {
                onyen: onyen,
                password: password,
                firstName: firstName,
                lastName: lastName,
                adminToken: adminToken,
                email: adminEmail
            }
        }
        if (password !== confirmPassword) {
            alert('Passwords must match')
        } else {
            axios.post(`/users`, data).then(res => {
                console.log(res);
                alert('Account Created. Please check your school email to verify account and log in.')
                setOnyen('');
                setFirstName('');
                setLastName('');
                setPassword('');
                setConfirmPassword('');
                setAdminToken('');
                setAdminEmail('');
            }).catch(err => {
                if (err.response.status === 406) {
                    alert(err.response.data)
                } else {
                    alert('Could not create user. Make sure this is the correct onyen. See your teacher for help if needed.')
                    console.log('err', err)
                }
            })
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Account
                </Typography>
                <form method="post" className={classes.form} onSubmit={submit}>
                    <Grid container direction="row" justify="space-between">
                        <Grid item className={classes.name}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={firstName}
                                label="First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item
                              className={classes.name}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                value={lastName}
                                fullWidth
                                label="Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>

                    </Grid>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={onyen}
                        label="Onyen"
                        onChange={(e) => setOnyen(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={password}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        value={confirmPassword}
                        fullWidth
                        name="password"
                        label="Confirm Password"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Typography>If you are an administrator, enter the admin key below.</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        value={adminToken}
                        label="Admin Key"
                        type="password"
                        onChange={(e) => setAdminToken(e.target.value)}
                    />
                    <Typography>If you are an administrator and your email does not end with @live.unc.edu, please enter your email here.</Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={adminEmail}
                        label="Admin Email"
                        onChange={(e) => setAdminEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create Account and Log In
                    </Button>
                </form>
            </div>
        </Container>
    );
}
