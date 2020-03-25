const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    onyen: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email:  { type: String, required: true },
    semester: { type: String, required: true },
    teamId: { type: String, required: true, default: "Pending" },
    admin: { type: Boolean, required: true, default: false } 
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;