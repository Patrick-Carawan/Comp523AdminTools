const router = require('express').Router();
var CoachMeeting = require('../models/coachMeeting.model');

// Add a coachMeeting
router.route('/add/:semester/:week/:teamId').post((req, res) => {

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
});


// Get coach meeting
router.route('/:semester/:week/:teamId').get((req, res) => {
    CoachMeeting.find({"semester": req.params.semester, "week": req.params.week, "teamId": req.params.teamId})
        .then(meeting => res.json(meeting))
        .catch(err => res.status(400).json('Error: ' + err));
});



// Get all coach meetings for a semester
router.route('/:semester').get((req, res) => {
    CoachMeeting.find({"semester": req.params.semester})
        .then(meeting => res.json(meeting))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
