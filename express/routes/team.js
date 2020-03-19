const router = require('express').Router();
var Team = require("../models/team.model");

// Get all teams
router.route('/').get((req, res) => {
    Team.find()
        .then(teams => res.json(teams))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new team to the database
router.route('/add').post((req, res) => {
    const _teamName = req.body.teamName;
    const _teamMembers = req.body.teamMembers;

    newTeam = new Team({
        teamName:  _teamName,
        teamMembers: _teamMembers
    });

    newTeam.save()
        .then(() => res.json("Team added."))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all teams for a given semester
router.route('/:semester').get((req, res) => {
    Team.find({ "semester": req.params.semester })
        .then(teams => res.json(teams))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a team by its ID
router.route('/:id').get((req, res) => {
    Team.findById(req.params.id)
        .then(team => res.json(team))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a student to a team
router.route('/:id/:onyen').post((req, res) => {
    Team.findById(req.params.id)
        .then(team => {
            team.teamMembers.push(req.params.onyen);
            team.save()
                .then(() => res.json("Team updated with new user."))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;