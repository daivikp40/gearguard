const router = require('express').Router();
const Equipment = require('../models/Equipment');

// 1. CREATE New Equipment
router.post('/', async (req, res) => {
    try {
        const newEquipment = new Equipment(req.body);
        const savedEquipment = await newEquipment.save();
        res.status(200).json(savedEquipment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. GET All Equipment
router.get('/', async (req, res) => {
    try {
        // Added .sort({ createdAt: -1 }) to show newest items first
        const equipment = await Equipment.find().sort({ createdAt: -1 });
        res.status(200).json(equipment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 3. GET Single Equipment (by ID) -> NEEDED FOR EDITING
router.get('/:id', async (req, res) => {
    try {
        const equipment = await Equipment.findById(req.params.id);
        res.status(200).json(equipment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 4. UPDATE Equipment -> NEEDED FOR SAVING EDITS
router.put('/:id', async (req, res) => {
    try {
        const updatedEquipment = await Equipment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Return the updated version
        );
        res.status(200).json(updatedEquipment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 5. DELETE Equipment
router.delete('/:id', async (req, res) => {
    try {
        await Equipment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Equipment has been deleted..." });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;