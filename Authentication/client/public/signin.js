document.addEventListener('DOMContentLoaded', () => {
    const signinButton = document.getElementById("signinButton");
    // fetch api call for logging in / sign in
    signinButton.addEventListener("click", async () => {
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const user = { email: email.value, password: password.value };
        console.log(user);
        
        const res = await fetch("http://localhost:3000/api/v1/signin", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "content-type": "application/json",
        },
        });
        
        let msg = await res.text();
        alert(msg);
    });
})

