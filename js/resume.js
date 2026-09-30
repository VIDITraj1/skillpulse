


document.addEventListener(
    "DOMContentLoaded",
    function () {


        const form =
            document.getElementById(
                "resume-form"
            );


        const downloadButton =
            document.getElementById(
                "download-resume-btn"
            );


        const analyzeButton =
            document.getElementById(
                "analyze-resume-btn"
            );


        if (!form) {
            return;
        }



        loadProfileData();



        addProject();




        addExperience();



        form.addEventListener(
            "input",
            updatePreview
        );


        const addProjectButton =
            document.getElementById(
                "add-project-btn"
            );


        if (addProjectButton) {

            addProjectButton.addEventListener(
                "click",
                function () {

                    addProject();

                    updatePreview();

                }
            );

        }



        const addExperienceButton =
            document.getElementById(
                "add-experience-btn"
            );


        if (addExperienceButton) {

            addExperienceButton.addEventListener(
                "click",
                function () {

                    addExperience();

                    updatePreview();

                }
            );

        }



        if (downloadButton) {

            downloadButton.addEventListener(
                "click",
                function () {

                    updatePreview();

                    window.print();

                }
            );

        }



        if (analyzeButton) {

            analyzeButton.addEventListener(
                "click",
                analyzeResume
            );

        }


        document
            .querySelectorAll(
                ".resume-step"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const sectionName =
                                button.dataset.section;


                            const section =
                                document.querySelector(
                                    `[data-form-section="${sectionName}"]`
                                );


                            if (section) {

                                section.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });

                            }


                            document
                                .querySelectorAll(
                                    ".resume-step"
                                )
                                .forEach(
                                    function (step) {

                                        step.classList.remove(
                                            "is-active"
                                        );

                                    }
                                );


                            button.classList.add(
                                "is-active"
                            );

                        }
                    );

                }
            );



        updatePreview();

    }
);



function loadProfileData() {

    const savedUser =
        localStorage.getItem(
            "skillpulseUser"
        );


    if (!savedUser) {
        return;
    }


    let user;


    try {

        user =
            JSON.parse(
                savedUser
            );

    } catch (error) {

        console.error(
            "Could not read user:",
            error
        );

        return;

    }


    setField(
        "name",
        user.username
    );


    setField(
        "email",
        user.email
    );


    setField(
        "qualification",
        user.highestQualification
    );


    setField(
        "degree",
        user.degree
    );


    setField(
        "branch",
        user.branch
    );


    setField(
        "college",
        user.college
    );


    setField(
        "graduationYear",
        user.graduationYear
    );


    setField(
        "cgpa",
        user.cgpa
    );

}



function setField(
    name,
    value
) {

    const field =
        document.querySelector(
            `[name="${name}"]`
        );


    if (
        field &&
        value !== undefined &&
        value !== null
    ) {

        field.value =
            value;

    }

}




function addProject(
    data = {}
) {

    const container =
        document.getElementById(
            "projects-container"
        );


    if (!container) {
        return;
    }


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "dynamic-item project-item";


    item.innerHTML = `

        <div class="dynamic-item-header">

            <strong>
                Project
            </strong>

            <button
                type="button"
                class="remove-item"
            >
                Remove
            </button>

        </div>


        <div class="form-grid">


            <label>

                Project Name

                <input
                    type="text"
                    data-project-name
                    placeholder="e.g. SkillPulse"
                    value="${escapeAttribute(
                        data.name || ""
                    )}"
                >

            </label>


            <label>

                Technologies

                <input
                    type="text"
                    data-project-tech
                    placeholder="React, Node.js, MongoDB"
                    value="${escapeAttribute(
                        data.tech || ""
                    )}"
                >

            </label>


        </div>


        <label class="full-field">

            Description

            <textarea
                rows="3"
                data-project-description
                placeholder="Describe what you built and what you implemented."
            >${escapeHtml(
                data.description || ""
            )}</textarea>

        </label>


        <div class="form-grid">


            <label>

                GitHub URL

                <input
                    type="url"
                    data-project-github
                    placeholder="https://github.com/..."
                    value="${escapeAttribute(
                        data.github || ""
                    )}"
                >

            </label>


            <label>

                Live URL

                <input
                    type="url"
                    data-project-live
                    placeholder="https://..."
                    value="${escapeAttribute(
                        data.live || ""
                    )}"
                >

            </label>


        </div>

    `;


    container.appendChild(
        item
    );


    item
        .querySelector(
            ".remove-item"
        )
        .addEventListener(
            "click",
            function () {

                item.remove();

                updatePreview();

            }
        );

}




function addExperience(
    data = {}
) {

    const container =
        document.getElementById(
            "experience-container"
        );


    if (!container) {
        return;
    }


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "dynamic-item experience-item";


    item.innerHTML = `

        <div class="dynamic-item-header">

            <strong>
                Experience / Internship
            </strong>

            <button
                type="button"
                class="remove-item"
            >
                Remove
            </button>

        </div>


        <div class="form-grid">


            <label>

                Job Title

                <input
                    type="text"
                    data-experience-role
                    placeholder="Web Development Intern"
                    value="${escapeAttribute(
                        data.role || ""
                    )}"
                >

            </label>


            <label>

                Company

                <input
                    type="text"
                    data-experience-company
                    placeholder="Company name"
                    value="${escapeAttribute(
                        data.company || ""
                    )}"
                >

            </label>


            <label>

                Start Date

                <input
                    type="text"
                    data-experience-start
                    placeholder="Jun 2026"
                    value="${escapeAttribute(
                        data.start || ""
                    )}"
                >

            </label>


            <label>

                End Date

                <input
                    type="text"
                    data-experience-end
                    placeholder="Present"
                    value="${escapeAttribute(
                        data.end || ""
                    )}"
                >

            </label>


        </div>


        <label class="full-field">

            Responsibilities / Achievements

            <textarea
                rows="4"
                data-experience-description
                placeholder="Describe what you did. AI can help improve these bullets."
            >${escapeHtml(
                data.description || ""
            )}</textarea>

        </label>

    `;


    container.appendChild(
        item
    );


    item
        .querySelector(
            ".remove-item"
        )
        .addEventListener(
            "click",
            function () {

                item.remove();

                updatePreview();

            }
        );

}



/* =========================================================
   COLLECT RESUME DATA
========================================================= */

function collectResumeData() {

    const data = {};


    const form =
        document.getElementById(
            "resume-form"
        );


    const formData =
        new FormData(
            form
        );


    formData.forEach(
        function (
            value,
            key
        ) {

            data[key] =
                value;

        }
    );


    /* =====================================================
       SKILLS
    ===================================================== */

    data.skills =
        String(
            data.skills || ""
        )
        .split(",")
        .map(
            function (skill) {

                return skill.trim();

            }
        )
        .filter(
            Boolean
        );



    /* =====================================================
       PROJECTS
    ===================================================== */

    data.projects =
        Array.from(
            document.querySelectorAll(
                ".project-item"
            )
        )
        .map(
            function (item) {

                return {

                    name:
                        item
                            .querySelector(
                                "[data-project-name]"
                            )
                            ?.value
                            .trim() || "",


                    tech:
                        item
                            .querySelector(
                                "[data-project-tech]"
                            )
                            ?.value
                            .trim() || "",


                    description:
                        item
                            .querySelector(
                                "[data-project-description]"
                            )
                            ?.value
                            .trim() || "",


                    github:
                        item
                            .querySelector(
                                "[data-project-github]"
                            )
                            ?.value
                            .trim() || "",


                    live:
                        item
                            .querySelector(
                                "[data-project-live]"
                            )
                            ?.value
                            .trim() || ""

                };

            }
        )
        .filter(
            function (project) {

                return (
                    project.name ||
                    project.description
                );

            }
        );



    /* =====================================================
       EXPERIENCE
    ===================================================== */

    data.experience =
        Array.from(
            document.querySelectorAll(
                ".experience-item"
            )
        )
        .map(
            function (item) {

                return {

                    role:
                        item
                            .querySelector(
                                "[data-experience-role]"
                            )
                            ?.value
                            .trim() || "",


                    company:
                        item
                            .querySelector(
                                "[data-experience-company]"
                            )
                            ?.value
                            .trim() || "",


                    start:
                        item
                            .querySelector(
                                "[data-experience-start]"
                            )
                            ?.value
                            .trim() || "",


                    end:
                        item
                            .querySelector(
                                "[data-experience-end]"
                            )
                            ?.value
                            .trim() || "",


                    description:
                        item
                            .querySelector(
                                "[data-experience-description]"
                            )
                            ?.value
                            .trim() || ""

                };

            }
        )
        .filter(
            function (experience) {

                return (
                    experience.role ||
                    experience.company ||
                    experience.description
                );

            }
        );


    return data;

}



/* =========================================================
   LIVE PREVIEW
========================================================= */

function updatePreview() {

    const data =
        collectResumeData();


    setPreviewText(
        "preview-name",
        data.name ||
        "Your Name"
    );


    setPreviewText(
        "preview-role",
        data.role ||
        "Professional Role"
    );


    const contactParts = [

        data.email,
        data.phone,
        data.location

    ].filter(
        Boolean
    );


    setPreviewText(
        "preview-contact",

        contactParts.length
            ? contactParts.join(" · ")
            : "email@example.com · Phone · City"
    );


    /* =====================================================
       LINKS
    ===================================================== */

    const links =
        document.getElementById(
            "preview-links"
        );


    if (links) {

        links.innerHTML = "";


        [
            [
                "LinkedIn",
                data.linkedin
            ],

            [
                "GitHub",
                data.github
            ],

            [
                "Portfolio",
                data.portfolio
            ]

        ]
        .forEach(
            function (item) {

                const label =
                    item[0];

                const url =
                    item[1];


                if (!url) {
                    return;
                }


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    url;

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";

                link.textContent =
                    label;


                links.appendChild(
                    link
                );

            }
        );

    }



    /* =====================================================
       SUMMARY
    ===================================================== */

    setPreviewText(
        "preview-summary",
        data.summary ||
        "Add a professional summary to see it here."
    );



    /* =====================================================
       EDUCATION
    ===================================================== */

    setPreviewText(
        "preview-qualification",
        data.qualification ||
        "B.Tech"
    );


    setPreviewText(
        "preview-education-details",

        [
            data.degree,
            data.branch,
            data.college
        ]
        .filter(
            Boolean
        )
        .join(" · ") ||

        "Degree · Branch · College"
    );


    setPreviewText(
        "preview-graduation",
        data.graduationYear ||
        "2028"
    );


    setPreviewText(
        "preview-cgpa",

        data.cgpa
            ? `CGPA: ${data.cgpa}`
            : "CGPA: —"
    );



    /* =====================================================
       SKILLS
    ===================================================== */

    renderSkills(
        data.skills
    );



    /* =====================================================
       PROJECTS
    ===================================================== */

    renderProjects(
        data.projects
    );



    /* =====================================================
       EXPERIENCE
    ===================================================== */

    renderExperience(
        data.experience
    );


    const status =
        document.getElementById(
            "preview-status"
        );


    if (status) {

        status.textContent =
            "Live";

    }

}



/* =========================================================
   RENDER SKILLS
========================================================= */

function renderSkills(
    skills
) {

    const container =
        document.getElementById(
            "preview-skills"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!skills.length) {

        container.innerHTML = `
            <span class="document-skill">
                Add your skills
            </span>
        `;

        return;

    }


    skills.forEach(
        function (skill) {

            const span =
                document.createElement(
                    "span"
                );


            span.className =
                "document-skill";


            span.textContent =
                skill;


            container.appendChild(
                span
            );

        }
    );

}



/* =========================================================
   RENDER PROJECTS
========================================================= */

function renderProjects(
    projects
) {

    const container =
        document.getElementById(
            "preview-projects"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!projects.length) {

        container.innerHTML = `
            <p class="preview-empty">
                Add a project to display it here.
            </p>
        `;

        return;

    }


    projects.forEach(
        function (project) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "document-project";


            div.innerHTML = `

                <strong>
                    ${escapeHtml(
                        project.name ||
                        "Project"
                    )}
                </strong>


                ${
                    project.tech

                    ?

                    `
                    <div class="project-tech">
                        ${escapeHtml(
                            project.tech
                        )}
                    </div>
                    `

                    :

                    ""
                }


                <p>
                    ${escapeHtml(
                        project.description ||
                        "Project description"
                    )}
                </p>

            `;


            container.appendChild(
                div
            );

        }
    );

}



/* =========================================================
   RENDER EXPERIENCE
========================================================= */

function renderExperience(
    experiences
) {

    const container =
        document.getElementById(
            "preview-experience"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!experiences.length) {

        container.innerHTML = `
            <p class="preview-empty">
                Add experience, internship,
                or relevant work.
            </p>
        `;

        return;

    }


    experiences.forEach(
        function (experience) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "document-experience";


            const dates = [

                experience.start,
                experience.end

            ]
            .filter(
                Boolean
            )
            .join(" – ");


            div.innerHTML = `

                <strong>

                    ${escapeHtml(
                        experience.role ||
                        "Role"
                    )}

                    ${
                        experience.company

                        ?

                        ` · ${escapeHtml(
                            experience.company
                        )}`

                        :

                        ""
                    }

                </strong>


                ${
                    dates

                    ?

                    `
                    <div class="experience-meta">
                        ${escapeHtml(
                            dates
                        )}
                    </div>
                    `

                    :

                    ""
                }


                <p>
                    ${escapeHtml(
                        experience.description ||
                        "Experience description"
                    )}
                </p>

            `;


            container.appendChild(
                div
            );

        }
    );

}



/* =========================================================
   AI RESUME ANALYSIS
========================================================= */

async function analyzeResume() {

    const button =
        document.getElementById(
            "analyze-resume-btn"
        );


    const data =
        collectResumeData();


    const bullets =
        createResumeBullets(
            data
        );


    if (!bullets.length) {

        alert(
            "Add at least one project or experience description before analyzing."
        );

        return;

    }


    button.disabled =
        true;


    button.textContent =
        "✨ Analyzing...";


    try {


        /* =================================================
           FASTAPI RESUME AI
        ================================================= */

        const response =
            await fetch(
                "http://localhost:8000/api/resume/improve-and-predict-score",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            resume_bullet_points:
                                bullets
                        })

                }
            );


        if (!response.ok) {

            throw new Error(
                `AI server returned ${response.status}`
            );

        }


        const result =
            await response.json();


        displayAIResult(
            result
        );


        /* =================================================
           SKILL GAP
        ================================================= */

        await loadSkillGapRecommendations(
            data
        );


    } catch (error) {

        console.error(
            "Resume AI error:",
            error
        );


        showAIError(
            "AI server is not running. Start your FastAPI server on port 8000."
        );

    } finally {

        button.disabled =
            false;


        button.textContent =
            "✨ Analyze with AI";

    }

}



/* =========================================================
   CREATE RESUME BULLETS
========================================================= */

function createResumeBullets(
    data
) {

    const bullets = [];


    data.projects.forEach(
        function (project) {

            if (
                project.description
            ) {

                bullets.push(
                    project.description
                );

            }

        }
    );


    data.experience.forEach(
        function (experience) {

            if (
                experience.description
            ) {

                const parts =
                    experience.description
                        .split(
                            /\n|•|;/
                        )
                        .map(
                            function (item) {

                                return item.trim();

                            }
                        )
                        .filter(
                            Boolean
                        );


                bullets.push(
                    ...parts
                );

            }

        }
    );


    if (
        data.summary &&
        data.summary.trim()
    ) {

        bullets.push(
            data.summary.trim()
        );

    }


    return bullets;

}



/* =========================================================
   DISPLAY AI RESULT
========================================================= */

function displayAIResult(
    result
) {

    const scoreElement =
        document.querySelector(
            "#ats-score strong"
        );


    if (scoreElement) {

        const score =
            String(
                result.predicted_ats_score ||
                "—"
            )
            .split("/")
            .at(0)
            .trim();


        scoreElement.textContent =
            score;

    }


    const feedback =
        document.getElementById(
            "resume-feedback"
        );


    if (!feedback) {
        return;
    }


    const improved =
        result.improved_resume_points ||
        [];


    if (!improved.length) {

        feedback.innerHTML = `

            <div class="analysis-empty">

                No AI feedback returned.

            </div>

        `;

        return;

    }


    feedback.innerHTML = `

        <ul class="feedback-list">

            ${
                improved
                    .map(
                        function (item) {

                            return `

                                <li>

                                    <strong>
                                        Original:
                                    </strong>

                                    ${escapeHtml(
                                        item.original_line ||
                                        ""
                                    )}

                                    <br>

                                    <strong>
                                        Suggestion:
                                    </strong>

                                    ${escapeHtml(
                                        item.improved_star_format ||
                                        ""
                                    )}

                                </li>

                            `;

                        }
                    )
                    .join("")
            }

        </ul>

    `;

}



/* =========================================================
   SKILL GAP
========================================================= */

async function loadSkillGapRecommendations(
    data
) {

    const skills =
        data.skills ||
        [];


    const skillGapContainer =
        document.getElementById(
            "skill-gap-list"
        );


    try {


        /*
         * This endpoint will be added
         * to AI_Portion.py.
         */

        const response =
            await fetch(
                "http://localhost:8000/api/skill-gap/analyze",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            skills:
                                skills,

                            target_role:
                                data.role || ""

                        })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Skill gap endpoint unavailable"
            );

        }


        const result =
            await response.json();


        renderSkillGap(
            result.missing_skills ||
            []
        );


        renderLearningRecommendations(
            result.recommendations ||
            []
        );


    } catch (error) {


        /*
         * Temporary fallback.
         *
         * Later this will be replaced
         * by your real AI engine.
         */

        const requiredSkills =
            getBaselineSkills(
                data.role
            );


        const missing =
            requiredSkills.filter(
                function (requiredSkill) {

                    return !skills.some(
                        function (userSkill) {

                            return normalizeSkill(
                                userSkill
                            )
                            .includes(
                                normalizeSkill(
                                    requiredSkill
                                )
                            );

                        }
                    );

                }
            );


        renderSkillGap(
            missing
        );


        renderLearningRecommendations(
            createFreeLearningLinks(
                missing
            )
        );

    }

}



/* =========================================================
   ROLE SKILL BASELINE
========================================================= */

function getBaselineSkills(
    role
) {

    const roleText =
        String(
            role || ""
        )
        .toLowerCase();


    if (
        roleText.includes("machine") ||
        roleText.includes("ai") ||
        roleText.includes("ml")
    ) {

        return [

            "Python",
            "NumPy",
            "Pandas",
            "Machine Learning",
            "Scikit-learn",
            "SQL",
            "Git"

        ];

    }


    if (
        roleText.includes("data")
    ) {

        return [

            "Python",
            "SQL",
            "Excel",
            "Pandas",
            "Power BI",
            "Statistics"

        ];

    }


    if (
        roleText.includes("frontend")
    ) {

        return [

            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Git"

        ];

    }


    if (
        roleText.includes("backend")
    ) {

        return [

            "JavaScript",
            "Node.js",
            "Express",
            "SQL",
            "MongoDB",
            "REST API",
            "Git"

        ];

    }


    return [

        "JavaScript",
        "HTML",
        "CSS",
        "Git",
        "SQL"

    ];

}



/* =========================================================
   RENDER SKILL GAP
========================================================= */

function renderSkillGap(
    missingSkills
) {

    const container =
        document.getElementById(
            "skill-gap-list"
        );


    if (!container) {
        return;
    }


    if (!missingSkills.length) {

        container.innerHTML = `

            <div class="analysis-empty">

                🎉 No major skill gap detected
                for this target role.

            </div>

        `;

        return;

    }


    container.innerHTML =
        missingSkills
            .map(
                function (skill) {

                    return `

                        <div class="gap-item">

                            <span class="gap-skill">

                                ${escapeHtml(
                                    skill
                                )}

                            </span>


                            <span class="gap-label">

                                LEARN NEXT

                            </span>

                        </div>

                    `;

                }
            )
            .join("");

}



/* =========================================================
   FREE LEARNING LINKS
========================================================= */

function createFreeLearningLinks(
    missingSkills
) {

    const resources = [];


    missingSkills.forEach(
        function (skill) {


            const youtubeQuery =
                encodeURIComponent(
                    `${skill} full course free`
                );


            const webQuery =
                encodeURIComponent(
                    `${skill} free course tutorial`
                );


            resources.push({

                skill:
                    skill,

                title:
                    `${skill} Full Course`,

                provider:
                    "YouTube",

                description:
                    `Find free ${skill} full courses and tutorials.`,

                url:
                    `https://www.youtube.com/results?search_query=${youtubeQuery}`

            });


            resources.push({

                skill:
                    skill,

                title:
                    `${skill} Free Tutorials`,

                provider:
                    "Web Search",

                description:
                    `Find free ${skill} tutorials, documentation and courses.`,

                url:
                    `https://www.google.com/search?q=${webQuery}`

            });

        }
    );


    return resources;

}



/* =========================================================
   RENDER LEARNING RECOMMENDATIONS
========================================================= */

function renderLearningRecommendations(
    recommendations
) {

    const container =
        document.getElementById(
            "learning-recommendations"
        );


    if (!container) {
        return;
    }


    if (!recommendations.length) {

        container.innerHTML = `

            <div class="analysis-empty learning-empty">

                No learning recommendations available yet.

            </div>

        `;

        return;

    }


    container.innerHTML =
        recommendations
            .slice(
                0,
                9
            )
            .map(
                function (item) {


                    const provider =
                        item.provider ||
                        item.source ||
                        "Learning";


                    const title =
                        item.title ||
                        item.course_or_video_title ||
                        "Learning Resource";


                    const description =
                        item.description ||
                        `Learn ${
                            item.skill ||
                            "this skill"
                        } with a guided resource.`;


                    const url =
                        item.url ||
                        item.direct_url ||
                        "#";


                    return `

                        <article
                            class="learning-card"
                        >

                            <span
                                class="learning-source"
                            >

                                ${escapeHtml(
                                    provider
                                )}

                            </span>


                            <h3>

                                ${escapeHtml(
                                    title
                                )}

                            </h3>


                            <p>

                                ${escapeHtml(
                                    description
                                )}

                            </p>


                            <a
                                href="${escapeAttribute(
                                    url
                                )}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >

                                Start Learning →

                            </a>

                        </article>

                    `;

                }
            )
            .join("");

}



/* =========================================================
   ERROR
========================================================= */

function showAIError(
    message
) {

    const feedback =
        document.getElementById(
            "resume-feedback"
        );


    if (feedback) {

        feedback.innerHTML = `

            <div class="analysis-empty">

                ${escapeHtml(
                    message
                )}

            </div>

        `;

    }

}



/* =========================================================
   HELPERS
========================================================= */

function setPreviewText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;

    }

}


function normalizeSkill(
    value
) {

    return String(
        value || ""
    )
    .toLowerCase()
    .replace(
        /[.\-_]/g,
        ""
    )
    .replace(
        /\s+/g,
        ""
    );

}


function escapeHtml(
    value
) {

    return String(
        value || ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}


function escapeAttribute(
    value
) {

    return escapeHtml(
        value
    );

}