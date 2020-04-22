const mongoose = require('mongoose');
const passport = require('passport')
const router = require('express').Router();
const auth = require('./auth');
var User = require('../models/user.model');

require('dotenv').config();

// Get all users
router.get('/', auth.required, (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a user by their onyen
router.get('/:onyen', auth.required, (req, res, next) => {
    User.find({onyen: req.params.onyen})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all students for a given semester
router.get('/students/:semester', auth.required, (req, res, next) => {
    User.find({"semester": req.params.semester})
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Update team for a given student
router.post('/updateTeam/:onyen', auth.required, (req, res, next) => {
    User.findOne({onyen: req.params.onyen})
        .then(student => {
            student.teamId = req.body.teamId;
            student.save()
                .then(() => res.json("Student's teamId updated. ")) // Do we want to change the Team here too?
                .catch(err => res.status(400).json('Error in saving student: ' + err));
        })
        .catch(err => res.status(400).json('Error in finding student: ' + err));
});

// Create new User
router.post('/', auth.optional, (req, res, next) => {
    const {body: {user}} = req;

    if (!user.onyen) {
        return res.status(422).json({
            errors: {
                onyen: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new User(user);

    if (user.adminToken && user.adminToken === process.env.ADMIN_TOKEN) {
        finalUser.admin = true;
    } else {
        finalUser.admin = false;
    }

    if (user.adminToken !== '' && user.adminToken && user.adminToken !== process.env.ADMIN_TOKEN) {
        res.status(406).send("Admin Key is incorrect. Please log in as a student without an admin key, or enter the correct key.");
        return
    }

    console.log(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({
            user: finalUser.toAuthJSON(),
            onyen: finalUser.onyen,
            name: `${finalUser.firstName} ${finalUser.lastName}`
        }))
        .catch(err => res.status(400).json('Error in finding student: ' + err));
});


// Login route
router.post('/login', auth.optional, (req, res, next) => {
    const {body: {user}} = req;

    if (!user.onyen) {
        return res.status(422).json({
            errors: {
                onyen: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', {session: false}, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({
                user: user.toAuthJSON(), onyen: user.onyen,
                name: `${user.firstName} ${user.lastName}`,
                admin: user.admin,
                teamId: user.teamId
            });
        }

        return status(400).info;
    })(req, res, next);
});

// GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
    const {payload: {id}} = req;

    return User.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({user: user.toAuthJSON()});
        });
});

module.exports = router;
