document.addEventListener("DOMContentLoaded", () => {
  const signupButton = document.getElementById("signupButton");


  // fetch api call for creating account/sign up
  signupButton.addEventListener("click", async (event) => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const user = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    console.log("user", user);
    const res = await fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    });
    let msg = await res.text();
    alert(msg);
  });

  
});
