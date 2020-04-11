const router = require('express').Router();
var StudentReport = require("../models/studentReport.model");
var TeamReport = require("../models/teamReport.model");

// Get all student reports
router.route('/students').get((req, res) => {
    StudentReport.find()
        .then(reports => res.json(reports))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all team reports
router.route('/teams').get((req, res) => {
    TeamReport.find()
        .then(reports => res.json(reports))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a student report
router.route('/students').post((req, res) => {
    const _onyen = req.body.onyen;
    const _text = req.body.text;

    newReport = new StudentReport({
        onyen: _onyen,
        text: _text
    });

    newReport.save()
        .then(() => res.json("Student report added."))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a team report
router.route('/teams').post((req, res) => {
    const _team = req.body.team;
    const _text = req.body.text;

    newReport = new TeamReport({
        team: _team,
        text: _text
    });

    newReport.save()
        .then(() => res.json("Team report added."))
        .catch(err => res.status(400).json('Error: ' + err));
});





module.exports = router;