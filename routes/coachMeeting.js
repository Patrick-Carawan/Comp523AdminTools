const router = require('express').Router();
var CoachMeeting = require('../models/coachMeeting.model');
const auth = require('./auth');

// Add a coachMeeting
router.post('/add/:semester/:week/:teamId', auth.required, (req, res, next) => {
    if (req.payload.admin) {
        const _demoStatus = req.body.demoStatus;
        const _deliverableStatus = req.body.deliverableStatus;
        const _week = req.params.week;
        const _semester = req.params.semester;
        const _teamId = req.params.teamId;
        const _comment = req.body.comment;
        const _weekTodo = req.body.weekTodo;
        const _attendance = req.body.attendance;

        const meeting = {
            demoStatus: _demoStatus,
            deliverableStatus: _deliverableStatus,
            week: _week,
            semester: _semester,
            teamId: _teamId,
            comment: _comment,
            weekTodo: _weekTodo,
            attendance: _attendance
        };
        CoachMeeting.collection.replaceOne({"semester" : _semester, "teamId" : _teamId, "week": _week}, meeting, {upsert: true})
            .then(() => res.json("Meeting updated"))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.status(403).json("Not authorized");
    }


});

//Get all coach meetings is a semester for a single team

router.get('/:semester/:teamId', auth.required, (req, res, next) => {
    if (req.payload.admin) {
        CoachMeeting.find({"semester": req.params.semester, "teamId": req.params.teamId})
            .then(meeting => res.json(meeting))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.status(403).json("Not authorized");
    }

});

// Get coach meeting
router.get('/:semester/:week/:teamId', auth.required, (req, res, next) => {
    if (req.payload.admin) {
        CoachMeeting.find({"semester": req.params.semester, "week": req.params.week, "teamId": req.params.teamId})
            .then(meeting => res.json(meeting))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.status(403).json("Not authorized");
    }

});



// Get all coach meetings for a semester
router.get('/:semester', auth.required, (req, res, next) => {
    if (req.payload.admin) {
        CoachMeeting.find({"semester": req.params.semester})
            .then(meeting => res.json(meeting))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.status(403).json("Not authorized");
    }

});


module.exports = router;
