const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    team_name: { type: String, required: true },
    project_id: { type: String, required: true, default: "Pending"}
}, {
    timestamps: true
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;