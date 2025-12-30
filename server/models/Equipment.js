const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    category: { type: String, required: true }, // e.g., "Machinery", "Electronics"
    location: { type: String, required: true }, // e.g., "Main Hall", "IT Office"
    department: { type: String }, // e.g., "Heavy Mechanics"
    installationDate: { type: Date },
    status: {
        type: String,
        enum: ['Active', 'Under Maintenance', 'Scrap'],
        default: 'Active'
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Who added it?
}, { timestamps: true });

module.exports = mongoose.model('Equipment', EquipmentSchema);