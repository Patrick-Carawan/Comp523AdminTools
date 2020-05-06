import React, {useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ClearIcon from '@material-ui/icons/HighlightOff';
import axios from 'axios';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

function AcceptedClientForm(props) {

    const [description, setDescription] = useState('');
    const [URL, setURL] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [idToProject, setIdToProject] = useState(new Map());
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {
        axios.get(`/proposals/accepted`).then(res => {
            let tempMap = new Map();
            res['data'].forEach(project =>{
                tempMap.set(project['_id'], project);
            });
            setIdToProject(tempMap);
            setAllProjects(res['data'].map(project => project['_id']));
            console.log(res['data'])
        });
    }, []);

    useEffect(()=>{
        idToProject.get(selectedProject) ?
        setDescription(idToProject.get(selectedProject)['description']): setDescription('')},[selectedProject]);

    function submitForm(e) {
        e.preventDefault();
        if (!(description && URL) || selectedProject === '') {
            alert('Please select a project and provide a PowerPoint link.')
        } else {
            axios.post(`/proposals/updatePowerPoint/${selectedProject}`,{
                powerpoint_url: URL,
                description: description
            }).then(()=> alert("Project Info Submitted")).catch(err => alert(err));
        }
    }

    function handleChange(e) {
        setSelectedProject(e.target.value);
    }

    return (
        <Container maxWidth="sm">
            <h1>UNC COMP 523 Project Information</h1>

            <Typography style={{'marginBottom': 0}}>
                1. Select Your Project
            </Typography>


            <form onSubmit={submitForm}>
                <FormControl style={{'marginTop': '0', 'marginBottom': '25px'}}>
                    <InputLabel>Project</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedProject}
                        onChange={handleChange} style={{'minWidth': '5em'}}>
                        >
                        {allProjects.length > 0 ? allProjects.map((project, index) =>
                                <MenuItem key={index} value={project}>{idToProject.get(project)['title']}</MenuItem>
                            )
                            : null
                        }
                    </Select>
                </FormControl>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    <span>2. Project description. This should be your pitch to the students. Feel free to update it if you wish.</span>
                    <br/>
                    <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        multiline
                        value={description}
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
                       3. Please add a link to a PowerPoint or Google Slides below.
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
                </Grid>
            </form>
        </Container>
    );
}

export default AcceptedClientForm;
