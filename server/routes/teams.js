const router = require('express').Router();
const Team = require('../models/Team');

// 1. GET ALL TEAMS
router.get("/", async (req, res) => {
    try {
        const teams = await Team.find().sort({ createdAt: -1 });
        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. CREATE NEW TEAM
router.post("/", async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        const savedTeam = await newTeam.save();
        res.status(200).json(savedTeam);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 3. DELETE TEAM
router.delete("/:id", async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.status(200).json("Team has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;