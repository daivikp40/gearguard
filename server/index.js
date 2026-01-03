const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const equipmentRoute = require('./routes/equipment');
const maintenanceRoute = require('./routes/maintenance');
const teamRoute = require('./routes/teams'); // <--- 1. Import

dotenv.config();

const app = express();
// 1. ADD THIS MIDDLEWARE BLOCK TO FIX GOOGLE LOGIN ERRORS
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

app.use(express.json());
app.use(cors());

// Middleware
app.use(express.json());
app.use(cors());


// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => {
        console.error("DB Connection Error:", err);
    });

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/equipment", equipmentRoute);
app.use("/api/maintenance", maintenanceRoute);
app.use("/api/teams", teamRoute); // <--- 2. Use
// Start Server
app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running on port 5000!");
});