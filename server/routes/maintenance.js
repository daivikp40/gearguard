const router = require('express').Router();
const Maintenance = require('../models/Maintenance');

// 1. CREATE New Request
router.post('/', async (req, res) => {
    try {
        console.log("Attempting to save:", req.body);

        // Validation Checks
        if (!req.body.subject || req.body.subject.trim() === '') {
            return res.status(400).json({ message: "Subject is required" });
        }
        if (!req.body.equipment || req.body.equipment.trim() === '') {
            return res.status(400).json({ message: "Equipment is required" });
        }

        const newRequest = new Maintenance(req.body);
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (err) {
        console.error("SAVE ERROR:", err);
        res.status(500).json(err);
    }
});

// 2. GET All Requests
router.get('/', async (req, res) => {
    try {
        const requests = await Maintenance.find().sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 3. GET Dashboard Stats (Must be BEFORE /:id)
router.get('/stats/counts', async (req, res) => {
    try {
        const newRequests = await Maintenance.countDocuments({ stage: 'New' });
        const inProgress = await Maintenance.countDocuments({ stage: 'In Progress' });
        const repaired = await Maintenance.countDocuments({ stage: 'Repaired' });

        const today = new Date();
        const overdue = await Maintenance.countDocuments({
            stage: { $ne: 'Repaired' },
            scheduledDate: { $lt: today }
        });

        res.status(200).json({
            new: newRequests,
            inProgress: inProgress,
            repaired: repaired,
            overdue: overdue
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// 4. GET Single Request
router.get('/:id', async (req, res) => {
    try {
        const request = await Maintenance.findById(req.params.id);
        res.status(200).json(request);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 5. UPDATE Request
router.put('/:id', async (req, res) => {
    try {
        const updatedRequest = await Maintenance.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRequest);
    } catch (err) {
        res.status(500).json(err);
    }
});

// --- 6. DELETE Request (THIS WAS MISSING) ---
router.delete('/:id', async (req, res) => {
    try {
        await Maintenance.findByIdAndDelete(req.params.id);
        res.status(200).json("Request has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;