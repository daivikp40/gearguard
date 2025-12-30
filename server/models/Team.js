const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lead: { type: String, required: true },
    email: String,
    phone: String,
    members: { type: Number, default: 0 },
    shift: { type: String, default: "General (9AM - 5PM)" },
    status: { type: String, default: "Active" } // Active, Busy, Offline
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);