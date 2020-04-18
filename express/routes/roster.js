const router = require('express').Router();
var Roster = require('../models/roster.model');

// Add a roster
router.route('/add/:semester').post((req, res) => {

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
router.route('/:semester').get((req, res) => {
    Roster.find({"semester": req.params.semester})
        .then(roster => res.json(roster))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
