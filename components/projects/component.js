import { projects } from "./data.js";

export function renderProjects(containerId) {
  const container = document.querySelector(`#${containerId} .project-slider-container`);
  const modal = document.getElementById("project-modal");
  const modalTitle = document.getElementById("project-title");
  const modalInstructor = document.getElementById("project-instructor");
  const modalDuration = document.getElementById("project-duration");
  const modalTech = document.getElementById("project-tech");
  const modalGithub = document.getElementById("project-github");
  const modalPoints = document.getElementById("project-points");
  const closeBtn = document.querySelector(".project-modal-close");

  if (!container || !modal) return;

  // Extended list for circular effect
  const extendedProjects = [
    projects[projects.length - 1], 
    ...projects,
    projects[0] 
  ];

  // Create cards
  extendedProjects.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.dataset.index = index;

    card.innerHTML = `
      <h3>${project.title}</h3>
      <p><strong>Instructor:</strong> ${project.instructor}</p>
      <p><strong>Duration:</strong> ${project.duration}</p>
      <p><em>${project.points[0]}</em></p>
    `;

    card.addEventListener("click", () => {
      modalTitle.textContent = project.title;
      modalInstructor.textContent = project.instructor;
      modalDuration.textContent = project.duration;
      modalTech.textContent = project.techStack;
      modalGithub.innerHTML = `<a href="${project.github}" target="_blank">View GitHub Repo</a>`;
      modalPoints.innerHTML = project.points.map(p => `<li>${p}</li>`).join("");
      modal.classList.remove("hidden");
    });

    container.appendChild(card);
  });

  // Modal close
  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  window.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  const allCards = container.querySelectorAll(".project-card");
  const cardWidth = allCards[0].offsetWidth + 16;
  let currentIndex = 1;

  const dotsContainer = document.getElementById("project-dots");
  const dots = [];

  // Create navigation dots
  for (let i = 0; i < projects.length; i++) {
    const dot = document.createElement("span");
    dot.classList.add("project-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i + 1;
      scrollToIndex(currentIndex);
    });
    dotsContainer.appendChild(dot);
    dots.push(dot);
  }

  function scrollToIndex(index, smooth = true) {
    const behavior = smooth ? "smooth" : "auto";
    container.scrollTo({ left: cardWidth * (index - 1), behavior });

    allCards.forEach(card => card.classList.remove("active"));
    if (allCards[index]) allCards[index].classList.add("active");

    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[index - 1]) dots[index - 1].classList.add("active");
  }

  // Initial scroll
  scrollToIndex(currentIndex, false);

  function autoScroll() {
    currentIndex++;
    scrollToIndex(currentIndex);
    if (currentIndex === extendedProjects.length - 1) {
      setTimeout(() => {
        currentIndex = 1;
        scrollToIndex(currentIndex, false);
      }, 500);
    }
  }

  setInterval(autoScroll, 3000);
}
