const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const proposalSchema = new Schema({
    title: { type: String, required: true },
    email: { type: String, required: true },
    prop_name: { type: String, required: true },
    semester: { type: String, required: true, default: process.env.CURRENT_SEMESTER },
    description: { type: String, required: true },
    info_url:  { type: String },
    tech_requirements: { type: String },
    powerpoint_url: {type: String },
    hardware_requirements: { type: String },
    status: { type: String, default: "New" } 
}, {
    timestamps: true
});

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
