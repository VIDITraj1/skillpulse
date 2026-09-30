document.addEventListener("DOMContentLoaded", function () {

    const savedUser = localStorage.getItem("skillpulseUser");



    if (!savedUser) {

        window.location.href = "login.html";

        return;
    }


    let user;

    try {

        user = JSON.parse(savedUser);

    } catch (error) {

        console.error("Unable to read saved user:", error);

        localStorage.removeItem("skillpulseUser");

        window.location.href = "login.html";

        return;
    }


    console.log("Logged-in SkillPulse user:", user);




    renderProfile(user);




    const editProfileBtn =
        document.getElementById("editProfileBtn");

    if (editProfileBtn) {

        editProfileBtn.addEventListener(
            "click",
            function () {

                openEditModal(user);

            }
        );
    }




    const sectionEditButtons =
        document.querySelectorAll(".edit-section-btn");

    sectionEditButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            openEditModal(user);

        });

    });



    const skillsEditBtn =
        document.getElementById("skillsEditBtn");

    if (skillsEditBtn) {

        skillsEditBtn.addEventListener(
            "click",
            function () {

                alert(
                    "Skills editing will be connected to the Skills & Assessment module."
                );

            }
        );

    }


    const closeModalBtn =
        document.getElementById("closeProfileModal");

    const cancelBtn =
        document.getElementById("cancelProfileEdit");


    if (closeModalBtn) {

        closeModalBtn.addEventListener(
            "click",
            closeEditModal
        );

    }


    if (cancelBtn) {

        cancelBtn.addEventListener(
            "click",
            closeEditModal
        );

    }



    const modal =
        document.getElementById("profileModal");

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {

                    closeEditModal();

                }

            }
        );

    }



    const editProfileForm =
        document.getElementById("editProfileForm");


    if (editProfileForm) {

        editProfileForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                await saveProfile(user);

            }
        );

    }



    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("active")
            ) {

                closeEditModal();

            }

        }
    );

});



function renderProfile(user) {



    const profileUsername =
        document.getElementById("profileUsername");

    const profileHandle =
        document.getElementById("profileHandle");

    const profileEmail =
        document.getElementById("profileEmail");

    const profileDegree =
        document.getElementById("profileDegree");

    const profileBranch =
        document.getElementById("profileBranch");

    const profileAvatar =
        document.getElementById("profileAvatar");

    const profileStatusBadge =
        document.getElementById("profileStatusBadge");


    if (profileUsername) {

        profileUsername.textContent =
            user.username || "User";

    }


    if (profileHandle) {

        const username =
            user.username || "user";

        profileHandle.textContent =
            "@" + username
                .toLowerCase()
                .replace(/\s+/g, "");

    }


    if (profileEmail) {

        profileEmail.textContent =
            user.email || "No email";

    }


    if (profileDegree) {

        profileDegree.textContent =
            user.degree || "Degree";

    }


    if (profileBranch) {

        profileBranch.textContent =
            user.branch || "Branch";

    }


    if (profileAvatar && user.avatar) {

        profileAvatar.src = user.avatar;

    }


    if (profileStatusBadge) {

        profileStatusBadge.textContent =
            user.currentStatus
                ? formatText(user.currentStatus)
                : "Profile";

    }



    const profileQualification =
        document.getElementById(
            "profileQualification"
        );

    const profileBranchEducation =
        document.getElementById(
            "profileBranchEducation"
        );

    const profileCollege =
        document.getElementById(
            "profileCollege"
        );

    const profileGraduationYear =
        document.getElementById(
            "profileGraduationYear"
        );

    const profileCgpa =
        document.getElementById(
            "profileCgpa"
        );


    if (profileQualification) {

        profileQualification.textContent =
            user.highestQualification ||
            "Qualification not provided";

    }


    if (profileBranchEducation) {

        profileBranchEducation.textContent =
            user.branch ||
            "Branch not provided";

    }


    if (profileCollege) {

        profileCollege.textContent =
            user.college ||
            "College not provided";

    }


    if (profileGraduationYear) {

        profileGraduationYear.textContent =
            user.graduationYear
                ? `Graduation: ${user.graduationYear}`
                : "Graduation year not provided";

    }


    if (profileCgpa) {

        profileCgpa.textContent =
            user.cgpa
                ? `CGPA: ${user.cgpa}`
                : "CGPA not provided";

    }



    const profileLookingFor =
        document.getElementById(
            "profileLookingFor"
        );

    const profilePreferredRole =
        document.getElementById(
            "profilePreferredRole"
        );

    const profileWorkPreference =
        document.getElementById(
            "profileWorkPreference"
        );

    const profilePreferredLocation =
        document.getElementById(
            "profilePreferredLocation"
        );


    if (profileLookingFor) {

        profileLookingFor.textContent =
            formatArrayOrValue(
                user.lookingFor
            );

    }


    if (profilePreferredRole) {

        profilePreferredRole.textContent =
            formatArrayOrValue(
                user.preferredRoles
            );

    }


    if (profileWorkPreference) {

        profileWorkPreference.textContent =
            user.workPreference
                ? formatText(user.workPreference)
                : "Not specified";

    }


    if (profilePreferredLocation) {

        profilePreferredLocation.textContent =
            user.preferredLocation
                ? formatText(user.preferredLocation)
                : "Not specified";

    }



    const accountUsername =
        document.getElementById(
            "accountUsername"
        );

    const accountEmail =
        document.getElementById(
            "accountEmail"
        );

    const accountStatus =
        document.getElementById(
            "accountStatus"
        );

    const accountGraduation =
        document.getElementById(
            "accountGraduation"
        );


    if (accountUsername) {

        accountUsername.textContent =
            user.username || "-";

    }


    if (accountEmail) {

        accountEmail.textContent =
            user.email || "-";

    }


    if (accountStatus) {

        accountStatus.textContent =
            user.currentStatus
                ? formatText(user.currentStatus)
                : "-";

    }


    if (accountGraduation) {

        accountGraduation.textContent =
            user.expectedGraduationYear || "-";

    }

}



function openEditModal(user) {

    const modal =
        document.getElementById("profileModal");

    if (!modal) return;


    /* Basic */

    document.getElementById("editUsername").value =
        user.username || "";

    document.getElementById("editEmail").value =
        user.email || "";


    /* Education */

    document.getElementById("editQualification").value =
        user.highestQualification || "";

    document.getElementById("editDegree").value =
        user.degree || "";

    document.getElementById("editBranch").value =
        user.branch || "";

    document.getElementById("editCollege").value =
        user.college || "";

    document.getElementById("editGraduationYear").value =
        user.graduationYear || "";

    document.getElementById("editCgpa").value =
        user.cgpa || "";


    /* Career */

    document.getElementById("editCurrentStatus").value =
        user.currentStatus || "student";

    document.getElementById("editExpectedGraduationYear").value =
        user.expectedGraduationYear || "";

    document.getElementById("editLookingFor").value =
        arrayToString(user.lookingFor);

    document.getElementById("editPreferredRoles").value =
        arrayToString(user.preferredRoles);

    document.getElementById("editWorkPreference").value =
        user.workPreference || "";

    document.getElementById("editPreferredLocation").value =
        user.preferredLocation || "";


    /* Clear message */

    const message =
        document.getElementById("profileFormMessage");

    if (message) {

        message.textContent = "";

        message.className =
            "profile-form-message";

    }


    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}



function closeEditModal() {

    const modal =
        document.getElementById("profileModal");

    if (!modal) return;


    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}



async function saveProfile(oldUser) {

    const saveButton =
        document.getElementById(
            "saveProfileBtn"
        );

    const message =
        document.getElementById(
            "profileFormMessage"
        );


    const userId =
        oldUser.id || oldUser._id;


    if (!userId) {

        showFormMessage(
            "User ID is missing. Please login again.",
            "error"
        );

        return;

    }


    const updatedUser = {

        username:
            document.getElementById(
                "editUsername"
            ).value.trim(),

        email:
            document.getElementById(
                "editEmail"
            ).value.trim(),

        highestQualification:
            document.getElementById(
                "editQualification"
            ).value.trim(),

        degree:
            document.getElementById(
                "editDegree"
            ).value.trim(),

        branch:
            document.getElementById(
                "editBranch"
            ).value.trim(),

        college:
            document.getElementById(
                "editCollege"
            ).value.trim(),

        graduationYear:
            document.getElementById(
                "editGraduationYear"
            ).value.trim(),

        cgpa:
            document.getElementById(
                "editCgpa"
            ).value.trim(),

        currentStatus:
            document.getElementById(
                "editCurrentStatus"
            ).value,

        expectedGraduationYear:
            document.getElementById(
                "editExpectedGraduationYear"
            ).value.trim(),

        lookingFor:
            stringToArray(
                document.getElementById(
                    "editLookingFor"
                ).value
            ),

        preferredRoles:
            stringToArray(
                document.getElementById(
                    "editPreferredRoles"
                ).value
            ),

        workPreference:
            document.getElementById(
                "editWorkPreference"
            ).value,

        preferredLocation:
            document.getElementById(
                "editPreferredLocation"
            ).value.trim()

    };


    /* Required fields */

    if (
        !updatedUser.username ||
        !updatedUser.email
    ) {

        showFormMessage(
            "Username and email are required.",
            "error"
        );

        return;

    }


    try {

        saveButton.disabled = true;

        saveButton.textContent =
            "Saving...";


        /*
            Send updated data to backend.
        */

        const response =
            await fetch(
                `http://localhost:5000/api/auth/profile/${userId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            updatedUser
                        )
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to update profile."
            );

        }




        localStorage.setItem(
            "skillpulseUser",
            JSON.stringify(data.user)
        );



        renderProfile(data.user);


        showFormMessage(
            "Profile updated successfully!",
            "success"
        );


        setTimeout(
            function () {

                closeEditModal();

            },
            700
        );


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );


        showFormMessage(
            error.message ||
            "Something went wrong. Please try again.",
            "error"
        );


    } finally {

        saveButton.disabled = false;

        saveButton.textContent =
            "Save Changes";

    }

}



function showFormMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "profileFormMessage"
        );

    if (!element) return;


    element.textContent =
        message;

    element.className =
        "profile-form-message " +
        type;

}




function arrayToString(value) {

    if (!Array.isArray(value)) {

        return value || "";

    }


    return value.join(", ");

}


function stringToArray(value) {

    if (!value) {

        return [];

    }


    return value
        .split(",")
        .map(function (item) {

            return item.trim();

        })
        .filter(function (item) {

            return item.length > 0;

        });

}


function formatArrayOrValue(value) {

    if (
        Array.isArray(value) &&
        value.length > 0
    ) {

        return value
            .map(formatText)
            .join(", ");

    }


    if (value) {

        return formatText(value);

    }


    return "Not specified";

}




function formatText(value) {

    if (!value) {

        return "";

    }


    return String(value)
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, function (letter) {

            return letter.toUpperCase();

        });

}