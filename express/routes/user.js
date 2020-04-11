const mongoose = require('mongoose');
const passport = require('passport')
const router = require('express').Router();
const auth = require('./auth');
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

//Update team for a given student
router.route('/updateTeam/:onyen').post((req,res)=> {
    User.findOne({onyen: req.params.onyen})
        .then(student => {
            student.teamId = req.body.teamId;
            student.save()
                .then(() => res.json("Student's teamId updated"))
                .catch(err => res.status(400).json('Error in saving student: ' + err));
        })
        .catch(err => res.status(400).json('Error in finding student: ' + err));
});

// Create new User
router.post('/', auth.optional, (req, res, next) => {
    const { body: { user } } = req;
  
    if(!user.onyen) {
      return res.status(422).json({
        errors: {
          onyen: 'is required',
        },
      });
    }
  
    if(!user.password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }
  
    const finalUser = new User(user);
  
    finalUser.setPassword(user.password);
  
    return finalUser.save()
      .then(() => res.json({ user: finalUser.toAuthJSON() }));
});
  

// Login route
router.post('/login', auth.optional, (req, res, next) => {
    const { body: { user } } = req;
  
    if(!user.onyen) {
      return res.status(422).json({
        errors: {
          onyen: 'is required',
        },
      });
    }
  
    if(!user.password) {
      return res.status(422).json({
        errors: {
          password: 'is required',
        },
      });
    }
  
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      if(err) {
        return next(err);
      }
  
      if(passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
  
        return res.json({ user: user.toAuthJSON() });
      }
  
      return status(400).info;
    })(req, res, next);
});
  
// GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
    const { payload: { id } } = req;
  
    return User.findById(id)
      .then((user) => {
        if(!user) {
          return res.sendStatus(400);
        }
  
        return res.json({ user: user.toAuthJSON() });
      });
});
  
// Add students
// router.route('/students/add').post((req, res) => {
    
//     const _onyen = req.body.onyen;
//     const _firstName = req.body.firstName;
//     const _lastName = req.body.lastName;
//     const _phone = req.body.phone;
//     const _email = req.body.email;
//     const _semester = req.body.semester;
//     const _teamId = req.body.teamId;
//     const _admin = req.body.admin;

    
//     const newStudent = new User({
//         onyen: _onyen,
//         firstName: _firstName,
//         lastName: _lastName,
//         phone: _phone,
//         email: _email,
//         semester: _semester,
//         teamId: _teamId,
//         admin: _admin
//     });

//     newStudent.save()
//         .then(() => res.json("Student added."))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
