const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();


/* =========================================================
   JOB DATA
========================================================= */

const jobsFile = path.join(
    __dirname,
    "..",
    "data",
    "extracted_jobs.json"
);


/* =========================================================
   LOAD JOBS FROM JSON
========================================================= */

function loadJobs() {

    try {

        const fileData = fs.readFileSync(
            jobsFile,
            "utf-8"
        );

        const jobs = JSON.parse(fileData);

        if (!Array.isArray(jobs)) {
            return [];
        }

        return jobs;

    } catch (error) {

        console.error(
            "Error loading internship data:",
            error.message
        );

        return [];

    }
}


/* =========================================================
   MATCH JOB WITH USER PROFILE
========================================================= */

function calculateMatch(job, user) {

    /*
        If there is no logged-in user,
        give a neutral score.
    */

    if (!user) {
        return 50;
    }


    let score = 40;


    const jobText = `
        ${job.title || ""}
        ${job.company || ""}
        ${job.location || ""}
    `.toLowerCase();


    /* -------------------------------------------------------
       PREFERRED ROLE
    ------------------------------------------------------- */

    if (
        Array.isArray(user.preferredRoles) &&
        user.preferredRoles.length > 0
    ) {

        const roleMatched =
            user.preferredRoles.some(function (role) {

                return jobText.includes(
                    String(role).toLowerCase()
                );

            });


        if (roleMatched) {
            score += 25;
        }
    }


    /* -------------------------------------------------------
       PREFERRED LOCATION
    ------------------------------------------------------- */

    if (
        user.preferredLocation &&
        job.location
    ) {

        const preferredLocation =
            String(
                user.preferredLocation
            ).toLowerCase();


        if (
            job.location
                .toLowerCase()
                .includes(preferredLocation)
        ) {

            score += 15;

        }
    }


    /* -------------------------------------------------------
       LOOKING FOR
    ------------------------------------------------------- */

    if (
        Array.isArray(user.lookingFor) &&
        user.lookingFor.length > 0
    ) {

        const lookingMatched =
            user.lookingFor.some(function (value) {

                return jobText.includes(
                    String(value).toLowerCase()
                );

            });


        if (lookingMatched) {
            score += 10;
        }
    }


    return Math.min(score, 100);
}


/* =========================================================
   SEARCH INTERNSHIPS
========================================================= */

router.get(
    "/search",
    function (req, res) {

        try {

            /* -----------------------------------------------
               SEARCH QUERY
            ------------------------------------------------ */

            const query =
                String(
                    req.query.q || ""
                )
                .trim()
                .toLowerCase();


            /* -----------------------------------------------
               USER PROFILE
            ------------------------------------------------ */

            let user = null;


            if (req.query.user) {

                try {

                    user =
                        JSON.parse(
                            req.query.user
                        );

                } catch (error) {

                    console.log(
                        "User profile could not be parsed."
                    );

                }
            }


            /* -----------------------------------------------
               LOAD JOB DATA
            ------------------------------------------------ */

            const jobs = loadJobs();


            /* -----------------------------------------------
               SEARCH
            ------------------------------------------------ */

            let results;


            if (!query) {

                results = [...jobs];

            } else {

                results =
                    jobs.filter(function (job) {

                        const searchableText = `
                            ${job.title || ""}
                            ${job.company || ""}
                            ${job.location || ""}
                            ${job.source || ""}
                        `.toLowerCase();


                        return searchableText.includes(
                            query
                        );

                    });

            }


            /* -----------------------------------------------
               MATCH SCORE
            ------------------------------------------------ */

            results =
                results.map(function (job) {

                    return {

                        ...job,

                        matchScore:
                            calculateMatch(
                                job,
                                user
                            )

                    };

                });


            /* -----------------------------------------------
               BEST MATCH FIRST
            ------------------------------------------------ */

            results.sort(function (a, b) {

                return (
                    b.matchScore -
                    a.matchScore
                );

            });


            /* -----------------------------------------------
               SEND RESPONSE
            ------------------------------------------------ */

            res.status(200).json({

                total: results.length,

                jobs: results

            });

        } catch (error) {

            console.error(
                "Internship search error:",
                error
            );


            res.status(500).json({

                message:
                    "Unable to load internship data."

            });

        }

    }
);


module.exports = router;