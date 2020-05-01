import React, {useEffect, useState} from "react";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "../Title";

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});


export default function Card(props) {
    const classes = useStyles();
    console.log(props.project.email);
    return (
        <React.Fragment>
            <Title>Your assigned project: </Title>


            <Typography component="p" variant="h4">
                {props.project.hasOwnProperty('title') ? props.project.title : "Pending"}
            </Typography>
                    <Typography>Email: {props.project.email}</Typography>
                    <Typography>More Info: <Link href={props.project.info_url}>{props.project.info_url}</Link></Typography>
                    <Typography>Description: {props.project.description}</Typography>
                    <Typography>Client: {props.project.prop_name}</Typography>
                    <Typography>Hardware: {props.project.hardware_requirements}</Typography>
                    <Typography>Software: {props.project.tech_requirements}</Typography>
        </React.Fragment>
    );
}
