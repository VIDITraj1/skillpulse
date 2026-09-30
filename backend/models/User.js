const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // Basic Information
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        // Education
        highestQualification: {
            type: String,
            required: true
        },

        degree: {
            type: String,
            required: true
        },

        branch: {
            type: String,
            required: true
        },

        college: {
            type: String,
            required: true
        },

        graduationYear: {
            type: String,
            required: true
        },

        cgpa: {
            type: String,
            required: true
        },

        // Current Status
        currentStatus: {
            type: String,
            required: true
        },

        currentSemester: {
            type: String
        },

        expectedGraduationYear: {
            type: String
        },

        // Career Preferences
        lookingFor: {
            type: [String]
        },

        preferredRoles: {
            type: [String]
        },

        workPreference: {
            type: String
        },

        preferredLocation: {
            type: String
        },

        termsAccepted: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;