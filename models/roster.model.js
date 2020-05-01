const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rosterSchema = new Schema({
    semester: { type: String, required: true, default: process.env.CURRENT_SEMESTER },
    studentList: { type: Array, unique: false, required: true }
}, {
    timestamps: true
});

const Roster = mongoose.model('Roster', rosterSchema);

module.exports = Roster;
