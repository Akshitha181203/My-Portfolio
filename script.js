import { renderExperiences } from "./components/experience/component.js";
import { renderProjects } from "./components/projects/component.js";

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;
  const fillBars = document.querySelectorAll(".fill");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  // Apply hamburger menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Apply saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    if (toggle) toggle.checked = true;
  }

  // Toggle dark/light mode
  if (toggle) {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        body.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        body.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    });
  }

  renderExperiences("experiences");
  renderProjects("projects");
  const skillBars = document.querySelectorAll(".fill");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = fill.dataset.width;
          observer.unobserve(fill);
        }
      });
    },
    { threshold: 0.6 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
});
