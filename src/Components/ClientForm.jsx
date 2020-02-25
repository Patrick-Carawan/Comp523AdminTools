import React from 'react';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function ClientForm(props) {
    return (
        <form>
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
        </form>
    );
}

export default ClientForm;
