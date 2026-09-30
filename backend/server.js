const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const internshipRoutes =
    require("./routes/internship");

const app = express();

const PORT = 5000;
app.use(cors());

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });

app.use("/api/auth", authRoutes);

app.use(
    "/api/internships",
    internshipRoutes
);

// Test route
app.get("/", (req, res) => {
    res.send("SkillPulse backend is working!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});