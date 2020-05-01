const router = require('express').Router();
const auth = require('./auth');
var StudentReport = require("../models/studentReport.model");
var TeamReport = require("../models/teamReport.model");

// Get all student reports
router.get('/students/:semester', auth.admin, (req, res, next) => {
    StudentReport.find({"semester": req.params.semester})
        .then(reports => res.json(reports))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all team reports for a semester
router.get('/teams/:semester', auth.admin, (req, res, next) => {
    TeamReport.find({"semester": req.params.semester})
        .then(reports => res.json(reports))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a student report
router.post('/students', auth.user, (req, res, next) => {
    const _onyen = req.body.onyen;
    const _text = req.body.text;

    StudentReport.findOneAndUpdate({ onyen: _onyen }, { text: _text}, { upsert: true }, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.json("Student report added.");
        }
    });
});

// Add a team report
router.post('/teams', auth.user, (req, res, next) => {
    const _team = req.body.team;
    const _text = req.body.text;

    TeamReport.findOneAndUpdate({ team: _team }, { text: _text}, { upsert: true }, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.json("Team report added.");
        }
    });
});

module.exports = router;