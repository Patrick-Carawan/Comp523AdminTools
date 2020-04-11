import React from "react";
import ReactDOM from "react-dom";
import '../App.css'
import CSVReader from "react-csv-reader";
import {makeStyles} from "@material-ui/core/styles";
import DashBoard from "./DashBoard";
import Container from "@material-ui/core/Container";

const handleForce = (data) => console.log(data);


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    csvInput: {
        padding: '10px',
        display: 'block',
        margin: '15px auto',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    uploadContainer: {
        textAlign: 'center',
        padding: '15px',
        margin: '10px auto',
    }
}));

const parseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

function Roster() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DashBoard/>
            {console.log(window.innerHeight)}
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Container maxWidth="sm">
                    <div className={classes.uploadContainer}>
                    <p>Follow this example's formatting</p>
                    <img alt="Example CSV"  src={require("../Images/exampleCSV.PNG")}/>
                        <CSVReader
                            cssClass="react-csv-input"
                            label="Upload Roster CSV (comma delimited, NOT XSLX or XSL) here. "
                            onFileLoaded={handleForce}
                            parserOptions={parseOptions}
                        />
                    </div>
                </Container>
            </main>
        </div>
    );
}

export default Roster;

