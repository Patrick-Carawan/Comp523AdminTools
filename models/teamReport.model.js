const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamReportSchema = new Schema({
    team: { type: String, required: true },
    text: { type: String, required: true }
}, {
    timestamps: true
});

const TeamReport = mongoose.model('TeamReport', teamReportSchema);

module.exports = TeamReport;