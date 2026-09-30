

document.addEventListener("DOMContentLoaded", () => {



    const openComposerBtn =
        document.getElementById("openComposer");

    const composerExpanded =
        document.getElementById("composerExpanded");

    const closeComposerBtn =
        document.getElementById("closeComposer");

    const cancelPostBtn =
        document.getElementById("cancelPost");

    const publishPostBtn =
        document.getElementById("publishPost");

    const postContent =
        document.getElementById("postContent");

    const characterCount =
        document.getElementById("characterCount");

    const selectedPostType =
        document.getElementById("selectedPostType");

    const postSearch =
        document.getElementById("postSearch");

    const forYouPanel =
        document.getElementById("forYouPanel");

    const toast =
        document.getElementById("communityToast");

    const composerAvatar =
        document.getElementById("composerAvatar");

    const expandedAvatar =
        document.getElementById("expandedAvatar");

    const expandedUsername =
        document.getElementById("expandedUsername");




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


    const username =
        user?.username ||
        "SkillPulse User";

    const avatar =
        `https://i.pravatar.cc/64?u=${encodeURIComponent(username)}`;


    if (composerAvatar) {
        composerAvatar.src = avatar;
    }

    if (expandedAvatar) {
        expandedAvatar.src = avatar;
    }

    if (expandedUsername) {
        expandedUsername.textContent = username;
    }




    const POSTS_KEY =
        "skillpulseCommunityPosts";

    const CONNECTIONS_KEY =
        "skillpulseConnections";

    const JOINED_KEY =
        "skillpulseCommunities";


    let posts =
        getStorage(
            POSTS_KEY,
            []
        );

    let connections =
        getStorage(
            CONNECTIONS_KEY,
            []
        );

    let joinedCommunities =
        getStorage(
            JOINED_KEY,
            []
        );




    function getStorage(key, fallback) {

        try {

            const data =
                localStorage.getItem(key);

            return data
                ? JSON.parse(data)
                : fallback;

        } catch (error) {

            return fallback;

        }

    }


    function saveStorage(key, value) {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    }


    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function showToast(message) {

        if (!toast) {
            return;
        }

        toast.textContent =
            message;

        toast.classList.add(
            "show"
        );

        clearTimeout(
            showToast.timer
        );

        showToast.timer =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 2200);

    }


    function timeAgo(timestamp) {

        const difference =
            Date.now() - timestamp;

        const seconds =
            Math.floor(
                difference / 1000
            );

        if (seconds < 60) {
            return "just now";
        }

        const minutes =
            Math.floor(
                seconds / 60
            );

        if (minutes < 60) {
            return `${minutes}m ago`;
        }

        const hours =
            Math.floor(
                minutes / 60
            );

        if (hours < 24) {
            return `${hours}h ago`;
        }

        const days =
            Math.floor(
                hours / 24
            );

        if (days < 7) {
            return `${days}d ago`;
        }

        return new Date(
            timestamp
        ).toLocaleDateString();

    }




    const defaultPosts = [

        {
            id: "default-1",
            username: "Rohit Verma",
            avatar: "https://i.pravatar.cc/64?img=12",
            type: "Project",
            content:
                "My first full-stack project 🚀 Finally shipped my Student Management System using React, Node.js and MongoDB. Looking for feedback on the UI/API structure!",
            createdAt:
                Date.now() - 3 * 60 * 60 * 1000,
            likes: 124,
            comments: 23,
            liked: false,
            own: false
        },

        {
            id: "default-2",
            username: "Sneha Iyer",
            avatar: "https://i.pravatar.cc/64?img=32",
            type: "Achievement",
            content:
                "Completed my JavaScript assessment today! Scored 84%. Onto React next — wish me luck! 🎯",
            createdAt:
                Date.now() - 5 * 60 * 60 * 1000,
            likes: 58,
            comments: 9,
            liked: false,
            own: false
        },

        {
            id: "default-3",
            username: "Karan Singh",
            avatar: "https://i.pravatar.cc/64?img=51",
            type: "Question",
            content:
                "What should I learn after Node.js and Express if I want to become a full-stack developer?",
            createdAt:
                Date.now() - 8 * 60 * 60 * 1000,
            likes: 37,
            comments: 14,
            liked: false,
            own: false
        }

    ];


    if (!posts.length) {

        posts =
            defaultPosts;

        saveStorage(
            POSTS_KEY,
            posts
        );

    }




    function renderPosts(searchTerm = "") {

        if (!forYouPanel) {
            return;
        }

        const search =
            searchTerm
                .trim()
                .toLowerCase();

        const filteredPosts =
            posts.filter(post => {

                if (!search) {
                    return true;
                }

                const searchable =
                    `${post.username}
                    ${post.type}
                    ${post.content}`
                    .toLowerCase();

                return searchable.includes(
                    search
                );

            });


        if (!filteredPosts.length) {

            forYouPanel.innerHTML = `

                <div class="empty-state">

                    <div class="empty-state__icon">
                        🔍
                    </div>

                    <h3>
                        No posts found
                    </h3>

                    <p>
                        Try searching for another topic,
                        person or keyword.
                    </p>

                </div>

            `;

            return;

        }


        forYouPanel.innerHTML =
            filteredPosts
                .map(
                    createPostHTML
                )
                .join("");


        attachPostEvents();

        updatePostCount();

    }




    function createPostHTML(post) {

        const ownPost =
            post.own === true;

        const likedClass =
            post.liked
                ? "liked"
                : "";

        return `

            <article
                class="post-card"
                data-post-id="${post.id}"
            >

                <div class="post-card__head">

                    <img
                        src="${post.avatar}"
                        alt=""
                    >

                    <div>

                        <div class="post-card__name">
                            ${escapeHTML(post.username)}
                        </div>

                        <div class="post-card__meta">
                            ${timeAgo(post.createdAt)}
                            · ${escapeHTML(post.type)}
                        </div>

                    </div>

                </div>


                <p class="post-card__body">
                    ${escapeHTML(post.content)}
                </p>


                <div class="post-card__tags">

                    #skillpulse
                    #${post.type.toLowerCase()}

                </div>


                <div class="post-card__foot">

                    <button
                        class="post-action ${likedClass}"
                        data-action="like"
                        type="button"
                    >
                        ❤️ ${post.likes}
                    </button>


                    <button
                        class="post-action"
                        data-action="comment"
                        type="button"
                    >
                        💬 ${post.comments}
                    </button>


                    <button
                        class="post-action"
                        data-action="share"
                        type="button"
                    >
                        ↗ Share
                    </button>


                    ${
                        ownPost
                            ? `
                                <button
                                    class="post-delete"
                                    data-action="delete"
                                    type="button"
                                >
                                    Delete
                                </button>
                              `
                            : ""
                    }

                </div>

                <div
                    class="comment-area"
                    hidden
                >

                    <div class="comment-box">

                        <input
                            type="text"
                            placeholder="Write a comment..."
                            maxlength="300"
                        >

                        <button
                            type="button"
                            data-action="submit-comment"
                        >
                            Send
                        </button>

                    </div>

                </div>

            </article>

        `;

    }




    function attachPostEvents() {

        document
            .querySelectorAll(
                ".post-card"
            )
            .forEach(card => {

                const postId =
                    card.dataset.postId;

                const post =
                    posts.find(
                        item =>
                            item.id === postId
                    );

                if (!post) {
                    return;
                }


                card
                    .querySelectorAll(
                        "[data-action]"
                    )
                    .forEach(button => {

                        button.addEventListener(
                            "click",
                            () => {

                                handlePostAction(
                                    button.dataset.action,
                                    post,
                                    card
                                );

                            }
                        );

                    });

            });

    }



    function handlePostAction(
        action,
        post,
        card
    ) {




        if (action === "like") {

            post.liked =
                !post.liked;

            post.likes +=
                post.liked
                    ? 1
                    : -1;

            saveStorage(
                POSTS_KEY,
                posts
            );

            renderPosts(
                postSearch?.value || ""
            );

            return;

        }




        if (action === "comment") {

            const area =
                card.querySelector(
                    ".comment-area"
                );

            if (area) {

                area.hidden =
                    !area.hidden;

                if (!area.hidden) {

                    area
                        .querySelector("input")
                        ?.focus();

                }

            }

            return;

        }


       

        if (
            action ===
            "submit-comment"
        ) {

            const input =
                card.querySelector(
                    ".comment-box input"
                );

            if (!input) {
                return;
            }

            const comment =
                input.value.trim();

            if (!comment) {

                showToast(
                    "Write a comment first."
                );

                return;

            }

            post.comments++;

            saveStorage(
                POSTS_KEY,
                posts
            );

            renderPosts(
                postSearch?.value || ""
            );

            showToast(
                "Comment added."
            );

            return;

        }


   

        if (action === "share") {

            const shareText =
                `${post.username}: ${post.content}`;

            if (
                navigator.share
            ) {

                navigator
                    .share({
                        title:
                            "SkillPulse Community",
                        text:
                            shareText
                    })
                    .catch(() => {});

            } else if (
                navigator.clipboard
            ) {

                navigator
                    .clipboard
                    .writeText(
                        shareText
                    )
                    .then(() => {

                        showToast(
                            "Post copied to clipboard."
                        );

                    });

            } else {

                showToast(
                    "Post ready to share."
                );

            }

            return;

        }



        if (action === "delete") {

            const confirmed =
                confirm(
                    "Are you sure you want to delete this post?"
                );

            if (!confirmed) {
                return;
            }

            posts =
                posts.filter(
                    item =>
                        item.id !== post.id
                );

            saveStorage(
                POSTS_KEY,
                posts
            );

            renderPosts(
                postSearch?.value || ""
            );

            showToast(
                "Post deleted."
            );

        }

    }




    function openComposer(type = "Post") {

        if (!composerExpanded) {
            return;
        }

        composerExpanded.hidden =
            false;

        selectedPostType.textContent =
            type;

        document
            .querySelectorAll(
                ".composer__tag"
            )
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.postType === type
                );

            });

        postContent?.focus();

    }




    function closeComposer() {

        if (!composerExpanded) {
            return;
        }

        composerExpanded.hidden =
            true;

        if (postContent) {
            postContent.value = "";
        }

        updateCharacterCount();

        document
            .querySelectorAll(
                ".composer__tag"
            )
            .forEach(button => {

                button.classList.remove(
                    "active"
                );

            });

    }


    /* =====================================================
       OPEN BUTTON
       ===================================================== */

    openComposerBtn?.addEventListener(
        "click",
        () => {

            openComposer(
                "Post"
            );

        }
    );


    /* =====================================================
       POST TYPE BUTTONS
       ===================================================== */

    document
        .querySelectorAll(
            ".composer__tag"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openComposer(
                        button.dataset.postType
                    );

                }
            );

        });


    /* =====================================================
       CLOSE
       ===================================================== */

    closeComposerBtn?.addEventListener(
        "click",
        closeComposer
    );

    cancelPostBtn?.addEventListener(
        "click",
        closeComposer
    );


    /* =====================================================
       CHARACTER COUNT
       ===================================================== */

    function updateCharacterCount() {

        if (!postContent || !characterCount) {
            return;
        }

        characterCount.textContent =
            `${postContent.value.length} / 1000`;

    }


    postContent?.addEventListener(
        "input",
        updateCharacterCount
    );



    publishPostBtn?.addEventListener(
        "click",
        () => {

            const content =
                postContent.value.trim();

            if (!content) {

                showToast(
                    "Please write something first."
                );

                postContent.focus();

                return;

            }


            const type =
                selectedPostType.textContent ||
                "Post";


            const newPost = {

                id:
                    `user-${Date.now()}`,

                username,

                avatar,

                type,

                content,

                createdAt:
                    Date.now(),

                likes: 0,

                comments: 0,

                liked: false,

                own: true

            };


            posts.unshift(
                newPost
            );


            saveStorage(
                POSTS_KEY,
                posts
            );


            renderPosts();


            closeComposer();


            showToast(
                "Your post was published!"
            );

        }
    );


    /* =====================================================
       SEARCH
       ===================================================== */

    postSearch?.addEventListener(
        "input",
        () => {

            renderPosts(
                postSearch.value
            );

        }
    );


    /* =====================================================
       TABS
       ===================================================== */

    document
        .querySelectorAll(
            ".feed-tabs button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        button.dataset.tab;


                    document
                        .querySelectorAll(
                            ".feed-tabs button"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "is-active"
                            );

                        });


                    document
                        .querySelectorAll(
                            ".feed-panel"
                        )
                        .forEach(panel => {

                            panel.classList.remove(
                                "is-active"
                            );

                        });


                    button.classList.add(
                        "is-active"
                    );


                    const targetPanel =
                        document.querySelector(
                            `[data-panel="${target}"]`
                        );


                    targetPanel?.classList.add(
                        "is-active"
                    );

                }
            );

        });


    /* =====================================================
       CONNECT BUTTONS
       ===================================================== */

    document
        .querySelectorAll(
            ".connect-btn"
        )
        .forEach(button => {

            const person =
                button
                    .closest(".person-row")
                    ?.querySelector(
                        ".person-info strong"
                    )
                    ?.textContent
                    .trim();


            if (
                person &&
                connections.includes(person)
            ) {

                button.classList.add(
                    "connected"
                );

                button.textContent =
                    "Connected";

            }


            button.addEventListener(
                "click",
                () => {

                    if (!person) {
                        return;
                    }


                    const index =
                        connections.indexOf(
                            person
                        );


                    if (index === -1) {

                        connections.push(
                            person
                        );

                        button.classList.add(
                            "connected"
                        );

                        button.textContent =
                            "Connected";

                        showToast(
                            `Connected with ${person}`
                        );

                    } else {

                        connections.splice(
                            index,
                            1
                        );

                        button.classList.remove(
                            "connected"
                        );

                        button.textContent =
                            "Connect";

                        showToast(
                            `Disconnected from ${person}`
                        );

                    }


                    saveStorage(
                        CONNECTIONS_KEY,
                        connections
                    );

                }
            );

        });


   

    document
        .querySelectorAll(
            ".join-community"
        )
        .forEach(button => {

            const card =
                button.closest(
                    ".community-card"
                );

            const name =
                card
                    ?.querySelector("h3")
                    ?.textContent
                    .trim();


            if (
                name &&
                joinedCommunities.includes(name)
            ) {

                button.classList.add(
                    "joined"
                );

                button.textContent =
                    "Joined";

            }


            button.addEventListener(
                "click",
                () => {

                    if (!name) {
                        return;
                    }


                    const index =
                        joinedCommunities.indexOf(
                            name
                        );


                    if (index === -1) {

                        joinedCommunities.push(
                            name
                        );

                        button.classList.add(
                            "joined"
                        );

                        button.textContent =
                            "Joined";

                        showToast(
                            `Joined ${name}`
                        );

                    } else {

                        joinedCommunities.splice(
                            index,
                            1
                        );

                        button.classList.remove(
                            "joined"
                        );

                        button.textContent =
                            "Join Community";

                        showToast(
                            `Left ${name}`
                        );

                    }


                    saveStorage(
                        JOINED_KEY,
                        joinedCommunities
                    );

                }
            );

        });


    /* =====================================================
       COMMUNITY ROWS
       ===================================================== */

    document
        .querySelectorAll(
            ".community-row"
        )
        .forEach(row => {

            row.addEventListener(
                "click",
                () => {

                    const name =
                        row
                            .querySelector(
                                "strong"
                            )
                            ?.textContent
                            .trim();

                    if (name) {

                        showToast(
                            `${name} selected`
                        );

                    }

                }
            );

        });




    document
        .getElementById(
            "viewAllCommunities"
        )
        ?.addEventListener(
            "click",
            () => {

                document
                    .querySelector(
                        '[data-tab="communities"]'
                    )
                    ?.click();

            }
        );


    /* =====================================================
       FIND PEOPLE
       ===================================================== */

    document
        .getElementById(
            "findPeopleBtn"
        )
        ?.addEventListener(
            "click",
            () => {

                document
                    .querySelector(
                        ".community-sidebar"
                    )
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );


    /* =====================================================
       POST COUNT
       ===================================================== */

    function updatePostCount() {

        const counter =
            document.getElementById(
                "postCount"
            );

        if (!counter) {
            return;
        }

        const count =
            posts.length + 1200;

        counter.textContent =
            `${(count / 1000).toFixed(1)}K`;

    }




    renderPosts();

    updateCharacterCount();

});