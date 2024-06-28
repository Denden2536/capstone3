"use strict";

const registerForm = document.querySelector("#register");
const apiBaseURL1 = "http://microbloglite.us-east-2.elasticbeanstalk.com";

registerForm.onsubmit = function (event) {
  event.preventDefault();

  const fullName = registerForm.fullName.value;
  const username = registerForm.username.value;
  const password = registerForm.password.value;
  const passwordRepeat = registerForm.passwordRepeat.value;

  if (password !== passwordRepeat) {
    alert("Passwords do not match!");
    return;
  }

  const registerData = {
    fullName: fullName,
    username: username,
    password: password,
  };

  registerForm.registerButton.disabled = true;

  fetch(`${apiBaseURL1}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  })
    .then((response) => response.json())
    .then((user) => {
      alert("Congratulations! Your account has been created.");
      window.location.assign("../posts/posts.html"); // Redirect to posts page
    })
    .catch((error) => {
      alert("Error: " + error.message);
      registerForm.registerButton.disabled = false;
    });
};
