const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    demoStatus: { type: String, required: true },
    deliverableStatus: { type: String, required: true },
    week: { type: Number, required: true },
    semester: { type: String, required: true },
    teamId: { type: String, required: true },
    comment: { type: String, required: true },
    weekTodo: { type: String, required: true },
    attendance: {type: Object, required: true}
}, {
    timestamps: true
});

const Letter = mongoose.model('CoachMeeting', meetingSchema);

module.exports = Letter;
