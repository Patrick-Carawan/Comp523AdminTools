const router = require('express').Router();
var Semesters = require('../models/semesters.model');
const auth = require('./auth');



// Update the list of all semesters
router.post('/update', auth.admin, (req, res, next) => {

    const _semesters = req.body.semesters;


    const semesters = {
        semesters: _semesters,
    };
    Semesters.collection.replaceOne({}, semesters, {upsert: true})
        .then(() => res.json("Semesters updated"))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Get all semesters
router.get('/', auth.admin, (req, res, next) => {
    Semesters.find({})
        .then(semesters => res.json(semesters))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Get the current semester
router.get('/current', auth.user, (req, res, next) => {
    if(process.env.CURRENT_SEMESTER){
        res.json(process.env.CURRENT_SEMESTER);
    } else {
        res.status(500).json('No current semester set');
    }
});



module.exports = router;
