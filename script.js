document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;
  const fillBars = document.querySelectorAll(".fill");
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // Apply hamburger menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
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

  // Animate skill bars on scroll
  function animateBars() {
    fillBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      if (isVisible && !bar.classList.contains("animated")) {
        bar.style.width = bar.dataset.width;
        bar.classList.add("animated");
      }
    });
  }

  window.addEventListener("scroll", animateBars);
  animateBars();
});
