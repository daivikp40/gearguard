const router = require("express").Router();
const User = require("../models/User");

// 1. REGISTER
router.post("/register", async (req, res) => {
    try {
        console.log("Registering user:", req.body.email);

        // Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        // Save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json(err);
    }
});

// 2. LOGIN
router.post("/login", async (req, res) => {
    try {
        // Find user
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json("User not found");
        }

        // Check password (simple comparison for now)
        if (user.password !== req.body.password) {
            return res.status(400).json("Wrong password");
        }

        // Send user data back (excluding password)
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json(err);
    }
});

module.exports = router;