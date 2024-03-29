const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv').config();

const secret = process.env.SECRET || "SkibbedyBop";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    onyen: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: false },
    semester: { type: String, required: true, default: process.env.CURRENT_SEMESTER },
    admin: { type: Boolean, required: true, default: false },
    teamId: {type: String, default: "Pending"},
    verified: {type: Boolean, required: true, default: false},
    email: {type: String, required: false},
    hash: String,
    salt: String 
}, {
    timestamps: true
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
    // const today = new Date();
    // const expirationDate = new Date(today);
    // expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        onyen: this.onyen,
        id: this._id,
        admin: this.admin
    }, secret, {
        expiresIn: "7d"
    });
};

// Asynchronously sends a reset password email to a user
userSchema.methods.sendPasswordResetEmail = function() {
    console.log(`Sending password reset email for ${this.onyen}`);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NOREPLY_EMAIL,
          pass: process.env.NOREPLY_PASSWORD
        }
    });

    jwt.sign({
        onyen: this.onyen,
        id: this._id,
        admin: this.admin
    }, secret, {
        expiresIn: "1d"
    }, (err, emailToken) => {
        if (err) {
            console.log(err);
        }
        let messageHtml = `Please click the following link to reset your password for COMP 523:\n <a href="https://comp-523-admin-tools.herokuapp.com/passwordReset/${this.onyen}/${emailToken}">Reset Password</a>`;
        let recipient = this.email ? this.email : `${this.onyen}${process.env.NOREPLY_RECIPIENT_DOMAIN}`;
        console.log('user.model this.email',this.email);
        let resetEmail = {
        from: process.env.NOREPLY_EMAIL,
        to: recipient,
        subject: 'Password Reset for COMP 523',
        html: messageHtml
        };
        transporter.sendMail(resetEmail, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email sent to ${resetEmail.to}`);
            }
        });
    });
};

// This function asynchronously sends verification emails 
userSchema.methods.generateVerificationEmail = function() {
    console.log(`Sending verification email for ${this.onyen}`);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NOREPLY_EMAIL,
          pass: process.env.NOREPLY_PASSWORD
        }
    });
    jwt.sign({
        onyen: this.onyen,
        id: this._id,
        admin: this.admin
    }, secret, {
        expiresIn: "3d"
    }, (err, emailToken) => {
        if (err) {
            console.log(err);
        }
        let url = `https://comp-523-admin-tools.herokuapp.com/verify/${emailToken}`;
        let messageHtml = `Please click the following link to verify your account for COMP 523:\n <a href="https://comp-523-admin-tools.herokuapp.com/verify/${this.onyen}/${emailToken}">Verify Account</a>`;
        let recipient = this.email ? this.email : `${this.onyen}${process.env.NOREPLY_RECIPIENT_DOMAIN}`;
        let verificationEmail = {
        from: process.env.NOREPLY_EMAIL,
        to: recipient,
        subject: 'Verification for COMP 523',
        html: messageHtml
        };
        transporter.sendMail(verificationEmail, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email sent to ${verificationEmail.to}`);
            }
        });
    });

    
};


userSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        onyen: this.onyen, 
        token: this.generateJWT()
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
