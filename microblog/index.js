"use strict";
const loginLink = document.querySelector("#loginLink");
const greetingSpan = document.querySelector("#greetingSpan");
if (isLoggedIn() == true) {
  loginLink.style.display = "none";
} else {
  greetingSpan.style.display = "none";
}
