const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentReportSchema = new Schema({
    onyen: { type: String, required: true },
    text: { type: String, required: true },
    semester: {type: String, required: true, default: process.env.CURRENT_SEMESTER}
}, {
    timestamps: true
});

const StudentReport = mongoose.model('StudentReport', studentReportSchema);

module.exports = StudentReport;
