import React, {useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

const clientAppState = {
    WELCOME: 'welcome',
    FORM: 'form',
    SUBMITTED: 'submitted'
}


function ClientForm(props) {
    const [appState, setAppState] = useState();
    switch (appState) {
        case clientAppState.WELCOME:
            return Welcome();
        case clientAppState.FORM:
            return Form();
        case clientAppState.SUBMITTED:
            return ThankYouScreen();
        case undefined:
            return Welcome();

    }

    function Welcome() {
        return (
            <div className="MiddleText">
                <Typography component="h1" variant="h2" align="center">
                    Welcome, Client!
                </Typography>
                <Typography component="h1" variant="h5">
                    This is where we'll put all the information that Stotts wants the clients to know before they send
                    in an
                    application to work with 523 students for this project. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud
                    exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do
                    eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco
                    laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu
                    fugiat nulla pariatur.
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => setAppState(clientAppState.FORM)}
                >
                    Begin Application
                </Button>
            </div>
        );
    }


    function Form() {
        const submitForm = function (e) {
            e.preventDefault();
            console.log('submit form called');
            setAppState(clientAppState.SUBMITTED);
        };

        return (
            <form onSubmit={submitForm}>
                <List>
                    <ListItem>
                        <TextField id="outlined-basic" label="Project Title" variant="outlined"/>
                    </ListItem>
                    <ListItem>

                        <TextField id="outlined-basic" label="First Name" variant="outlined"/>
                    </ListItem>
                    <ListItem>

                        <TextField id="outlined-basic" label="Last Name" variant="outlined"/>
                    </ListItem>
                    <ListItem>

                        <TextField id="outlined-basic" label="Description" variant="outlined"/>
                    </ListItem>
                    <Typography variant="h5" gutterBottom>
                        Please add a link to any supporting documents, such as PowerPoints or published papers, below:
                    </Typography>
                    <TextField id="outlined-basic" label="URL" variant="outlined"/>
                    <TextField id="outlined-basic" label="Hardware restrictions" variant="outlined"/>
                    <TextField id="outlined-basic" label="Software requirements" variant="outlined"/>
                </List>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Submit Application
                </Button>
            </form>
        );
    }

    function ThankYouScreen() {
        return (
            <div className="MiddleText">
                <Typography component="h1" variant="h3" >
                    Thanks for submitting your application to work with UNC COMP 523. Dr. Stotts will be in touch with
                    you
                    soon
                    with more details.
                </Typography>
            </div>
        )
    }
}

export default ClientForm;
