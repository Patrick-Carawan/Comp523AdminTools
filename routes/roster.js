const router = require('express').Router();
var Roster = require('../models/roster.model');
const auth = require('./auth');

// Add a roster
router.post('/add/:semester', auth.admin, (req, res, next) => {

    const _semester = req.params.semester;
    const _studentList = req.body.studentList;

    const roster = {
        semester: _semester,
        studentList: _studentList
    };
    Roster.collection.replaceOne({"semester" : _semester.toString()}, roster, {upsert: true})
        .then(() => res.json("Roster added."))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Get roster for a semester
router.get('/:semester', auth.user, (req, res) => {
    Roster.find({"semester": req.params.semester})
        .then(roster => res.json(roster))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
