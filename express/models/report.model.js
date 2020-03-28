const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    onyen: { type: String, required: true },
    text: { type: String, required: true }
}, {
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;