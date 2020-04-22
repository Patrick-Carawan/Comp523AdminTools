const router = require('express').Router();
const auth = require('./auth');
var StudentReport = require("../models/studentReport.model");
var TeamReport = require("../models/teamReport.model");

// Get all student reports
router.get('/students/:semester', auth.required, (req, res, next) => {
    StudentReport.find({"semester": req.params.semester})
        .then(reports => res.json(reports))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all team reports for a semester
router.get('/teams/:semester', auth.required, (req, res, next) => {
    TeamReport.find({"semester": req.params.semester})
        .then(reports => res.json(reports))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a student report
router.post('/students', auth.required, (req, res, next) => {
    const _onyen = req.body.onyen;
    const _text = req.body.text;

    newReport = new StudentReport({
        onyen: _onyen,
        text: _text,
    });

    newReport.save()
        .then(() => res.json("Student report added."))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a team report
router.post('/teams', auth.required, (req, res, next) => {
    const _team = req.body.team;
    const _text = req.body.text;

    newReport = new TeamReport({
        team: _team,
        text: _text,
    });

    newReport.save()
        .then(() => res.json("Team report added."))
        .catch(err => res.status(400).json('Error: ' + err));
});





module.exports = router;
