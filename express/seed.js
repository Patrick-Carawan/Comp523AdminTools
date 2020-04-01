var Team = require("./models/team.model");
var User = require("./models/user.model");
var Letter = require("./models/letter.model");
var Proposal = require("./models/proposal.model");
var Report = require("./models/report.model");

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection established.");
    
    const adminUser = new User({
        onyen:"stotts",
        firstName: "David",
        lastName: "Stotts",
        phone: "We don't know him like that",
        email: "stotts@cs.unc.edu",
        semester: "Spring2020",
        teamId: "ADMIN",
        admin: true
    });

    const user1 = new User({
        onyen: "pat1",
        firstName: "Patrick",
        lastName: "Carawan",
        phone: "919-441-6244",
        email: "pat1@live.unc.edu",
        semester: "Spring2020"
    });
    
    const user2 = new User({
        onyen: "dan97w",
        firstName: "Daniel",
        lastName: "Weber",
        phone: "336-831-6140",
        email: "dan97w@live.unc.edu",
        semester: "Spring2020"
    });
    
    const user3 = new User({
        onyen: "zionwu",
        firstName: "Zion",
        lastName: "Wu",
        phone: "984-215-8529",
        email: "zionwu@live.unc.edu",
        semester: "Spring2020"
    });
    
    const user4 = new User({
        onyen: "amclose",
        firstName: "Abraham",
        lastName: "Close",
        phone: "919-606-0281",
        email: "amclose@live.unc.edu",
        semester: "Spring2020"
    });
    
    const team1 = new Team({
        teamName:  "Team 1",
        teamMembers: ["pat1", "amclose"],
        semester: "Spring2020"
    });
    
    const team2 = new Team({
        teamName:  "Team 2",
        teamMembers: ["dan97w", "zionwu"],
        semester: "Spring2020"
    });
    
    const prop1 = new Proposal({
        title: "JimBob's Catfishin' Bonanza Webapp",
        email: "jimbob@yahoo.com",
        prop_name: "Jim 'JimBob' Bob",
        semester: "Spring2020",
        description: "Jim Bob needs a webapp to schedule his catfishing boat tours",
        info_url:  "placeholderurl",
        tech_requirements: "Jim Bob is a techie so you'll be using only the most cutting edge technologies",
        hardware_requirements: "Your typical catfisherman obviously has a very powerful home machine, so we can focus on performance"
    });
    
    const prop2 = new Proposal({
        title: "Where in the World is Steve Harvey?",
        status: "Pending",
        email: "welovesteveharvey@steveharveyfanclub.org",
        prop_name: "The Steve Harvey Fan Club",
        semester: "Spring2020",
        description: "The Steve Harvey Fan Club wants to create an app that will use satelite technology to track the reflections of the sun off of Steve Harvey's teeth, thus enabling users to track his location in real time!",
        info_url:  "placeholderurl",
        tech_requirements: "Maintainable by the fan club, simple technologies that volunteers can learn and use easily",
        hardware_requirements: "Runnable on any home or mobile machine"
    });
    const prop3 = new Proposal({
        title: "Queso",
        status: "Accepted",
        email: "tasty@cheese.org",
        prop_name: "Queso Coding",
        semester: "Spring2020",
        description: "Just want to make it easier to make queso.",
        info_url:  "cheese.us",
        tech_requirements: "Nacho problem",
        hardware_requirements: "Must be crispy"
    });
    const prop4 = new Proposal({
        title: "React experimental features",
        status: "Rejected",
        email: "rx@email.org",
        prop_name: "Hello this is my name",
        semester: "Spring2020",
        description: "This project doesn't really have any purpose, but it is something to take up a whole semester for some students.",
        info_url:  "dummyurl.com",
        tech_requirements: "Simple technologies that volunteers can learn and use easily",
        hardware_requirements: "None"
    });
    
    const pendingLetter = new Letter({
        text: "Your proposal is pending.",
        status: "Pending"
    });

    const acceptedLetter = new Letter({
        text: "Your proposal has been accepted!",
        status: "Accepted"
    });

    const rejectedLetter = new Letter({
        text: "Your proposal has been rejected, however, we would still like to keep your information on file for future semesters.",
        status: "Rejected"
    });

    const report1 = new Report({
        onyen: "pat1",
        text:"This class was great, I learned so much!"
    });

    const report2 = new Report({
        onyen: "dan97w",
        text: "What a semester!"
    });

    const users = [adminUser, user1, user2, user3, user4];
    const proposals = [prop1, prop2, prop3, prop4];
    const teams = [team1, team2];
    const letters = [pendingLetter, acceptedLetter, rejectedLetter];
    const reports = [report1, report2];
    
    Team.collection.deleteMany({}, function(err, result) {
        if (err) {
            return console.error(err);
        } else {
            console.log(result);
        }
    });
    
    User.collection.deleteMany({}, function(err, result) {
        if (err) {
            return console.error(err);
        } else {
            console.log(result);
        }
    });
    
    Proposal.collection.deleteMany({}, function(err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });

    Letter.collection.deleteMany({}, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });

    Report.collection.deleteMany({}, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
    
    console.log("Data cleared.");
    
    Team.collection.insertMany(teams, function(err) {
        console.error(err);
    });
    
    User.collection.insertMany(users, function(err) {
        console.error(err);
    });

    Proposal.collection.insertMany(proposals, function(err) {
        console.error(err);
    });

    Letter.collection.insertMany(letters, function(err) {
        console.error(err);
    });

    Report.collection.insertMany(reports, function(err) {
        console.error(err);
    });

    console.log("Seed data added.");

    setTimeout(process.exit, 1500);
});

