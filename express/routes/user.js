const router = require('express').Router();
var User = require('../models/user.model');

// Get all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

// Get all students for a given semester
router.route('/students/:semester').get((req, res) => {
    User.find({ "semester": req.params.semester })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add students
router.route('/students/add').post((req, res) => {
    
    const _onyen = req.body.onyen;
    const _firstName = req.body.firstName;
    const _lastName = req.body.lastName;
    const _phone = req.body.phone;
    const _email = req.body.email;
    const _semester = req.body.semester;
    const _teamId = req.body.teamId;
    const _admin = req.body.admin;

    // Figure out how to handle request differently if admin and teamId fields are supplied
    console.log(req.body.hasOwnProperty("admin"));
    
    const newStudent = new User({
        onyen: _onyen,
        firstName: _firstName,
        lastName: _lastName,
        phone: _phone,
        email: _email,
        semester: _semester,
        teamId: _teamId,
        admin: _admin
    });

    newStudent.save()
        .then(() => res.json("Student added."))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;