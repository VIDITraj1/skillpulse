document.addEventListener("DOMContentLoaded", () => {



    const careerRole =
        document.getElementById("careerRole");

    const roadmapTrack =
        document.getElementById("roadmapTrack");

    const currentGoal =
        document.getElementById("currentGoal");

    const progressPercentage =
        document.getElementById("progressPercentage");

    const completedStages =
        document.getElementById("completedStages");

    const estimatedTime =
        document.getElementById("estimatedTime");

    const progressFill =
        document.getElementById("progressFill");

    const progressText =
        document.getElementById("progressText");

    const nextSteps =
        document.getElementById("nextSteps");

    const stageDetails =
        document.getElementById("stageDetails");

    const resetProgress =
        document.getElementById("resetProgress");




    let user = null;

    try {

        user =
            JSON.parse(
                localStorage.getItem(
                    "skillpulseUser"
                )
            );

    } catch (error) {

        user = null;

    }


    const roadmaps = {

        fullstack: {

            title:
                "Full Stack Developer",

            time:
                "6–9 months",

            stages: [

                {
                    title: "HTML",
                    icon: "🌐",
                    description:
                        "Learn how websites are structured using semantic HTML.",
                    skills:
                        ["HTML5", "Semantic HTML", "Forms", "Accessibility"],
                    time: "1–2 weeks"
                },

                {
                    title: "CSS",
                    icon: "🎨",
                    description:
                        "Build responsive and visually polished web interfaces.",
                    skills:
                        ["CSS3", "Flexbox", "Grid", "Responsive Design"],
                    time: "2–3 weeks"
                },

                {
                    title: "JavaScript",
                    icon: "JS",
                    description:
                        "Master the core programming concepts required for modern web development.",
                    skills:
                        ["ES6+", "DOM", "Async JS", "APIs"],
                    time: "4–6 weeks"
                },

                {
                    title: "React",
                    icon: "⚛️",
                    description:
                        "Build reusable component-based frontend applications.",
                    skills:
                        ["Components", "Hooks", "State", "React Router"],
                    time: "4–6 weeks"
                },

                {
                    title: "Node.js",
                    icon: "⬢",
                    description:
                        "Learn server-side JavaScript and build backend services.",
                    skills:
                        ["Node.js", "Express", "Middleware", "REST"],
                    time: "3–4 weeks"
                },

                {
                    title: "Database",
                    icon: "🗄️",
                    description:
                        "Store and manage application data using databases.",
                    skills:
                        ["MongoDB", "Mongoose", "SQL", "CRUD"],
                    time: "2–3 weeks"
                },

                {
                    title: "REST API",
                    icon: "🔗",
                    description:
                        "Connect frontend and backend applications through APIs.",
                    skills:
                        ["REST", "HTTP", "Authentication", "JWT"],
                    time: "2–3 weeks"
                },

                {
                    title: "Projects",
                    icon: "📁",
                    description:
                        "Build real-world projects that demonstrate your development skills.",
                    skills:
                        ["Portfolio", "Full Stack App", "GitHub", "Deployment"],
                    time: "4–6 weeks"
                },

                {
                    title: "Internship",
                    icon: "💼",
                    description:
                        "Start applying your skills to internships and real-world opportunities.",
                    skills:
                        ["Resume", "Applications", "Networking", "Interview"],
                    time: "Ongoing"
                },

                {
                    title: "Job",
                    icon: "🎯",
                    description:
                        "Prepare for technical interviews and full-time developer roles.",
                    skills:
                        ["DSA", "Projects", "System Basics", "Interview"],
                    time: "Ongoing"
                }

            ]

        },


        frontend: {

            title:
                "Frontend Developer",

            time:
                "4–6 months",

            stages: [

                {
                    title: "HTML",
                    icon: "🌐",
                    description:
                        "Build semantic and accessible webpage structures.",
                    skills:
                        ["HTML5", "Semantic HTML", "Forms"],
                    time: "1–2 weeks"
                },

                {
                    title: "CSS",
                    icon: "🎨",
                    description:
                        "Create responsive and modern user interfaces.",
                    skills:
                        ["CSS", "Flexbox", "Grid", "Responsive Design"],
                    time: "2–3 weeks"
                },

                {
                    title: "JavaScript",
                    icon: "JS",
                    description:
                        "Learn programming fundamentals and browser APIs.",
                    skills:
                        ["ES6", "DOM", "Async JS", "Fetch API"],
                    time: "4–6 weeks"
                },

                {
                    title: "React",
                    icon: "⚛️",
                    description:
                        "Build scalable component-based applications.",
                    skills:
                        ["React", "Hooks", "State", "Router"],
                    time: "4–6 weeks"
                },

                {
                    title: "Projects",
                    icon: "📁",
                    description:
                        "Build projects to demonstrate your frontend skills.",
                    skills:
                        ["Portfolio", "Dashboard", "Web App"],
                    time: "3–4 weeks"
                },

                {
                    title: "Deployment",
                    icon: "🚀",
                    description:
                        "Deploy your applications and make them publicly accessible.",
                    skills:
                        ["Git", "GitHub", "Vercel", "Netlify"],
                    time: "1–2 weeks"
                },

                {
                    title: "Internship",
                    icon: "💼",
                    description:
                        "Apply your skills to frontend internships.",
                    skills:
                        ["Resume", "Applications", "Interview"],
                    time: "Ongoing"
                },

                {
                    title: "Job",
                    icon: "🎯",
                    description:
                        "Prepare for frontend developer interviews.",
                    skills:
                        ["JavaScript", "React", "Projects"],
                    time: "Ongoing"
                }

            ]

        },


        backend: {

            title:
                "Backend Developer",

            time:
                "5–7 months",

            stages: [

                {
                    title: "Programming",
                    icon: "💻",
                    description:
                        "Build strong programming fundamentals.",
                    skills:
                        ["JavaScript", "Python", "Programming"],
                    time: "3–4 weeks"
                },

                {
                    title: "Node.js",
                    icon: "⬢",
                    description:
                        "Learn server-side JavaScript.",
                    skills:
                        ["Node.js", "NPM", "Modules"],
                    time: "2–3 weeks"
                },

                {
                    title: "Express",
                    icon: "🚂",
                    description:
                        "Create backend applications and APIs.",
                    skills:
                        ["Express", "Middleware", "Routing"],
                    time: "2–3 weeks"
                },

                {
                    title: "Database",
                    icon: "🗄️",
                    description:
                        "Learn how applications store and retrieve data.",
                    skills:
                        ["MongoDB", "SQL", "Mongoose"],
                    time: "3–4 weeks"
                },

                {
                    title: "REST API",
                    icon: "🔗",
                    description:
                        "Design and build production-ready APIs.",
                    skills:
                        ["REST", "HTTP", "JSON", "Authentication"],
                    time: "2–3 weeks"
                },

                {
                    title: "Security",
                    icon: "🔐",
                    description:
                        "Protect backend applications and user data.",
                    skills:
                        ["JWT", "Hashing", "CORS", "Validation"],
                    time: "2 weeks"
                },

                {
                    title: "Projects",
                    icon: "📁",
                    description:
                        "Build backend-heavy applications.",
                    skills:
                        ["API", "Database", "Authentication"],
                    time: "4–6 weeks"
                },

                {
                    title: "Job",
                    icon: "🎯",
                    description:
                        "Prepare for backend developer roles.",
                    skills:
                        ["Projects", "Interview", "System Design"],
                    time: "Ongoing"
                }

            ]

        },


        aiml: {

            title:
                "AI / ML Engineer",

            time:
                "7–12 months",

            stages: [

                {
                    title: "Python",
                    icon: "🐍",
                    description:
                        "Build strong Python programming fundamentals.",
                    skills:
                        ["Python", "Functions", "OOP", "Libraries"],
                    time: "3–4 weeks"
                },

                {
                    title: "Mathematics",
                    icon: "📐",
                    description:
                        "Learn the mathematics used in machine learning.",
                    skills:
                        ["Statistics", "Probability", "Linear Algebra"],
                    time: "4–6 weeks"
                },

                {
                    title: "Data Analysis",
                    icon: "📊",
                    description:
                        "Learn how to clean and analyze datasets.",
                    skills:
                        ["Pandas", "NumPy", "Visualization"],
                    time: "3–4 weeks"
                },

                {
                    title: "Machine Learning",
                    icon: "🤖",
                    description:
                        "Build predictive models using machine learning.",
                    skills:
                        ["Scikit-learn", "Regression", "Classification"],
                    time: "5–7 weeks"
                },

                {
                    title: "Deep Learning",
                    icon: "🧠",
                    description:
                        "Learn neural networks and deep learning.",
                    skills:
                        ["Neural Networks", "PyTorch", "TensorFlow"],
                    time: "5–8 weeks"
                },

                {
                    title: "Projects",
                    icon: "📁",
                    description:
                        "Build machine learning projects for your portfolio.",
                    skills:
                        ["ML Project", "Deployment", "GitHub"],
                    time: "4–6 weeks"
                },

                {
                    title: "Internship",
                    icon: "💼",
                    description:
                        "Apply for AI and machine learning internships.",
                    skills:
                        ["Resume", "Portfolio", "Interview"],
                    time: "Ongoing"
                },

                {
                    title: "Job",
                    icon: "🎯",
                    description:
                        "Prepare for AI/ML engineering positions.",
                    skills:
                        ["ML", "Projects", "Interview"],
                    time: "Ongoing"
                }

            ]

        },


        data: {

            title:
                "Data Analyst",

            time:
                "4–6 months",

            stages: [

                {
                    title: "Excel",
                    icon: "📊",
                    description:
                        "Learn spreadsheet analysis and data cleaning.",
                    skills:
                        ["Excel", "Formulas", "Pivot Tables"],
                    time: "2–3 weeks"
                },

                {
                    title: "SQL",
                    icon: "🗄️",
                    description:
                        "Query and analyze relational databases.",
                    skills:
                        ["SQL", "Joins", "Aggregation"],
                    time: "3–4 weeks"
                },

                {
                    title: "Python",
                    icon: "🐍",
                    description:
                        "Use Python for data analysis.",
                    skills:
                        ["Python", "Pandas", "NumPy"],
                    time: "3–4 weeks"
                },

                {
                    title: "Visualization",
                    icon: "📈",
                    description:
                        "Turn datasets into useful visual insights.",
                    skills:
                        ["Power BI", "Charts", "Dashboards"],
                    time: "3–4 weeks"
                },

                {
                    title: "Statistics",
                    icon: "📐",
                    description:
                        "Understand statistical concepts for analysis.",
                    skills:
                        ["Statistics", "Probability", "Analysis"],
                    time: "3–4 weeks"
                },

                {
                    title: "Projects",
                    icon: "📁",
                    description:
                        "Create portfolio projects using real datasets.",
                    skills:
                        ["Dashboard", "Data Analysis", "GitHub"],
                    time: "3–4 weeks"
                },

                {
                    title: "Job",
                    icon: "🎯",
                    description:
                        "Prepare for data analyst interviews.",
                    skills:
                        ["SQL", "Excel", "Projects"],
                    time: "Ongoing"
                }

            ]

        },


        devops: {

            title:
                "DevOps Engineer",

            time:
                "6–9 months",

            stages: [

                {
                    title: "Linux",
                    icon: "🐧",
                    description:
                        "Learn Linux fundamentals and command-line tools.",
                    skills:
                        ["Linux", "Bash", "CLI"],
                    time: "3–4 weeks"
                },

                {
                    title: "Git",
                    icon: "🔀",
                    description:
                        "Learn version control and collaboration workflows.",
                    skills:
                        ["Git", "GitHub", "Branches"],
                    time: "1–2 weeks"
                },

                {
                    title: "Docker",
                    icon: "🐳",
                    description:
                        "Containerize applications and services.",
                    skills:
                        ["Docker", "Images", "Containers"],
                    time: "2–3 weeks"
                },

                {
                    title: "CI/CD",
                    icon: "⚙️",
                    description:
                        "Automate testing and application deployment.",
                    skills:
                        ["GitHub Actions", "CI", "CD"],
                    time: "2–3 weeks"
                },

                {
                    title: "Cloud",
                    icon: "☁️",
                    description:
                        "Learn cloud infrastructure and deployment.",
                    skills:
                        ["AWS", "Azure", "Google Cloud"],
                    time: "4–6 weeks"
                },

                {
                    title: "Kubernetes",
                    icon: "☸️",
                    description:
                        "Manage containerized applications at scale.",
                    skills:
                        ["Kubernetes", "Pods", "Services"],
                    time: "4–6 weeks"
                },

                {
                    title: "Projects",
                    icon: "📁",
                    description:
                        "Build deployment and infrastructure projects.",
                    skills:
                        ["Docker", "CI/CD", "Cloud"],
                    time: "4–6 weeks"
                },

                {
                    title: "Job",
                    icon: "🎯",
                    description:
                        "Prepare for DevOps engineering roles.",
                    skills:
                        ["Cloud", "Docker", "Linux"],
                    time: "Ongoing"
                }

            ]

        }

    };




    function getStorageKey(role) {

        return `skillpulseRoadmap_${role}`;

    }




    function getProgress(role) {

        try {

            return JSON.parse(
                localStorage.getItem(
                    getStorageKey(role)
                )
            ) || [];

        } catch (error) {

            return [];

        }

    }


    /* =====================================================
       SAVE PROGRESS
       ===================================================== */

    function saveProgress(
        role,
        completed
    ) {

        localStorage.setItem(
            getStorageKey(role),
            JSON.stringify(completed)
        );

    }


    /* =====================================================
       CURRENT ROLE
       ===================================================== */

    function getCurrentRole() {

        return careerRole.value;

    }


   

    function renderRoadmap() {

        const role =
            getCurrentRole();

        const roadmap =
            roadmaps[role];

        if (!roadmap) {
            return;
        }


        const completed =
            getProgress(role);


        currentGoal.textContent =
            roadmap.title;

        estimatedTime.textContent =
            roadmap.time;


        roadmapTrack.innerHTML = "";


        roadmap.stages.forEach(
            (stage, index) => {

                const isCompleted =
                    completed.includes(index);

                const isCurrent =
                    !isCompleted &&
                    completed.length === index;


                const node =
                    document.createElement(
                        "div"
                    );

                node.className =
                    "roadmap-node";


                if (isCompleted) {

                    node.classList.add(
                        "completed"
                    );

                }


                if (isCurrent) {

                    node.classList.add(
                        "current"
                    );

                }


                node.innerHTML = `

                    <button
                        class="roadmap-node__circle"
                        type="button"
                        data-stage="${index}"
                    >
                        ${
                            isCompleted
                                ? "✓"
                                : stage.icon
                        }
                    </button>

                    <div class="roadmap-node__title">
                        ${stage.title}
                    </div>

                    <div class="roadmap-node__status">
                        ${
                            isCompleted
                                ? "Completed"
                                : isCurrent
                                    ? "Current"
                                    : "Upcoming"
                        }
                    </div>

                `;


                roadmapTrack.appendChild(
                    node
                );


                if (
                    index <
                    roadmap.stages.length - 1
                ) {

                    const connector =
                        document.createElement(
                            "div"
                        );

                    connector.className =
                        "roadmap-connector";


                    if (
                        completed.includes(index)
                    ) {

                        connector.classList.add(
                            "completed"
                        );

                    }


                    roadmapTrack.appendChild(
                        connector
                    );

                }

            }
        );


        updateProgress(
            roadmap,
            completed
        );

        renderNextSteps(
            roadmap,
            completed
        );

        attachStageEvents();

    }


    /* =====================================================
       UPDATE PROGRESS
       ===================================================== */

    function updateProgress(
        roadmap,
        completed
    ) {

        const total =
            roadmap.stages.length;

        const completedCount =
            completed.length;

        const percentage =
            Math.round(
                (completedCount / total) * 100
            );


        progressPercentage.textContent =
            `${percentage}%`;


        completedStages.textContent =
            `${completedCount} / ${total}`;


        progressFill.style.width =
            `${percentage}%`;


        if (percentage === 0) {

            progressText.textContent =
                "Start your journey today.";

        } else if (percentage < 50) {

            progressText.textContent =
                "Good start. Keep building your skills.";

        } else if (percentage < 100) {

            progressText.textContent =
                "You're making great progress.";

        } else {

            progressText.textContent =
                "Roadmap completed. You're ready for the next challenge!";

        }

    }


    /* =====================================================
       STAGE EVENTS
       ===================================================== */

    function attachStageEvents() {

        document
            .querySelectorAll(
                ".roadmap-node__circle"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.stage
                            );

                        showStageDetails(
                            index
                        );

                    }
                );

            });

    }



    function showStageDetails(index) {

        const role =
            getCurrentRole();

        const roadmap =
            roadmaps[role];

        const stage =
            roadmap.stages[index];

        if (!stage) {
            return;
        }


        const completed =
            getProgress(role);

        const isCompleted =
            completed.includes(index);


        stageDetails.innerHTML = `

            <div class="stage-detail">

                <span class="stage-detail__eyebrow">
                    STAGE ${index + 1}
                </span>

                <h2>
                    ${stage.icon}
                    ${stage.title}
                </h2>

                <p>
                    ${stage.description}
                </p>

                <div class="stage-detail__skills">

                    ${stage.skills
                        .map(
                            skill => `
                                <span
                                    class="stage-detail__skill"
                                >
                                    ${skill}
                                </span>
                            `
                        )
                        .join("")
                    }

                </div>

                <p>
                    <strong>
                        Estimated time:
                    </strong>

                    ${stage.time}
                </p>

                <button
                    class="complete-stage-btn
                    ${isCompleted ? "completed" : ""}"
                    id="completeStage"
                    type="button"
                >

                    ${
                        isCompleted
                            ? "✓ Completed"
                            : "Mark as Completed"
                    }

                </button>

            </div>

        `;


        document
            .getElementById(
                "completeStage"
            )
            ?.addEventListener(
                "click",
                () => {

                    toggleStage(
                        index
                    );

                }
            );

    }


    /* =====================================================
       COMPLETE / UNCOMPLETE STAGE
       ===================================================== */

    function toggleStage(index) {

        const role =
            getCurrentRole();

        let completed =
            getProgress(role);


        if (
            completed.includes(index)
        ) {

            completed =
                completed.filter(
                    item =>
                        item !== index
                );

            showToast(
                "Stage marked as incomplete."
            );

        } else {

            completed.push(
                index
            );

            completed.sort(
                (a, b) => a - b
            );

            showToast(
                "Stage completed! 🎉"
            );

        }


        saveProgress(
            role,
            completed
        );


        renderRoadmap();


        showStageDetails(
            index
        );

    }


    /* =====================================================
       NEXT STEPS
       ===================================================== */

    function renderNextSteps(
        roadmap,
        completed
    ) {

        const nextIndexes =
            roadmap.stages
                .map(
                    (_, index) =>
                        index
                )
                .filter(
                    index =>
                        !completed.includes(index)
                )
                .slice(0, 3);


        if (!nextIndexes.length) {

            nextSteps.innerHTML = `

                <div class="empty-state">

                    <div class="empty-state__icon">
                        🎉
                    </div>

                    <h3>
                        Roadmap completed!
                    </h3>

                    <p>
                        Great work. Continue building projects
                        and applying for opportunities.
                    </p>

                </div>

            `;

            return;

        }


        nextSteps.innerHTML =
            nextIndexes
                .map(
                    (index, position) => {

                        const stage =
                            roadmap.stages[index];

                        return `

                            <div
                                class="next-step"
                                data-next-stage="${index}"
                            >

                                <div class="next-step__number">
                                    ${position + 1}
                                </div>

                                <div class="next-step__content">

                                    <strong>
                                        ${stage.title}
                                    </strong>

                                    <span>
                                        ${stage.time}
                                    </span>

                                </div>

                                <span
                                    class="next-step__arrow"
                                >
                                    →
                                </span>

                            </div>

                        `;

                    }
                )
                .join("");


        document
            .querySelectorAll(
                ".next-step"
            )
            .forEach(step => {

                step.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                step.dataset.nextStage
                            );

                        showStageDetails(
                            index
                        );

                    }
                );

            });

    }


    /* =====================================================
       ROLE CHANGE
       ===================================================== */

    careerRole?.addEventListener(
        "change",
        () => {

            renderRoadmap();

            stageDetails.innerHTML = `

                <div class="stage-details__empty">

                    <div>
                        🧭
                    </div>

                    <h3>
                        Select a roadmap stage
                    </h3>

                    <p>
                        Click any stage above to see
                        what you need to learn and build.
                    </p>

                </div>

            `;

        }
    );


    /* =====================================================
       RESET
       ===================================================== */

    resetProgress?.addEventListener(
        "click",
        () => {

            const role =
                getCurrentRole();

            const confirmed =
                confirm(
                    "Reset your progress for this career roadmap?"
                );

            if (!confirmed) {
                return;
            }

            localStorage.removeItem(
                getStorageKey(role)
            );

            renderRoadmap();

            showToast(
                "Roadmap progress has been reset."
            );

        }
    );


    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(message) {

        let toast =
            document.querySelector(
                ".roadmap-toast"
            );


        if (!toast) {

            toast =
                document.createElement(
                    "div"
                );

            toast.className =
                "roadmap-toast";

            document.body.appendChild(
                toast
            );

        }


        toast.textContent =
            message;

        toast.classList.add(
            "show"
        );


        clearTimeout(
            toast.timeout
        );


        toast.timeout =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "show"
                    );

                },
                2200
            );

    }


    /* =====================================================
       ADD TOAST CSS
       ===================================================== */

    const toastStyle =
        document.createElement(
            "style"
        );

    toastStyle.textContent = `

        .roadmap-toast {

            position: fixed;
            right: 25px;
            bottom: 25px;
            z-index: 9999;

            background: #24211f;
            color: white;

            padding: 11px 17px;

            border-radius: 10px;

            font-size: 0.75rem;

            box-shadow:
                0 12px 30px
                rgba(0,0,0,0.2);

            opacity: 0;

            transform:
                translateY(10px);

            pointer-events: none;

            transition:
                all 0.25s ease;
        }

        .roadmap-toast.show {

            opacity: 1;

            transform:
                translateY(0);
        }

    `;

    document.head.appendChild(
        toastStyle
    );




    renderRoadmap();

});