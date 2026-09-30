const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();


/* =========================================================
   REGISTER
========================================================= */

router.post("/register", async (req, res) => {

    try {

        const {
            username,
            email,
            password,
            highestQualification,
            degree,
            branch,
            college,
            graduationYear,
            cgpa,
            currentStatus,
            currentSemester,
            expectedGraduationYear,
            lookingFor,
            preferredRoles,
            workPreference,
            preferredLocation,
            termsAccepted
        } = req.body;


        /* =====================================================
           CHECK REQUIRED FIELDS
        ===================================================== */

        if (
            !username ||
            !email ||
            !password ||
            !highestQualification ||
            !degree ||
            !branch ||
            !college ||
            !graduationYear ||
            !cgpa ||
            !currentStatus
        ) {

            return res.status(400).json({
                message: "Please fill all required fields."
            });

        }


        /* =====================================================
           CHECK TERMS
        ===================================================== */

        if (!termsAccepted) {

            return res.status(400).json({
                message:
                    "You must accept the Terms of Service."
            });

        }


        /* =====================================================
           CHECK EXISTING EMAIL
        ===================================================== */

        const existingEmail =
            await User.findOne({
                email: email.toLowerCase()
            });


        if (existingEmail) {

            return res.status(409).json({
                message:
                    "Email is already registered."
            });

        }


        /* =====================================================
           CHECK EXISTING USERNAME
        ===================================================== */

        const existingUsername =
            await User.findOne({
                username
            });


        if (existingUsername) {

            return res.status(409).json({
                message:
                    "Username is already taken."
            });

        }


        /* =====================================================
           HASH PASSWORD
        ===================================================== */

        const hashedPassword =
            await bcrypt.hash(password, 10);


        /* =====================================================
           CREATE USER
        ===================================================== */

        const newUser = new User({

            username,

            email:
                email.toLowerCase(),

            password:
                hashedPassword,

            highestQualification,

            degree,

            branch,

            college,

            graduationYear,

            cgpa,

            currentStatus,

            currentSemester,

            expectedGraduationYear,

            lookingFor,

            preferredRoles,

            workPreference,

            preferredLocation,

            termsAccepted

        });


        /* =====================================================
           SAVE USER TO MONGODB
        ===================================================== */

        await newUser.save();


        res.status(201).json({

            message:
                "Account created successfully!"

        });


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        res.status(500).json({

            message:
                "Server error. Please try again."

        });

    }

});



/* =========================================================
   LOGIN
========================================================= */

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        /* =====================================================
           CHECK EMAIL AND PASSWORD
        ===================================================== */

        if (!email || !password) {

            return res.status(400).json({

                message:
                    "Email and password are required."

            });

        }


        /* =====================================================
           FIND USER
        ===================================================== */

        const user =
            await User.findOne({

                email:
                    email.toLowerCase()

            });


        if (!user) {

            return res.status(401).json({

                message:
                    "Invalid email or password."

            });

        }


        /* =====================================================
           CHECK PASSWORD
        ===================================================== */

        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!isPasswordCorrect) {

            return res.status(401).json({

                message:
                    "Invalid email or password."

            });

        }


        /* =====================================================
           LOGIN SUCCESSFUL
           
           IMPORTANT:
           We return ALL profile information here.
        ===================================================== */

        res.status(200).json({

            message:
                "Login successful!",

            user: {

                id:
                    user._id,

                username:
                    user.username,

                email:
                    user.email,

                highestQualification:
                    user.highestQualification,

                degree:
                    user.degree,

                branch:
                    user.branch,

                college:
                    user.college,

                graduationYear:
                    user.graduationYear,

                cgpa:
                    user.cgpa,

                currentStatus:
                    user.currentStatus,

                currentSemester:
                    user.currentSemester,

                expectedGraduationYear:
                    user.expectedGraduationYear,

                lookingFor:
                    user.lookingFor,

                preferredRoles:
                    user.preferredRoles,

                workPreference:
                    user.workPreference,

                preferredLocation:
                    user.preferredLocation

            }

        });


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        res.status(500).json({

            message:
                "Server error. Please try again."

        });

    }

});



/* =========================================================
   UPDATE PROFILE
========================================================= */

router.put("/profile/:id", async (req, res) => {

    try {

        const userId =
            req.params.id;


        const {

            username,

            email,

            highestQualification,

            degree,

            branch,

            college,

            graduationYear,

            cgpa,

            currentStatus,

            expectedGraduationYear,

            lookingFor,

            preferredRoles,

            workPreference,

            preferredLocation

        } = req.body;


        /* =====================================================
           REQUIRED FIELDS
        ===================================================== */

        if (!username || !email) {

            return res.status(400).json({

                message:
                    "Username and email are required."

            });

        }


        /* =====================================================
           CHECK EMAIL ALREADY USED
        ===================================================== */

        const existingEmail =
            await User.findOne({

                email:
                    email.toLowerCase(),

                _id:
                    { $ne: userId }

            });


        if (existingEmail) {

            return res.status(409).json({

                message:
                    "Email is already registered."

            });

        }


        /* =====================================================
           CHECK USERNAME ALREADY USED
        ===================================================== */

        const existingUsername =
            await User.findOne({

                username,

                _id:
                    { $ne: userId }

            });


        if (existingUsername) {

            return res.status(409).json({

                message:
                    "Username is already taken."

            });

        }


        /* =====================================================
           UPDATE USER
        ===================================================== */

        const updatedUser =
            await User.findByIdAndUpdate(

                userId,

                {

                    username,

                    email:
                        email.toLowerCase(),

                    highestQualification,

                    degree,

                    branch,

                    college,

                    graduationYear,

                    cgpa,

                    currentStatus,

                    expectedGraduationYear,

                    lookingFor,

                    preferredRoles,

                    workPreference,

                    preferredLocation

                },

                {

                    new: true,

                    runValidators: true

                }

            ).select("-password");


        /* =====================================================
           USER NOT FOUND
        ===================================================== */

        if (!updatedUser) {

            return res.status(404).json({

                message:
                    "User not found."

            });

        }


        /* =====================================================
           RETURN UPDATED USER
        ===================================================== */

        res.status(200).json({

            message:
                "Profile updated successfully.",

            user: {

                id:
                    updatedUser._id,

                username:
                    updatedUser.username,

                email:
                    updatedUser.email,

                highestQualification:
                    updatedUser.highestQualification,

                degree:
                    updatedUser.degree,

                branch:
                    updatedUser.branch,

                college:
                    updatedUser.college,

                graduationYear:
                    updatedUser.graduationYear,

                cgpa:
                    updatedUser.cgpa,

                currentStatus:
                    updatedUser.currentStatus,

                currentSemester:
                    updatedUser.currentSemester,

                expectedGraduationYear:
                    updatedUser.expectedGraduationYear,

                lookingFor:
                    updatedUser.lookingFor,

                preferredRoles:
                    updatedUser.preferredRoles,

                workPreference:
                    updatedUser.workPreference,

                preferredLocation:
                    updatedUser.preferredLocation

            }

        });


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );


        res.status(500).json({

            message:
                "Server error. Unable to update profile."

        });

    }

});



/* =========================================================
   EXPORT ROUTER
========================================================= */

module.exports = router;