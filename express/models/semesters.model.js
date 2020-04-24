const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const semesterSchema = new Schema({
    semesters: { type: Array, required: true },

}, {
    timestamps: true
});

const Semesters = mongoose.model('Semesters', semesterSchema);

module.exports = Semesters;
