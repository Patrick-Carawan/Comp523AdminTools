import React, {useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ClearIcon from '@material-ui/icons/HighlightOff';

function AcceptedClientForm(props) {

    const [projectTitle, setProjectTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');
    const [URL, setURL] = useState('');
    const [showError, setShowError] = useState(false);

    function submitForm(e) {
        e.preventDefault();
        if (! (projectTitle && firstName && lastName && description && URL)) {
            setShowError(true);
        } else {
            setShowError(false);
            console.log('submitted');
        }
    }

    return (
        <Container maxWidth="sm">
            <h1>UNC COMP 523 Project Information</h1>
            <form onSubmit={submitForm}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <span>1. Your project name</span>
                    <br/>
                    <TextField
                        id="outlined-basic"
                        label="Project Title"
                        variant="outlined"
                        onChange={(e) => setProjectTitle(e.target.value)}
                    />
                    <br/>
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <span>2. First name</span>
                    <br/>
                    <TextField
                        id="outlined-basic"
                        label="First Name"
                        variant="outlined"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <br/>
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <span>3. Last name</span>
                    <br/>
                    <TextField
                        id="outlined-basic"
                        label="Last Name"
                        variant="outlined"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <br/>
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <span>4. Project description. This should be your pitch to the students.</span>
                    <br/>
                    <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <br/>

                </Grid>

                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <span>
                       5. Please add a link to a PowerPoint or Google Slides below.
                    </span>
                    <span style={{'fontSize': '14px', 'marginBottom': '5px'}}>
                        You can easily upload a PowerPoint to Google Drive and get a shareable link from there.
                    </span>
                    <TextField id="outlined-basic" label="URL" variant="outlined"
                               onChange={(e) => setURL(e.target.value)}
                    />
                </Grid>
                <br/>

                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Button type="submit" variant="contained" color="secondary">
                        Submit Project Info
                    </Button>
                    {
                        showError ?
                            <Button style={{'color': 'red', 'marginTop': '3em'}} variant="outlined"
                                    onClick={() => setShowError(false)}>
                            <ClearIcon style={{'marginRight':'8px'}}/>    Please fill out all fields
                            </Button>
                            : null}
                </Grid>
            </form>
        </Container>
    );
}

export default AcceptedClientForm;
