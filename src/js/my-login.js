"use strict";

$("input[type='password'][data-eye]").each(function (i) {
  var $this = $(this),
    id = "eye-password-" + i,
    el = $("#" + id);

  $this.wrap(
    $("<div/>", {
      style: "position:relative",
      id: id,
    })
  );

  $this.css({
    paddingRight: 60,
  });
  $this.after(
    $("<div/>", {
      html: "Show",
      class: "btn btn-primary btn-sm",
      id: "passeye-toggle-" + i,
    }).css({
      position: "absolute",
      right: 10,
      top: $this.outerHeight() / 2 - 12,
      padding: "2px 7px",
      fontSize: 12,
      cursor: "pointer",
    })
  );

  $this.after(
    $("<input/>", {
      type: "hidden",
      id: "passeye-" + i,
    })
  );

  var invalid_feedback = $this.parent().parent().find(".invalid-feedback");

  if (invalid_feedback.length) {
    $this.after(invalid_feedback.clone());
  }

  $this.on("keyup paste", function () {
    $("#passeye-" + i).val($(this).val());
  });
  $("#passeye-toggle-" + i).on("click", function () {
    if ($this.hasClass("show")) {
      $this.attr("type", "password");
      $this.removeClass("show");
      $(this).removeClass("btn-outline-primary");
    } else {
      $this.attr("type", "text");
      $this.val($("#passeye-" + i).val());
      $this.addClass("show");
      $(this).addClass("btn-outline-primary");
    }
  });
});

$(".my-login-validation").submit(function () {
  var form = $(this);
  if (form[0].checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }
  form.addClass("was-validated");
});

// Dark mode functionality
const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "true");
    darkModeToggle.textContent = "Light Mode";
    darkModeToggle.classList.add("light-mode");
  } else {
    localStorage.setItem("dark-mode", "false");
    darkModeToggle.textContent = "Dark Mode";
    darkModeToggle.classList.remove("light-mode");
  }
});

// Check if dark mode is enabled in local storage
if (localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark-mode");
  darkModeToggle.textContent = "Light Mode";
  darkModeToggle.classList.add("light-mode");
}

// Sample user data
const sampleUsers = [
  {
    email: "arthur@engineering.com",
    password: "redbull",
  },
  {
    email: "someone@engineering.com",
    password: "bumblebee",
  },
];

// Store sample users in local storage
localStorage.setItem("sampleUsers", JSON.stringify(sampleUsers));

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".my-login-validation");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");

  // Load sample users from local storage
  const sampleUsers = JSON.parse(localStorage.getItem("sampleUsers"));

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Check if the entered email and password match any sample user
    const isValidUser = sampleUsers.some(
      (user) => user.email === email && user.password === password
    );
    if (isValidUser) {
      window.location.href = "dashboard.html";
    } else {
      // Show an error message
      alert("Invalid email or password");
    }
  });
});
