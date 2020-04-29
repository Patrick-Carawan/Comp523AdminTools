const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamReportSchema = new Schema({
    team: { type: String, required: true },
    text: { type: String, required: true },
    semester: { type: String, required: true, default: process.env.CURRENT_SEMESTER },
}, {
    timestamps: true
});

const TeamReport = mongoose.model('TeamReport', teamReportSchema);

module.exports = TeamReport;
