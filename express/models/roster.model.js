const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rosterSchema = new Schema({
    semester: { type: String, required: true, unique: true},
    studentList: { type: Array, required: true, unique: true }
}, {
    timestamps: true
});

const Roster = mongoose.model('Roster', rosterSchema);

module.exports = Roster;
