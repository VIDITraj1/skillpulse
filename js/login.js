const loginForm = document.querySelector("[data-login-form]");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const email = loginForm.elements.email.value.trim();
    const password = loginForm.elements.password.value;

    console.log("Email:", email);
    console.log("Password:", password);


    try {

        
        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );



        const data = await response.json();

        console.log("Backend response:", data);


        // If login failed
        if (!response.ok) {

            alert(data.message);

            return;
        }


        // If login succeeded
        // If login succeeded
localStorage.setItem("skillpulseUser", JSON.stringify(data.user));

alert(data.message);

window.location.href = "profile.html";


    } catch (error) {

        console.error("Login error:", error);

        alert("Unable to connect to the server.");

    }

});