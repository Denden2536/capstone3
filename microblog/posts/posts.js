"use strict";

const loginData = getLoginData();

document.addEventListener("DOMContentLoaded", function () {
  const postsContainer = document.getElementById("postsContainer");
  const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", function () {
    logout();
  });

  fetch(`${apiBaseURL}/api/posts`, {
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((posts) => {
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("col-md-6", "col-lg-4", "mb-4");
        postElement.innerHTML = `
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${post.username}</h5>
              <p class="card-text">${post.text}</p>
              <p class="card-text"><small class="text-muted">${new Date(
                post.createdAt
              ).toLocaleString()}</small></p>
            </div>
          </div>
        `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
});
