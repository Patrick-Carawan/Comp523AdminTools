const router = require('express').Router();
var Team = require("../models/team.model");

// Get all teams
router.route('/').get((req, res) => {
    Team.find()
        .then(teams => res.json(teams))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all teams proposal ranks
router.route('/rankings').get((req, res) => {
    Team.find({}, "teamName proposalRanks")
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
        .then((team) => res.json({id: team._id}))
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

/*  
Assign projects to teams, request should look like
    {
        "assignments": [
            {"teamId": "abc", "projectId": "def"},
            {"teamId": "ghi", "projectId": "jkl"}
        ]
    }    
*/
router.route('/assignments').post( (req, res) => {
    var assignments = req.body.assignments;
    for (let i = 0; i < assignments.length; i++) {
        
        Team.findById(assignments[i].teamId)
            .then( (team) => {
                team.projectId = assignments[i].projectId;
                team.save()
                    .then(() => res.json(`Team ${i} assignment updated`))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
        
    }
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
                .then(() => res.json("Team updated with new info."))
                .catch(err => res.status(400).json('Error: ' + err));
         })
         .catch(err => res.status(400).json('Error: ' + err));
});

// Update a team's members
router.route('/updateMembers/:id').post((req, res) => {
    Team.findById(req.params.id)
        .then(team => {
            team.teamMembers = req.body.teamMembers;
            team.save()
                .then(() => res.json("Team updated with new members"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
