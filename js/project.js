

document.addEventListener("DOMContentLoaded", () => {


    const tabs =
        document.querySelectorAll(
            ".workspace-tabs button"
        );

    const panels =
        document.querySelectorAll(
            ".workspace-panel"
        );

    const taskList =
        document.getElementById(
            "taskList"
        );

    const overviewTasks =
        document.getElementById(
            "overviewTasks"
        );

    const membersGrid =
        document.getElementById(
            "membersGrid"
        );

    const fileList =
        document.getElementById(
            "fileList"
        );

    const discussionList =
        document.getElementById(
            "discussionList"
        );

    const chatLog =
        document.getElementById(
            "chatLog"
        );

    const chatInput =
        document.getElementById(
            "chatInput"
        );

    const projectToast =
        document.getElementById(
            "projectToast"
        );

    const projectModal =
        document.getElementById(
            "projectModal"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const modalBody =
        document.getElementById(
            "modalBody"
        );



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
        "You";


    const userAvatar =
        `https://i.pravatar.cc/64?u=${encodeURIComponent(username)}`;



    const TASK_KEY =
        "skillpulseProjectTasks";

    const CHAT_KEY =
        "skillpulseProjectChat";

    const MEMBERS_KEY =
        "skillpulseProjectMembers";

    const FILE_KEY =
        "skillpulseProjectFiles";

    const DISCUSSION_KEY =
        "skillpulseProjectDiscussion";


    let tasks =
        getStorage(
            TASK_KEY,
            null
        );


    if (!tasks) {

        tasks = [

            {
                id: 1,
                title: "Design homepage",
                completed: true,
                time: "Completed"
            },

            {
                id: 2,
                title: "Create database",
                completed: true,
                time: "Completed"
            },

            {
                id: 3,
                title: "Build login",
                completed: false,
                time: "2 days"
            },

            {
                id: 4,
                title: "Build event registration form",
                completed: false,
                time: "3 days"
            },

            {
                id: 5,
                title: "Deploy application",
                completed: false,
                time: "2 days"
            }

        ];

        saveStorage(
            TASK_KEY,
            tasks
        );

    }



    let members =
        getStorage(
            MEMBERS_KEY,
            null
        );


    if (!members) {

        members = [

            {
                name: "Riya Shah",
                role: "Frontend / UI Design",
                avatar:
                    "https://i.pravatar.cc/64?img=12"
            },

            {
                name: "Aman Gupta",
                role: "Backend Developer",
                avatar:
                    "https://i.pravatar.cc/64?img=15"
            },

            {
                name: username + " (You)",
                role: "Full Stack Developer",
                avatar: userAvatar
            }

        ];

        saveStorage(
            MEMBERS_KEY,
            members
        );

    }



    let messages =
        getStorage(
            CHAT_KEY,
            null
        );


    if (!messages) {

        messages = [

            {
                name: "Riya",
                text:
                    "I've completed the UI design. Check it out!",
                avatar:
                    "https://i.pravatar.cc/64?img=12",
                own: false
            },

            {
                name: "Aman",
                text:
                    "Great! I'll work on the backend APIs next.",
                avatar:
                    "https://i.pravatar.cc/64?img=15",
                own: false
            },

            {
                name: username,
                text:
                    "Sounds good. Let's sync tonight.",
                avatar:
                    userAvatar,
                own: true
            }

        ];

        saveStorage(
            CHAT_KEY,
            messages
        );

    }



    let files =
        getStorage(
            FILE_KEY,
            null
        );


    if (!files) {

        files = [

            {
                name: "project-requirements.pdf",
                type: "PDF",
                size: "1.2 MB"
            },

            {
                name: "database-schema.png",
                type: "IMAGE",
                size: "820 KB"
            },

            {
                name: "homepage-wireframe.fig",
                type: "DESIGN",
                size: "2.4 MB"
            }

        ];

        saveStorage(
            FILE_KEY,
            files
        );

    }



    let discussions =
        getStorage(
            DISCUSSION_KEY,
            null
        );


    if (!discussions) {

        discussions = [

            {
                title:
                    "Should we use MongoDB or PostgreSQL?",
                text:
                    "Let's decide which database is better for our event registration system.",
                author:
                    "Aman Gupta",
                replies: 6
            },

            {
                title:
                    "Homepage UI feedback",
                text:
                    "Please review the latest homepage design before we move to development.",
                author:
                    "Riya Shah",
                replies: 4
            }

        ];

        saveStorage(
            DISCUSSION_KEY,
            discussions
        );

    }



    function getStorage(
        key,
        fallback
    ) {

        try {

            const data =
                localStorage.getItem(
                    key
                );

            return data
                ? JSON.parse(data)
                : fallback;

        } catch (error) {

            return fallback;

        }

    }


    function saveStorage(
        key,
        value
    ) {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    }


    function escapeHTML(value) {

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



    function showToast(message) {

        projectToast.textContent =
            message;

        projectToast.classList.add(
            "show"
        );

        clearTimeout(
            showToast.timer
        );

        showToast.timer =
            setTimeout(
                () => {

                    projectToast.classList.remove(
                        "show"
                    );

                },
                2200
            );

    }



    tabs.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    button.dataset.tab;


                tabs.forEach(item => {

                    item.classList.remove(
                        "is-active"
                    );

                });


                panels.forEach(panel => {

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



    function renderTasks() {

        if (!taskList) {
            return;
        }


        taskList.innerHTML =
            tasks.map(
                task => `

                    <div
                        class="task-row ${
                            task.completed
                                ? "completed"
                                : ""
                        }"
                        data-task-id="${task.id}"
                    >

                        <button
                            class="task-row__check"
                            data-action="toggle-task"
                            type="button"
                        >
                            ${
                                task.completed
                                    ? "✓"
                                    : ""
                            }
                        </button>

                        <span class="task-title">
                            ${escapeHTML(task.title)}
                        </span>

                        <span class="task-row__time">
                            ${escapeHTML(task.time)}
                        </span>

                        <button
                            class="task-delete"
                            data-action="delete-task"
                            type="button"
                        >
                            🗑
                        </button>

                    </div>

                `
            )
            .join("");


        attachTaskEvents();

        renderOverviewTasks();

        updateProgress();

    }

    function attachTaskEvents() {

        taskList
            .querySelectorAll(
                "[data-action]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const row =
                            button.closest(
                                ".task-row"
                            );

                        const id =
                            Number(
                                row.dataset.taskId
                            );

                        const action =
                            button.dataset.action;


                        if (
                            action ===
                            "toggle-task"
                        ) {

                            toggleTask(id);

                        }


                        if (
                            action ===
                            "delete-task"
                        ) {

                            deleteTask(id);

                        }

                    }
                );

            });

    }


    function toggleTask(id) {

        const task =
            tasks.find(
                item =>
                    item.id === id
            );


        if (!task) {
            return;
        }


        task.completed =
            !task.completed;


        task.time =
            task.completed
                ? "Completed"
                : "2 days";


        saveStorage(
            TASK_KEY,
            tasks
        );


        renderTasks();


        showToast(
            task.completed
                ? "Task completed! 🎉"
                : "Task marked incomplete."
        );

    }



    function deleteTask(id) {

        const confirmed =
            confirm(
                "Delete this task?"
            );


        if (!confirmed) {
            return;
        }


        tasks =
            tasks.filter(
                task =>
                    task.id !== id
            );


        saveStorage(
            TASK_KEY,
            tasks
        );


        renderTasks();


        showToast(
            "Task deleted."
        );

    }



    function renderOverviewTasks() {

        if (!overviewTasks) {
            return;
        }


        overviewTasks.innerHTML =
            tasks
                .slice(0, 4)
                .map(
                    task => `

                        <div class="task-row ${
                            task.completed
                                ? "completed"
                                : ""
                        }">

                            <span
                                class="task-row__check"
                            >
                                ${
                                    task.completed
                                        ? "✓"
                                        : ""
                                }
                            </span>

                            <span class="task-title">
                                ${escapeHTML(task.title)}
                            </span>

                        </div>

                    `
                )
                .join("");

    }



    function updateProgress() {

        const total =
            tasks.length;

        const completed =
            tasks.filter(
                task =>
                    task.completed
            ).length;


        const percentage =
            total === 0
                ? 0
                : Math.round(
                    completed /
                    total *
                    100
                );


        const progressFill =
            document.getElementById(
                "progressFill"
            );

        const progressNumber =
            document.getElementById(
                "progressNumber"
            );

        const completedCount =
            document.getElementById(
                "completedTaskCount"
            );

        const remainingCount =
            document.getElementById(
                "remainingTaskCount"
            );


        if (progressFill) {

            progressFill.style.width =
                `${percentage}%`;

        }


        if (progressNumber) {

            progressNumber.textContent =
                `${percentage}%`;

        }


        if (completedCount) {

            completedCount.textContent =
                completed;

        }


        if (remainingCount) {

            remainingCount.textContent =
                total - completed;

        }


        const taskCount =
            document.getElementById(
                "taskCount"
            );

        if (taskCount) {

            taskCount.textContent =
                total;

        }

    }


    document
        .getElementById(
            "addTaskBtn"
        )
        ?.addEventListener(
            "click",
            () => {

                openModal(
                    "Add New Task",
                    `
                        <form
                            class="modal-form"
                            id="taskForm"
                        >

                            <label>
                                Task Name
                            </label>

                            <input
                                type="text"
                                id="newTaskName"
                                placeholder="e.g. Build registration API"
                                required
                            >


                            <label>
                                Estimated Time
                            </label>

                            <select
                                id="newTaskTime"
                            >

                                <option>
                                    1 day
                                </option>

                                <option>
                                    2 days
                                </option>

                                <option>
                                    3 days
                                </option>

                                <option>
                                    1 week
                                </option>

                            </select>


                            <button
                                type="submit"
                            >
                                Add Task
                            </button>

                        </form>
                    `
                );


                document
                    .getElementById(
                        "taskForm"
                    )
                    ?.addEventListener(
                        "submit",
                        event => {

                            event.preventDefault();


                            const name =
                                document
                                    .getElementById(
                                        "newTaskName"
                                    )
                                    .value
                                    .trim();


                            const time =
                                document
                                    .getElementById(
                                        "newTaskTime"
                                    )
                                    .value;


                            if (!name) {
                                return;
                            }


                            tasks.push({

                                id:
                                    Date.now(),

                                title:
                                    name,

                                completed:
                                    false,

                                time

                            });


                            saveStorage(
                                TASK_KEY,
                                tasks
                            );


                            renderTasks();

                            closeModal();

                            showToast(
                                "Task added successfully."
                            );

                        }
                    );

            }
        );



    function renderMembers() {

        membersGrid.innerHTML =
            members.map(
                (member, index) => `

                    <div class="member-card">

                        <img
                            src="${member.avatar}"
                            alt=""
                        >

                        <div class="member-info">

                            <strong>
                                ${escapeHTML(member.name)}
                            </strong>

                            <span>
                                ${escapeHTML(member.role)}
                            </span>

                        </div>

                        <span class="member-role">
                            ${
                                index === 0
                                    ? "Designer"
                                    : index === 1
                                        ? "Backend"
                                        : "You"
                            }
                        </span>

                    </div>

                `
            )
            .join("");


        const memberCount =
            document.getElementById(
                "memberCount"
            );


        if (memberCount) {

            memberCount.textContent =
                members.length;

        }

    }



    document
        .getElementById(
            "addMemberBtn"
        )
        ?.addEventListener(
            "click",
            () => {

                openModal(
                    "Add Team Member",
                    `
                        <form
                            class="modal-form"
                            id="memberForm"
                        >

                            <label>
                                Name
                            </label>

                            <input
                                type="text"
                                id="memberName"
                                placeholder="Member name"
                                required
                            >


                            <label>
                                Role
                            </label>

                            <input
                                type="text"
                                id="memberRole"
                                placeholder="e.g. Frontend Developer"
                                required
                            >


                            <button
                                type="submit"
                            >
                                Add Member
                            </button>

                        </form>
                    `
                );


                document
                    .getElementById(
                        "memberForm"
                    )
                    ?.addEventListener(
                        "submit",
                        event => {

                            event.preventDefault();


                            const name =
                                document
                                    .getElementById(
                                        "memberName"
                                    )
                                    .value
                                    .trim();


                            const role =
                                document
                                    .getElementById(
                                        "memberRole"
                                    )
                                    .value
                                    .trim();


                            if (
                                !name ||
                                !role
                            ) {
                                return;
                            }


                            members.push({

                                name,

                                role,

                                avatar:
                                    `https://i.pravatar.cc/64?u=${encodeURIComponent(name)}`

                            });


                            saveStorage(
                                MEMBERS_KEY,
                                members
                            );


                            renderMembers();

                            closeModal();

                            showToast(
                                "Member added."
                            );

                        }
                    );

            }
        );



    document
        .getElementById(
            "inviteBtn"
        )
        ?.addEventListener(
            "click",
            () => {

                openModal(
                    "Invite Teammate",
                    `
                        <form
                            class="modal-form"
                            id="inviteForm"
                        >

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                id="inviteEmail"
                                placeholder="teammate@example.com"
                                required
                            >

                            <button
                                type="submit"
                            >
                                Send Invitation
                            </button>

                        </form>
                    `
                );


                document
                    .getElementById(
                        "inviteForm"
                    )
                    ?.addEventListener(
                        "submit",
                        event => {

                            event.preventDefault();

                            closeModal();

                            showToast(
                                "Invitation prepared successfully."
                            );

                        }
                    );

            }
        );


    function renderFiles() {

        if (!fileList) {
            return;
        }


        if (!files.length) {

            fileList.innerHTML = `

                <div class="empty-file-state">

                    📂

                    <p>
                        No files uploaded yet.
                    </p>

                </div>

            `;

            return;

        }


        fileList.innerHTML =
            files.map(
                (file, index) => `

                    <div class="file-item">

                        <div class="file-icon">
                            📄
                        </div>

                        <div class="file-info">

                            <strong>
                                ${escapeHTML(file.name)}
                            </strong>

                            <span>
                                ${escapeHTML(file.type)}
                                ·
                                ${escapeHTML(file.size)}
                            </span>

                        </div>

                        <button
                            class="file-remove"
                            data-file-index="${index}"
                            type="button"
                        >
                            🗑
                        </button>

                    </div>

                `
            )
            .join("");


        fileList
            .querySelectorAll(
                ".file-remove"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset.fileIndex
                            );


                        files.splice(
                            index,
                            1
                        );


                        saveStorage(
                            FILE_KEY,
                            files
                        );


                        renderFiles();


                        showToast(
                            "File removed."
                        );

                    }
                );

            });

    }



    const uploadFileBtn =
        document.getElementById(
            "uploadFileBtn"
        );

    const fileInput =
        document.getElementById(
            "fileInput"
        );


    uploadFileBtn?.addEventListener(
        "click",
        () => {

            fileInput?.click();

        }
    );


    fileInput?.addEventListener(
        "change",
        () => {

            const selectedFiles =
                Array.from(
                    fileInput.files
                );


            selectedFiles.forEach(
                file => {

                    files.push({

                        name:
                            file.name,

                        type:
                            file.type ||
                            "FILE",

                        size:
                            formatFileSize(
                                file.size
                            )

                    });

                }
            );


            saveStorage(
                FILE_KEY,
                files
            );


            renderFiles();


            fileInput.value =
                "";


            showToast(
                "File added to project."
            );

        }
    );


    function formatFileSize(
        bytes
    ) {

        if (bytes < 1024) {

            return `${bytes} B`;

        }

        if (bytes < 1024 * 1024) {

            return `${(
                bytes / 1024
            ).toFixed(1)} KB`;

        }

        return `${(
            bytes /
            1024 /
            1024
        ).toFixed(1)} MB`;

    }


    function renderChat() {

        chatLog.innerHTML =
            messages
                .map(
                    message => `

                        <div
                            class="chat-msg ${
                                message.own
                                    ? "chat-msg--me"
                                    : ""
                            }"
                        >

                            <img
                                class="chat-msg__avatar"
                                src="${message.avatar}"
                                alt=""
                            >

                            <div>

                                <div class="chat-msg__name">
                                    ${escapeHTML(message.name)}
                                </div>

                                <p>
                                    ${escapeHTML(message.text)}
                                </p>

                            </div>

                        </div>

                    `
                )
                .join("");


        chatLog.scrollTop =
            chatLog.scrollHeight;

    }


    function sendMessage() {

        const text =
            chatInput.value.trim();


        if (!text) {
            return;
        }


        messages.push({

            name:
                username,

            text,

            avatar:
                userAvatar,

            own:
                true

        });


        saveStorage(
            CHAT_KEY,
            messages
        );


        chatInput.value =
            "";


        renderChat();


        showToast(
            "Message sent."
        );

    }


    document
        .getElementById(
            "sendMessage"
        )
        ?.addEventListener(
            "click",
            sendMessage
        );


    chatInput?.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter"
            ) {

                sendMessage();

            }

        }
    );



    function renderDiscussions() {

        discussionList.innerHTML =
            discussions
                .map(
                    (discussion, index) => `

                        <div
                            class="discussion-item"
                            data-discussion="${index}"
                        >

                            <strong>
                                ${escapeHTML(
                                    discussion.title
                                )}
                            </strong>

                            <p>
                                ${escapeHTML(
                                    discussion.text
                                )}
                            </p>

                            <span>
                                Started by
                                ${escapeHTML(
                                    discussion.author
                                )}
                                ·
                                ${discussion.replies}
                                replies
                            </span>

                        </div>

                    `
                )
                .join("");


        discussionList
            .querySelectorAll(
                ".discussion-item"
            )
            .forEach(item => {

                item.addEventListener(
                    "click",
                    () => {

                        showToast(
                            "Discussion opened."
                        );

                    }
                );

            });

    }



    document
        .getElementById(
            "newDiscussionBtn"
        )
        ?.addEventListener(
            "click",
            () => {

                openModal(
                    "Start Discussion",
                    `
                        <form
                            class="modal-form"
                            id="discussionForm"
                        >

                            <label>
                                Discussion Title
                            </label>

                            <input
                                type="text"
                                id="discussionTitle"
                                placeholder="e.g. API architecture"
                                required
                            >


                            <label>
                                Description
                            </label>

                            <textarea
                                id="discussionText"
                                placeholder="Describe what you want to discuss..."
                                required
                            ></textarea>


                            <button
                                type="submit"
                            >
                                Start Discussion
                            </button>

                        </form>
                    `
                );


                document
                    .getElementById(
                        "discussionForm"
                    )
                    ?.addEventListener(
                        "submit",
                        event => {

                            event.preventDefault();


                            const title =
                                document
                                    .getElementById(
                                        "discussionTitle"
                                    )
                                    .value
                                    .trim();


                            const text =
                                document
                                    .getElementById(
                                        "discussionText"
                                    )
                                    .value
                                    .trim();


                            if (
                                !title ||
                                !text
                            ) {
                                return;
                            }


                            discussions.unshift({

                                title,

                                text,

                                author:
                                    username,

                                replies:
                                    0

                            });


                            saveStorage(
                                DISCUSSION_KEY,
                                discussions
                            );


                            renderDiscussions();

                            closeModal();


                            showToast(
                                "Discussion started."
                            );

                        }
                    );

            }
        );



    document
        .getElementById(
            "findMemberBtn"
        )
        ?.addEventListener(
            "click",
            () => {

                document
                    .querySelector(
                        '[data-tab="members"]'
                    )
                    ?.click();


                showToast(
                    "Open Members to find teammates."
                );

            }
        );


    document
        .getElementById(
            "editProjectBtn"
        )
        ?.addEventListener(
            "click",
            () => {

                openModal(
                    "Edit Project",
                    `
                        <form
                            class="modal-form"
                            id="editProjectForm"
                        >

                            <label>
                                Project Name
                            </label>

                            <input
                                type="text"
                                id="editProjectName"
                                value="Campus Event Management System"
                                required
                            >


                            <label>
                                Description
                            </label>

                            <textarea
                                id="editProjectDescription"
                                required
                            >A web application to manage college events, registrations, and notifications.</textarea>


                            <button
                                type="submit"
                            >
                                Save Changes
                            </button>

                        </form>
                    `
                );


                document
                    .getElementById(
                        "editProjectForm"
                    )
                    ?.addEventListener(
                        "submit",
                        event => {

                            event.preventDefault();


                            const title =
                                document
                                    .getElementById(
                                        "editProjectName"
                                    )
                                    .value
                                    .trim();


                            const description =
                                document
                                    .getElementById(
                                        "editProjectDescription"
                                    )
                                    .value
                                    .trim();


                            document
                                .getElementById(
                                    "projectTitle"
                                )
                                .textContent =
                                title;


                            document
                                .getElementById(
                                    "projectDescription"
                                )
                                .textContent =
                                description;


                            document
                                .getElementById(
                                    "overviewDescription"
                                )
                                .textContent =
                                description;


                            closeModal();


                            showToast(
                                "Project updated."
                            );

                        }
                    );

            }
        );



    function openModal(
        title,
        content
    ) {

        modalTitle.textContent =
            title;

        modalBody.innerHTML =
            content;

        projectModal.hidden =
            false;

    }


    function closeModal() {

        projectModal.hidden =
            true;

        modalBody.innerHTML =
            "";

    }


    document
        .getElementById(
            "closeModal"
        )
        ?.addEventListener(
            "click",
            closeModal
        );


    projectModal?.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                projectModal
            ) {

                closeModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape" &&
                !projectModal.hidden
            ) {

                closeModal();

            }

        }
    );



    renderTasks();

    renderMembers();

    renderFiles();

    renderChat();

    renderDiscussions();

});