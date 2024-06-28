"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

  const createPostForm = document.getElementById("createPostForm");
  const logoutButton = document.getElementById("logoutButton");
  const loginData = getLoginData();
  createPostForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const postContent = document.getElementById("postContent").value;

    const postData = {
      text: postContent,
    };

    fetch(`${apiBaseURL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        alert("Post created successfully!");
        window.location.assign("posts.html");
      })
      .catch((error) => console.error("Error creating post:", error));
  });

  logoutButton.addEventListener("click", function () {
    logout();
  });

  function logout() {
    fetch(`${apiBaseURL}/auth/logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        window.localStorage.removeItem("login-data");
        window.location.assign("../index.html");
      })
      .catch((error) => console.error("Error logging out:", error));
  }
});
