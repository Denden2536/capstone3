window.onload = function () {
  const createPostButton = document.querySelector("#createPostButton");
  const createPostModal = document.querySelector("#createPostModal");
  const displayUsersPost = document.querySelector("#displayUsersPost");
  const closeModal = document.getElementsByClassName("close")[0];

  const apiBaseURL =
    "http://microbloglite.us-east-2.elasticbeanstalk.com/api/users";
  const profileContainer = document.querySelector("#profileContainer");

  function loadingUserProfile() {
    const loginData = getLoginData();
    const token = loginData.token;
    const username = loginData.username;

    const apiURL = `${apiBaseURL}/${username}`;

    fetch(apiURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((user) => {
        profileContainer.innerHTML = "";

        let userProfileDiv = document.createElement("div");

        let firstNameDiv = document.createElement("div");
        firstNameDiv.innerHTML = `${user.fullName}`;
        firstNameDiv.className = "firstNameDiv";
        userProfileDiv.appendChild(firstNameDiv);

        let usernameDiv = document.createElement("div");
        usernameDiv.innerHTML = `${user.username}`;
        usernameDiv.className = "usernameDiv";
        userProfileDiv.appendChild(usernameDiv);

        let bioDiv = document.createElement("div");
        bioDiv.innerHTML = `${user.bio}`;
        bioDiv.className = "bioDiv";
        userProfileDiv.appendChild(bioDiv);

        profileContainer.appendChild(userProfileDiv);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        profileContainer.innerHTML = "<p>Error loading profile data.</p>";
      });
  }

  function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
  }

  function logout() {
    window.localStorage.removeItem("login-data");

    window.location.replace("../account/login.html");
  }

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {
      event.preventDefault();
      logout();
    });
  }

  loadingUserProfile();
};
