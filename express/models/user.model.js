const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jwt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    onyen: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email:  { type: String, required: true },
    semester: { type: String, required: true },   
    admin: { type: Boolean, required: true, default: false },
    teamId: String,
    hash: String,
    salt: String 
}, {
    timestamps: true
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha12').toString('hex');
};

userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha12').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
};

userSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email, 
        token: this.generateJWT()
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;