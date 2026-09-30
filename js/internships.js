document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchInput =
            document.getElementById(
                "internshipSearch"
            );

        const searchButton =
            document.getElementById(
                "internshipSearchBtn"
            );

        const jobList =
            document.getElementById(
                "jobList"
            );

        const loading =
            document.getElementById(
                "jobsLoading"
            );

        const empty =
            document.getElementById(
                "jobsEmpty"
            );

        const subtitle =
            document.getElementById(
                "resultsSubtitle"
            );

        const locationFilter =
            document.getElementById(
                "locationFilter"
            );

        const clearFilters =
            document.getElementById(
                "clearFilters"
            );

        const sortJobs =
            document.getElementById(
                "sortJobs"
            );


        let currentJobs = [];




        searchJobs("");



        searchButton.addEventListener(
            "click",
            function () {

                searchJobs(
                    searchInput.value.trim()
                );

            }
        );




        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    searchJobs(
                        searchInput.value.trim()
                    );

                }

            }
        );




        document
            .querySelectorAll(".popular-search")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const value =
                            button.dataset.search;

                        searchInput.value =
                            value;

                        searchJobs(value);

                    }
                );

            });




        locationFilter.addEventListener(
            "input",
            applyFilters
        );


        document
            .querySelectorAll(
                ".work-mode-filter"
            )
            .forEach(function (checkbox) {

                checkbox.addEventListener(
                    "change",
                    applyFilters
                );

            });


        document
            .querySelectorAll(
                ".source-filter"
            )
            .forEach(function (checkbox) {

                checkbox.addEventListener(
                    "change",
                    applyFilters
                );

            });




        clearFilters.addEventListener(
            "click",
            function () {

                locationFilter.value = "";

                document
                    .querySelectorAll(
                        ".work-mode-filter, .source-filter"
                    )
                    .forEach(function (checkbox) {

                        checkbox.checked = false;

                    });

                applyFilters();

            }
        );




        sortJobs.addEventListener(
            "change",
            function () {

                renderJobs(
                    sortCurrentJobs(
                        currentJobs
                    )
                );

            }
        );




        async function searchJobs(query) {

            showLoading();


            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/internships/search?q=" +
                        encodeURIComponent(query)
                    );


                if (!response.ok) {

                    throw new Error(
                        "Unable to load internships."
                    );

                }


                const data =
                    await response.json();


                currentJobs =
                    data.jobs || [];


                subtitle.textContent =
                    `${data.total} opportunities found`;


                renderJobs(
                    sortCurrentJobs(
                        currentJobs
                    )
                );


            } catch (error) {

                console.error(
                    "Internship search error:",
                    error
                );


                loading.style.display =
                    "none";

                jobList.innerHTML = "";

                empty.style.display =
                    "block";

                empty.querySelector("h3")
                    .textContent =
                    "Unable to load opportunities";

                empty.querySelector("p")
                    .textContent =
                    "Make sure your SkillPulse backend is running.";

            }

        }




        function applyFilters() {

            let filtered =
                [...currentJobs];


            const location =
                locationFilter.value
                    .trim()
                    .toLowerCase();


            if (location) {

                filtered =
                    filtered.filter(
                        function (job) {

                            return (
                                job.location &&
                                job.location
                                    .toLowerCase()
                                    .includes(location)
                            );

                        }
                    );

            }


            const selectedModes =
                Array.from(
                    document.querySelectorAll(
                        ".work-mode-filter:checked"
                    )
                ).map(
                    checkbox =>
                        checkbox.value
                );


            if (selectedModes.length > 0) {

                filtered =
                    filtered.filter(
                        function (job) {

                            const text =
                                `${job.title} ${job.location}`
                                    .toLowerCase();


                            return selectedModes.some(
                                function (mode) {

                                    return text.includes(
                                        mode
                                    );

                                }
                            );

                        }
                    );

            }


            const selectedSources =
                Array.from(
                    document.querySelectorAll(
                        ".source-filter:checked"
                    )
                ).map(
                    checkbox =>
                        checkbox.value
                );


            if (selectedSources.length > 0) {

                filtered =
                    filtered.filter(
                        function (job) {

                            return selectedSources
                                .includes(
                                    job.source
                                );

                        }
                    );

            }


            subtitle.textContent =
                `${filtered.length} opportunities found`;


            renderJobs(
                sortCurrentJobs(filtered)
            );

        }




        function sortCurrentJobs(jobs) {

            const sorted =
                [...jobs];


            if (
                sortJobs.value ===
                "company"
            ) {

                sorted.sort(
                    function (a, b) {

                        return (
                            a.company || ""
                        ).localeCompare(
                            b.company || ""
                        );

                    }
                );

            }


            if (
                sortJobs.value ===
                "match"
            ) {

                sorted.sort(
                    function (a, b) {

                        return (
                            Number(b.matchScore || 0) -
                            Number(a.matchScore || 0)
                        );

                    }
                );

            }


            return sorted;

        }




        function renderJobs(jobs) {

            loading.style.display =
                "none";


            if (!jobs.length) {

                jobList.innerHTML = "";

                empty.style.display =
                    "block";

                return;

            }


            empty.style.display =
                "none";


            jobList.innerHTML =
                jobs.map(
                    createJobCard
                ).join("");


            document
                .querySelectorAll(
                    ".apply-button"
                )
                .forEach(function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const url =
                                button.dataset.url;

                            if (url) {

                                window.open(
                                    url,
                                    "_blank"
                                );

                            }

                        }
                    );

                });

        }




        function createJobCard(job) {

            const company =
                job.company ||
                "Company";


            const title =
                job.title ||
                "Internship Opportunity";


            const location =
                job.location ||
                "Location not specified";


            const source =
                job.source ||
                "Job Platform";


            const score =
                job.matchScore != null
                    ? job.matchScore
                    : 0;


            const logo =
                company
                    .charAt(0)
                    .toUpperCase();


            return `

                <article class="job-card">

                    <div class="job-logo">
                        ${escapeHtml(logo)}
                    </div>


                    <div class="job-info">

                        <h3 class="job-title">
                            ${escapeHtml(title)}
                        </h3>


                        <div class="job-company">
                            ${escapeHtml(company)}
                        </div>


                        <div class="job-meta">

                            <span>
                                📍 ${escapeHtml(location)}
                            </span>

                            <span>
                                💼 Internship
                            </span>

                        </div>


                        <div class="job-source">
                            Source: ${escapeHtml(source)}
                        </div>

                    </div>


                    <div class="job-side">

                        <span class="match-badge">
                            ${score}% match
                        </span>


                        <button
                            class="apply-button"
                            data-url="${escapeAttribute(
                                job.link || ""
                            )}"
                            type="button"
                        >
                            View & Apply
                        </button>

                    </div>

                </article>

            `;

        }




        function showLoading() {

            loading.style.display =
                "block";

            empty.style.display =
                "none";

            jobList.innerHTML = "";

        }



        function escapeHtml(value) {

            return String(value)
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


        function escapeAttribute(value) {

            return escapeHtml(value);

        }

    }
);