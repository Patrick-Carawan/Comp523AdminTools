const router = require('express').Router();
var Roster = require('../models/roster.model');
const auth = require('./auth');

// Add a roster
router.post('/add/:semester', auth.required, (req, res, next) => {

    if (req.payload.admin) {
        const _semester = req.params.semester;
        const _studentList = req.body.studentList;

        const roster = {
            semester: _semester,
            studentList: _studentList
        };

        Roster.findOneAndUpdate({ semester: _semester }, { semester: _semester, studentList: _studentList}, { upsert: true, new: true }, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                res.json("Roster updated.");
            }
        });

    } else {
        res.status(403).json("Not authorized");
    }

});


// Get roster for a semester
router.get('/:semester', auth.required, (req, res) => {
    Roster.find({"semester": req.params.semester})
        .then(roster => res.json(roster))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
