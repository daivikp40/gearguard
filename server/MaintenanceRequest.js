const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    subject: { type: String, required: true }, // "Leaking Oil"
    equipment: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' },
    type: {
        type: String,
        enum: ['Corrective', 'Preventive'],
        default: 'Corrective'
    },
    stage: {
        type: String,
        enum: ['New', 'In Progress', 'Repaired', 'Scrap'],
        default: 'New'
    },
    priority: { type: String, enum: ['Low', 'Normal', 'High'], default: 'Normal' },
    scheduledDate: { type: Date }, // For Calendar view
    duration: { type: Number, default: 0 }, // Hours spent
    technician: { type: String }, // Assigned user
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('MaintenanceRequest', RequestSchema);