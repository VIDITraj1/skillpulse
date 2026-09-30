
document.addEventListener("DOMContentLoaded", function () {




    const savedUser =
        localStorage.getItem("skillpulseUser");




    if (!savedUser) {

        window.location.href = "login.html";

        return;
    }


  

    let user;

    try {

        user = JSON.parse(savedUser);

    } catch (error) {

        console.error(
            "Unable to read user:",
            error
        );

        localStorage.removeItem("skillpulseUser");

        window.location.href = "login.html";

        return;
    }


    console.log(
        "Dashboard user:",
        user
    );



    const usernameElement =
        document.getElementById(
            "dashboardUsername"
        );


    if (usernameElement) {

        usernameElement.textContent =
            user.username || "User";

    }







    const readiness =
        calculateReadiness(user);


    const readinessNumber =
        document.getElementById(
            "readinessNumber"
        );


    if (readinessNumber) {

        readinessNumber.textContent =
            `${readiness}%`;

    }



    /* =========================================
       UPDATE SVG RING
       ========================================= */

    const readinessCircle =
        document.querySelector(
            ".readiness-ring__value"
        );


    if (readinessCircle) {

        const radius = 42;

        const circumference =
            2 * Math.PI * radius;


        readinessCircle.style.strokeDasharray =
            circumference;


        const offset =
            circumference -
            (readiness / 100) *
            circumference;


        readinessCircle.style.strokeDashoffset =
            offset;

    }

});





function calculateReadiness(user) {

    let score = 0;


    /*
       Basic account information
    */

    if (user.username) {
        score += 10;
    }


    if (user.email) {
        score += 10;
    }


    /*
       Education
    */

    if (user.degree) {
        score += 10;
    }


    if (user.branch) {
        score += 10;
    }


    if (user.college) {
        score += 10;
    }


    if (user.cgpa) {
        score += 10;
    }


    /*
       Career preferences
    */

    if (
        user.lookingFor &&
        user.lookingFor.length > 0
    ) {

        score += 10;

    }


    if (user.preferredRoles) {
        score += 10;
    }


    if (user.workPreference) {
        score += 10;
    }


    if (user.preferredLocation) {
        score += 10;
    }


    return Math.min(score, 100);
}