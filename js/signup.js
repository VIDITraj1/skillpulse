const signupForm = document.querySelector("[data-signup-form]");

if (signupForm) {

    signupForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        // Get values from the form
        const username = signupForm.elements.username.value.trim();
        const email = signupForm.elements.email.value.trim();
        const password = signupForm.elements.password.value;
        const confirmPassword = signupForm.elements.confirmPassword.value;

        const highestQualification =
            signupForm.elements.highestQualification.value;

        const degree =
            signupForm.elements.degree.value.trim();

        const branch =
            signupForm.elements.branch.value.trim();

        const college =
            signupForm.elements.college.value.trim();

        const graduationYear =
            signupForm.elements.graduationYear.value;

        const cgpa =
            signupForm.elements.cgpa.value.trim();

        const currentStatus =
            signupForm.elements.currentStatus.value;

        const currentSemester =
            signupForm.elements.currentSemester?.value || "";

        const expectedGraduationYear =
            signupForm.elements.expectedGraduationYear?.value || "";

        const termsAccepted =
            signupForm.elements.termsAccepted.checked;


        // --------------------------------
        // Password confirmation
        // --------------------------------

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }


        // --------------------------------
        // Looking For
        // --------------------------------

        const lookingFor = Array.from(
            signupForm.querySelectorAll(
                'input[name="lookingFor"]:checked'
            )
        ).map(input => input.value);




        const preferredRoles =
            signupForm.elements.preferredRoles.value
                ? [signupForm.elements.preferredRoles.value]
                : [];

        const workPreference =
            signupForm.elements.workPreference.value;

        const preferredLocation =
            signupForm.elements.preferredLocation.value;




        const userData = {

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
        };


        console.log("Sending registration data:");
        console.log(userData);




        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(userData)
                }
            );


            const data = await response.json();

            console.log("Backend response:", data);




            if (!response.ok) {

                alert(data.message);

                return;
            }




            alert("Account created successfully!");

            // Send user to login page
            window.location.href = "login.html";


        } catch (error) {

            console.error("Registration error:", error);

            alert(
                "Unable to connect to the server. Make sure your backend is running."
            );
        }

    });

}