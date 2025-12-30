const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    equipment: { type: String, required: true }, // We will store the Machine Name here
    type: {
        type: String,
        enum: ['Corrective', 'Preventive'],
        default: 'Corrective'
    },
    team: { type: String }, // e.g., "Heavy Mechanics"
    technician: { type: String }, // Who is assigned?
    priority: {
        type: String,
        enum: ['Low', 'Normal', 'High'],
        default: 'Normal'
    },
    scheduledDate: { type: Date },
    duration: { type: Number, default: 0 }, // In hours
    description: { type: String },
    stage: {
        type: String,
        enum: ['New', 'In Progress', 'Repaired', 'Scrap'],
        default: 'New'
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Maintenance', MaintenanceSchema);