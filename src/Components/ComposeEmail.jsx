import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {InputLabel} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";


const clientGroups = {
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    PENDING: 'pending'
};


const dummyClientEmails = ['dan97w@ad.unc.edu', 'daniel.weber.443@gmail.com'];
let dummyClientString = (() => {
    let concat = '';
    dummyClientEmails.forEach((email, index) => {
        concat += index < dummyClientEmails.length - 1 ? `${email},` : email;
    });
    return concat;
})();

function ComposeEmail(props) {

    function sendEmail(e) {
        e.preventDefault();
        console.log(clientGroup);
    }

    const [clientGroup, setClientGroup] = useState('');
    const [body, setBody] = useState('');
    const [subject, setSubject] = useState('');

    const handleChange = event => {
        setClientGroup(event.target.value);
    };

    function changeSubject(e) {
        setSubject(e.target.value);
    }

    function changeBody(e) {
        setBody(e.target.value);
    }


    return (
        <Container maxWidth="sm">
            <h1>Compose Email to Send to Clients</h1>
            <form onSubmit={sendEmail}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <span>1. Choose which group of clients you'd like to email</span>
                    <FormControl>
                        <InputLabel>Client Group</InputLabel>
                        <Select
                            style={{'maxWidth': '8em'}}
                            autoWidth={true}
                            value={clientGroup}
                            onChange={handleChange}
                        >
                            <MenuItem value={clientGroups.ACCEPTED}>Accepted</MenuItem>
                            <MenuItem value={clientGroups.REJECTED}>Rejected</MenuItem>
                            <MenuItem value={clientGroups.PENDING}>Pending</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <span>2. Subject</span>
                    <br/>
                    <TextField
                        id="outlined-basic"
                        label="Subject"
                        variant="outlined"
                        onChange={changeSubject}
                    />
                    <br/>
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <span>3. Message Body</span>
                    <br/>
                    <TextField
                        id="outlined-basic"
                        label="Body"
                        variant="outlined"
                        onChange={changeBody}
                    />
                    <br/>
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                        <a style={{
                            'padding': '10px',
                            'color': 'white',
                            'borderRadius': '5px',
                            'backgroundColor': '#003b9e'
                        }}
                           href={`mailto:${dummyClientString}?body=${body}&subject=${subject}`}>
                            Email Clients
                        </a>
                </Grid>
            </form>
        </Container>
    );
}

export default ComposeEmail;
