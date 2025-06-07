import { experiences } from './data.js';

export function renderExperiences(containerId) {
  const container = document.querySelector(`#${containerId} .experience-scroll-container`);
  const modal = document.getElementById("experience-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalRole = document.getElementById("modal-role");
  const modalDuration = document.getElementById("modal-duration");
  const modalLocation = document.getElementById("modal-location");
  const modalTech = document.getElementById("modal-tech");
  const modalPoints = document.getElementById("modal-points");
  const closeBtn = document.querySelector(".modal-close");

  if (!container || !modal) return;

  experiences.forEach((exp, index) => {
    const card = document.createElement("div");
    card.className = "experience-card";
    card.dataset.index = index;

    card.innerHTML = `
      <h3>${exp.title}</h3>
      <h4>${exp.role}</h4>
      <p><strong>Tech Stack:</strong> ${exp.techStack}</p>
      <p><em>${exp.points[0]}</em></p>
    `;

    card.addEventListener("click", () => {
      modalTitle.textContent = exp.title;
      modalRole.textContent = exp.role;
      modalDuration.textContent = exp.duration;
      modalLocation.textContent = exp.location;
      modalTech.textContent = exp.techStack;
      modalPoints.innerHTML = exp.points.map(p => `<li>${p}</li>`).join('');
      modal.classList.remove("hidden");
    });

    container.appendChild(card);
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
}
