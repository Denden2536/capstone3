/* auth.js provides LOGIN-related functions */

"use strict";

const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

// Backup server:   https://microbloglite.onrender.com

// You can use this function to get the login data of the logged-in
// user (if any). It returns either an object including the username
// and token, or an empty object if the visitor is not logged in.
function getLoginData() {
  const loginJSON = window.localStorage.getItem("login-data");
  return JSON.parse(loginJSON) || {};
}

// You can use this function to see whether the current visitor is
// logged in. It returns either `true` or `false`.
function isLoggedIn() {
  const loginData = getLoginData();
  return Boolean(loginData.token);
}

// This function is already being used in the starter code for the
// landing page, in order to process a user's login. READ this code,
// and feel free to re-use parts of it for other `fetch()` requests
// you may need to write.
function login(loginData) {
  // POST /auth/login
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };

  return fetch(apiBaseURL + "/auth/login", options)
    .then((response) => response.json())
    .then((loginData) => {
      window.localStorage.setItem("login-data", JSON.stringify(loginData));
      window.location.assign("../posts/posts.html"); // redirect
      return loginData;
    });
}

function register(registerData) {
  // POST /api/users
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  };

  return fetch(apiBaseURL + "/api/users", options)
    .then((response) => response.json())
    .then((user) => {
      alert("Congratulations! Your account has been created.");
      window.location.assign("../posts/posts.html"); // redirect to posts page
    });
}

// This is the `logout()` function you will use for any logout button
// which you may include in various pages in your app. Again, READ this
// function and you will probably want to re-use parts of it for other
// `fetch()` requests you may need to write.
function logout() {
  const loginData = getLoginData();

  // GET /auth/logout
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(apiBaseURL + "/auth/logout", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .finally(() => {
      window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
      window.location.assign("../index.html"); // redirect back to landing page
    });
}
