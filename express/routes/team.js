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
    const _semester = req.body.semester;

    const newTeam = new Team({
        teamName:  _teamName,
        teamMembers: _teamMembers,
        semester: _semester
    });

    newTeam.save()
        .then(() => res.json("Team added."))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a team
router.route('/:id').delete((req, res) => {
    Team.findByIdAndDelete(req.params.id)
        .then(() => res.json("Team deleted."))
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

// Update a team entry, to add or remove a student from a team, change proposal ranking, etc.
router.route('/update/:id').post((req, res) => {
    Team.findById(req.params.id)
        .then(team => {
            team.teamName = req.body.teamName;
            team.projectId = req.body.projectId;
            team.teamMembers = req.body.teamMembers;
            team.proposalRanks = req.body.proposalRanks;
            team.save()
                .then(() => res.json("Team updated with new user."))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;