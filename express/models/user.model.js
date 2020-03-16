const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    onyen: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
    email:  { type: String, required: true },
    semester: { type: String, required: true },
    team_id: { type: String },
    admin: { type: Boolean, required: true, default: false } 
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;