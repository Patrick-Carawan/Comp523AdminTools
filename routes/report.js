const router = require('express').Router();
const auth = require('./auth');
var StudentReport = require("../models/studentReport.model");
var TeamReport = require("../models/teamReport.model");

// Get all student reports
router.get('/students/:semester', auth.required, (req, res, next) => {
    if (req.payload.admin) {
        StudentReport.find({"semester": req.params.semester})
            .then(reports => res.json(reports))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.status(403).json("Not authorized");
    }
    
});

// Get all team reports for a semester
router.get('/teams/:semester', auth.required, (req, res, next) => {
    if (req.payload.admin) {
        TeamReport.find({"semester": req.params.semester})
            .then(reports => res.json(reports))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.status(403).json("Not authorized");
    }

});

// Add a student report
router.post('/students', auth.required, (req, res, next) => {
    const _onyen = req.body.onyen;
    const _text = req.body.text;
    const _semester = process.env.CURRENT_SEMESTER;

    StudentReport.findOneAndUpdate({ onyen: _onyen }, { text: _text, semester: _semester}, { upsert: true }, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.json("Student report added.");
        }
    });
});

// Add a team report
router.post('/teams', auth.required, (req, res, next) => {
    const _team = req.body.team;
    const _text = req.body.text;
    const _semester = process.env.CURRENT_SEMESTER;

    TeamReport.findOneAndUpdate({ team: _team }, { text: _text, semester: _semester}, { upsert: true }, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.json("Team report added.");
        }
    });
});

module.exports = router;
