const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional because Google users won't have one
    role: { type: String, default: 'technician' },

    // Google Auth
    googleId: { type: String },

    // OTP System
    otp: { type: String },
    otpExpires: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);