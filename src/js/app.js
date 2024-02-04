const sideMenu = document.querySelector("aside");
const profileBtn = document.querySelector("#profile-btn");
const themeToggler = document.querySelector(".theme-toggler");
const nextDay = document.getElementById("nextDay");
const prevDay = document.getElementById("prevDay");

profileBtn.onclick = function () {
  sideMenu.classList.toggle("active");
};

window.onscroll = () => {
  sideMenu.classList.remove("active");
  if (window.scrollY > 0) {
    document.querySelector("header").classList.add("active");
  } else {
    document.querySelector("header").classList.remove("active");
  }
};

// Function to set the theme
function setTheme(theme) {
  document.body.classList.toggle("dark-theme", theme === "dark");
  themeToggler
    .querySelector("span:nth-child(1)")
    .classList.toggle("active", theme === "light");
  themeToggler
    .querySelector("span:nth-child(2)")
    .classList.toggle("active", theme === "dark");
}

// Function to toggle theme
function toggleTheme() {
  const isDarkMode = document.body.classList.contains("dark-theme");
  const newTheme = isDarkMode ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  setTheme(newTheme);
}

// Add event listener to the theme toggler
themeToggler.addEventListener("click", toggleTheme);

// Check if theme preference is stored in localStorage
const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  setTheme(storedTheme);
} else {
  // Default to light theme if no theme preference is found
  setTheme("light");
}

let setData = (day) => {
  document.querySelector("table tbody").innerHTML = " "; //To clear out previous table data;
  let daylist = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  document.querySelector(".timetable div h2").innerHTML = daylist[day];
  switch (day) {
    case 0:
      day = Sunday;
      break;
    case 1:
      day = Monday;
      break;
    case 2:
      day = Tuesday;
      break;
    case 3:
      day = Wednesday;
      break;
    case 4:
      day = Thursday;
      break;
    case 5:
      day = Friday;
      break;
    case 6:
      day = Saturday;
      break;
  }

  day.forEach((sub) => {
    const tr = document.createElement("tr");
    const trContent = `
                            <td>${sub.time}</td>
                            <td>${sub.roomNumber}</td>
                            <td>${sub.subject}</td>
                            <td>${sub.type}</td>
                        `;
    tr.innerHTML = trContent;
    document.querySelector("table tbody").appendChild(tr);
  });
};

let now = new Date();
let today = now.getDay(); // Will return the present day in numerical value;
let day = today; //To prevent the today value from changing;

function timeTableAll() {
  document.getElementById("timetable").classList.toggle("active");
  setData(today);
  document.querySelector(".timetable div h2").innerHTML = "Today's Timetable";
}
nextDay.onclick = function () {
  day <= 5 ? day++ : (day = 0); // If else one liner
  setData(day);
};
prevDay.onclick = function () {
  day >= 1 ? day-- : (day = 6);
  setData(day);
};

setData(day); //To set the data in the table on loading window.
document.querySelector(".timetable div h2").innerHTML = "Today's Timetable"; //To prevent overwriting the heading on loading;

// Logout Confirmation
function confirmLogout() {
  // Display a confirmation dialog
  if (confirm("Are you sure you want to log out?")) {
    // Show logout message
    alert("You've been logged out.");

    // If the user confirms, redirect to the logout page
    window.location.href = "login.html";

    // Return true to proceed with logout
    return true;
  }

  // If the user cancels, return false
  return false;
}

/* This is where Haqq comes in */

// ("use strict");
// Course data (you can replace this with data fetched from a server or database)
// const courses = [
//   { id: 1, name: "Engineering Graphics" },
//   { id: 2, name: "Linear Algebra" },
//   { id: 3, name: "C++ Programming" },
//   { id: 4, name: "Database System Design" },
//   { id: 5, name: "Digital Circuit" },
//   { id: 6, name: "Discrete Mathematics" },
//   { id: 7, name: "Algorithms and Data Structures" },
//   { id: 8, name: "Computer Networks" },
//   { id: 9, name: "Operating Systems" },
//   { id: 10, name: "Software Engineering" },
//   { id: 11, name: "Machine Learning" },
//   { id: 12, name: "Artificial Intelligence" },
// ];

// // Function to generate the course list
// function generateCourseList() {
//   const courseList = document.getElementById("courseList");
//   if (!courseList) {
//     console.error("Course list element not found.");
//     return;
//   }
//   courseList.innerHTML = ""; // Clear previous list

//   courses.forEach((course) => {
//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.id = `course-${course.id}`;
//     checkbox.value = course.name;

//     const label = document.createElement("label");
//     label.htmlFor = `course-${course.id}`;
//     label.textContent = course.name;

//     const listItem = document.createElement("div");
//     listItem.classList.add("course-item");
//     listItem.appendChild(checkbox);
//     listItem.appendChild(label);

//     courseList.appendChild(listItem);
//   });
// }

// // Registered courses array
// let registeredCourses = [];

// // Function to print registered courses
// function printRegisteredCourses() {
//   if (registeredCourses.length === 0) {
//     alert("You haven't registered for any courses yet.");
//   } else {
//     const message = "Registered Courses:\n" + registeredCourses.join("\n");
//     alert(message);
//   }
// }

// // Delay execution of generateCourseList until DOM is fully loaded
// document.addEventListener("DOMContentLoaded", function () {
//   generateCourseList();
// });

// // Add event listener to the print button
// document
//   .getElementById("printCoursesBtn")
//   .addEventListener("click", printRegisteredCourses);

// // Add event listener to the course checkboxes
// document
//   .querySelectorAll('.course-item input[type="checkbox"]')
//   .forEach((checkbox) => {
//     checkbox.addEventListener("change", function () {
//       if (this.checked) {
//         // Add course to registered courses
//         registeredCourses.push(this.value);
//       } else {
//         // Remove course from registered courses
//         const index = registeredCourses.indexOf(this.value);
//         if (index !== -1) {
//           registeredCourses.splice(index, 1);
//         }
//       }
//     });
//   });
