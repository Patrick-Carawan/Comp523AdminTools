const router = require('express').Router();
var User = require('../models/user.model');

router.route('/students/:semester').get((req, res) => {
    User.find({ "semester": req.params.semester })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/students/add').post((req, res) => {
    
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const email = req.body.email;
    const semester = req.body.semester;
    const teamId = req.body.teamId;
    const admin = false;
    
    const newStudent = new User({
        username,
        firstName,
        lastName,
        phone,
        email,
        semester,
        teamId,
        admin
    });

    newStudent.save()
        .then(() => res.json("Student added."))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;