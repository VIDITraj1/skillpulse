document.addEventListener("DOMContentLoaded", () => {



    const mobileMenuBtn =
        document.getElementById(
            "mobileMenuBtn"
        );

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    mobileMenuBtn?.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "show"
            );


            if (
                mobileMenu.classList.contains(
                    "show"
                )
            ) {

                mobileMenuBtn.textContent =
                    "✕";

            } else {

                mobileMenuBtn.textContent =
                    "☰";

            }

        }
    );



    mobileMenu
        ?.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "show"
                    );

                    mobileMenuBtn.textContent =
                        "☰";

                }
            );

        });




    const searchInput =
        document.getElementById(
            "navSearch"
        );


    searchInput?.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Enter"
            ) {
                return;
            }


            const query =
                searchInput.value.trim();


            if (!query) {
                return;
            }


            /*
             * Send the user to the jobs page
             * with the search query.
             */

            window.location.href =
                `jobs.html?q=${encodeURIComponent(query)}`;

        }
    );



    const animatedElements =
        document.querySelectorAll(
            ".mission-card, .feature-card, .journey-step"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    animatedElements.forEach(
        element => {

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(18px)";

            element.style.transition =
                "opacity 0.55s ease, transform 0.55s ease";


            observer.observe(
                element
            );

        }
    );




    const animationStyle =
        document.createElement(
            "style"
        );


    animationStyle.textContent = `

        .mission-card.is-visible,
        .feature-card.is-visible,
        .journey-step.is-visible {

            opacity: 1 !important;

            transform:
                translateY(0) !important;

        }

    `;


    document.head.appendChild(
        animationStyle
    );


 

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link
                            .getAttribute("href");


                    if (
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


});