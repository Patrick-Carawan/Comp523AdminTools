const router = require('express').Router();
var Semesters = require('../models/semesters.model');

// Add a roster
router.route('/update').post((req, res) => {

    const _semesters = req.body.semesters;


    const semesters = {
        semesters: _semesters,
    };
    Semesters.collection.replaceOne({}, semesters, {upsert: true})
        .then(() => res.json("Semesters updated"))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Get all semesters
router.route('/').get((req, res) => {
    Semesters.find({})
        .then(semesters => res.json(semesters))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
