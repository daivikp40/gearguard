const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const sendEmail = require("../utils/sendEmail");

// --- REGISTER ---
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// --- LOGIN (Standard) ---
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.password) return res.status(400).json({ message: "Please login with Google" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, token });
    } catch (err) {
        res.status(500).json(err);
    }
});

// --- GOOGLE LOGIN ---
router.post("/google", async (req, res) => {
    try {
        const { googleToken } = req.body;

        // Verify token with Google
        const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleToken}`);
        const { sub, name, email } = response.data;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                username: name,
                email: email,
                googleId: sub,
                role: "technician",
            });
            await user.save();
        } else if (!user.googleId) {
            user.googleId = sub;
            await user.save();
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ ...user._doc, token });
    } catch (err) {
        res.status(500).json({ message: "Google Login failed" });
    }
});

// --- FORGOT PASSWORD (Send OTP) ---
router.post("/forgot-password", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash OTP before saving
        const salt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(otp, salt);

        user.otp = hashedOTP;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 Minutes
        await user.save();

        await sendEmail(user.email, "Password Reset OTP", `Your OTP is: ${otp}`);
        res.status(200).json({ message: "OTP sent to email" });
    } catch (err) {
        res.status(500).json(err);
    }
});

// --- RESET PASSWORD (Verify OTP) ---
router.post("/reset-password", async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (Date.now() > user.otpExpires) {
            return res.status(400).json({ message: "OTP expired" });
        }

        const validOTP = await bcrypt.compare(otp, user.otp);
        if (!validOTP) return res.status(400).json({ message: "Invalid OTP" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;