const router = require('express').Router();
const auth = require('./auth');
var Team = require("../models/team.model");
var User = require("../models/user.model");

// Get all teams
router.get('/', auth.required, (req, res, next) => {
    if (req.payload.admin) {
        Team.find()
            .then(teams => res.json(teams))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.status(403).json("Not authorized");
    }
    
});

// Get all teams proposal ranks for a semester
router.get('/rankings/:semester', auth.required, (req, res, next) => {
    if (req.payload.admin) {
        Team.find({"semester": req.params.semester}, "teamName proposalRanks")
            .then(teams => res.json(teams))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.status(403).json("Not authorized");
    }
    
});


// Add a new team to the database once as a user
router.post('/addAsUser/:onyen', auth.required, (req, res, next) => {
    // const _teamName = req.body.teamName;
    User.findOne({ onyen: req.params.onyen })
        .then(user => {
            if (user.teamId === "Pending") {
                let _teamName;
                Team.collection.countDocuments({"semester":process.env.CURRENT_SEMESTER}).then(response => {
                    _teamName = 'Team ' + (response+1);
                    const _teamMembers = req.body.teamMembers;

                    const newTeam = new Team({
                        teamName:  _teamName,
                        teamMembers: _teamMembers,
                    });

                    newTeam.save()
                        .then((team) => res.json({id: team._id}))
                        .catch(err => res.status(400).json('Error: ' + err));
                })
                .catch(err => res.status(400).json('Error' + err));
            }
            
        })
        .catch(err => console.log(err));
    

});

// Add a new team to the database as an admin
router.post('/addAsAdmin', auth.required, (req, res, next) => {
    if (req.payload.admin) {
        let _teamName;
        Team.collection.countDocuments({"semester":process.env.CURRENT_SEMESTER}).then(response => {
            _teamName = 'Team ' + (response+1);
            const _teamMembers = req.body.teamMembers;

            const newTeam = new Team({
                teamName:  _teamName,
                teamMembers: _teamMembers,
            });

            newTeam.save()
                .then((team) => res.json({id: team._id}))
                .catch(err => res.status(400).json('Error: ' + err));
        }).catch(err => res.status(400).json('Error' + err));
    } else {
        res.status(418).json("You shouldn't be here, congrats");
    }
    // const _teamName = req.body.teamName;
    

});

// Delete a team
router.delete('/:id', auth.required, (req, res, next) => {
    if (req.payload.admin) {
        Team.findByIdAndDelete(req.params.id)
            .then(() => res.json("Team deleted."))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.status(403).json("Not authorized");
    }
    
});

// Get all teams for a given semester
router.get('/semester/:semester', auth.required, (req, res, next) => {
    if (req.payload.admin) {
        Team.find({ "semester": req.params.semester })
            .then(teams => res.json(teams))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.status(403).json("Not authorized");
    }
});

// Get a team by its ID
router.get('/:id', auth.required, (req, res, next) => {
    Team.findById(req.params.id)
        .then(team => res.json(team))
        .catch(err => err.status(400).json('Error: ' + err));
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
router.post('/assignments', auth.required, (req, res, next) => {
    if (req.payload.admin) {
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
    } else {
        res.status(403).json("Not authorized");
    }
    
});

/*  Update a team's members
    Request should look like
    {
        "teamMembers": ["onyen1", "onyen2", "onyen3"]
    }
*/
router.post('/updateMembers/:id', auth.required, (req, res, next) => {
    if (req.payload.admin) {
        Team.findById(req.params.id)
            .then(team => {
                team.teamMembers = req.body.teamMembers;
                team.save()
                    .then(() => res.json("Team updated with new members"))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.status(403).json("Not authorized");
    }
    
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
