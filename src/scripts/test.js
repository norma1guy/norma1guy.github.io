const box = document.querySelector("#box");
const scene = document.querySelector(".scene");

window.addEventListener("scroll", () => {
  const rect = scene.getBoundingClientRect();

  const sceneHeight = scene.offsetHeight;
  const viewportHeight = window.innerHeight;

  // How far we've scrolled through the scene
  let progress = -rect.top / (sceneHeight - viewportHeight);

  // Keep between 0 and 1
  progress = Math.max(0, Math.min(1, progress));

  // Move from 0px → 80vw
  const x = progress * (window.innerWidth * 0.8);

  // Rotate 0° → 360°
  const rotation = progress * 360;

  box.style.transform =
    `translate(${x}px, -50%) rotate(${rotation}deg)`;

  // Change color halfway through
  if (progress < 0.5) {
    box.style.background = "#4f46e5";
  } else {
    box.style.background = "#ec4899";
  }
});