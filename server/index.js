const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const equipmentRoute = require('./routes/equipment');
const maintenanceRoute = require('./routes/maintenance');
const teamRoute = require('./routes/teams');

dotenv.config();

const app = express();

// 1. Middleware (Only define this ONCE)
app.use(express.json());
app.use(cors());

// 2. Security Headers for Google Login
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

// 3. Database Connection
// Ensure your Render env var is named 'MONGO_URI' exactly like this
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => {
        console.error("DB Connection Error:", err);
    });

// 4. Routes
app.use("/api/auth", authRoutes);
app.use("/api/equipment", equipmentRoute);
app.use("/api/maintenance", maintenanceRoute);
app.use("/api/teams", teamRoute);

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}!`);
});