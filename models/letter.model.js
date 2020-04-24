const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const letterSchema = new Schema({
    text: { type: String, required: true },
    status: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

const Letter = mongoose.model('Letter', letterSchema);

module.exports = Letter;