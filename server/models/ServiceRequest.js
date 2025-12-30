const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links this request to a specific User
        required: true,
    },
    location: {
        latitude: String,
        longitude: String,
        address: String, // "Near City Center Mall..."
    },
    serviceType: {
        type: String,
        enum: ['Tow', 'Flat Tire', 'Fuel', 'Battery', 'Lockout', 'Other'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    assignedMechanic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links to the mechanic who accepts the job
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);