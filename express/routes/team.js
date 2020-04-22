const router = require('express').Router();
const auth = require('./auth');
var Team = require("../models/team.model");

// Get all teams
router.get('/', auth.required, (req, res, next) => {
    Team.find()
        .then(teams => res.json(teams))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all teams proposal ranks for a semester
router.get('/rankings/:semester', auth.required, (req, res, next) => {
    Team.find({"semester": req.params.semester}, "teamName proposalRanks")
        .then(teams => res.json(teams))
        .catch(err => res.status(400).json('Error: ' + err));
});


// Add a new team to the database
router.post('/add', auth.required, (req, res, next) => {
    const _teamName = req.body.teamName;
    const _teamMembers = req.body.teamMembers;

    const newTeam = new Team({
        teamName:  _teamName,
        teamMembers: _teamMembers,
    });

    newTeam.save()
        .then((team) => res.json({id: team._id}))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a team
router.delete('/:id', auth.required, (req, res, next) => {
    Team.findByIdAndDelete(req.params.id)
        .then(() => res.json("Team deleted."))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all teams for a given semester
router.get('/semester/:semester', auth.required, (req, res, next) => {
    Team.find({ "semester": req.params.semester })
        .then(teams => res.json(teams))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a team by its ID
router.get('/:id', auth.required, (req, res, next) => {
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
router.post('/assignments/', auth.required, (req, res, next) => {
    var assignments = req.body.assignments;
    for (let i = 0; i < assignments.length; i++) {
        
        Team.findById(assignments[i].teamId)
            .then( (team) => {
                team.projectId = assignments[i].projectId;
                team.projectTitle = assignments[i].projectTitle;
                team.save()
                    .then(() => res.json(`Team ${i} assignment updated`))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
        
    }
});

// Update a team entry, to add or remove a student from a team, change proposal ranking, etc.
// router.post('/update/:id', auth.required, (req, res, next) => {
//     Team.findById(req.params.id)
//         .then(team => {
//             team.teamName = req.body.teamName;
//             team.projectId = req.body.projectId;
//             team.projectTitle = req.body.projectTitle;
//             team.teamMembers = req.body.teamMembers;
//             team.proposalRanks = req.body.proposalRanks;
//             team.save()
//                 .then(() => res.json("Team updated with new info."))
//                 .catch(err => res.status(400).json('Error: ' + err));
//          })
//          .catch(err => res.status(400).json('Error: ' + err));
// });

// Update a team's members
router.post('/updateMembers/:id', auth.required, (req, res, next) => {
    Team.findById(req.params.id)
        .then(team => {
            team.teamMembers = req.body.teamMembers;
            team.save()
                .then(() => res.json("Team updated with new members"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// Update a team's rankings
router.post('/updateRankings/:id', auth.required, (req, res, next) => {
    Team.findById(req.params.id)
        .then(team => {
            team.proposalRanks = req.body.proposalRanks;
            team.save()
                .then(() => res.json("Team's proposal rankings updated"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
