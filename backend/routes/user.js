const router = require('express').Router();
let User = require('../models/user.model');

router.route(`/students/:semester`).get((req, res) => {
    User.find({ "semester": req.params.semester})
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

