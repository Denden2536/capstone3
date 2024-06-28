document.addEventListener("DOMContentLoaded", function () {
  const profileForm = document.getElementById("profileForm");

  const loginData = getLoginData();
  const token = loginData.token;
  const userId = loginData.userId;
  fetchUserProfile();

  profileForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const bio = document.getElementById("bio").value;

    const formData = {
      fullName: fullName,
      bio: bio,
    };

    updateProfile(formData);
  });

  function fetchUserProfile() {
    const apiUrl = `http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${userId}`;

    fetch(apiUrl, {
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
        document.getElementById("fullName").value = user.fullName;
        document.getElementById("bio").value = user.bio;
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        alert("Failed to fetch user profile. Please try again.");
      });
  }

  function updateProfile(formData) {
    const apiUrl = `http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${userId}`;

    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
        alert("Failed to update user profile. Please try again.");
      });
  }

  function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
  }
});
