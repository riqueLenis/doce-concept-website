const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  // Toggle do menu
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.4
        }s`;
      }
    });

    burger.classList.toggle("toggle");
  });

  // Fechar ao clicar fora do menu
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove("nav-active");
      burger.classList.remove("toggle");
      navLinks.forEach((link) => (link.style.animation = ""));
    }
  });
};

navSlide();

// Pula para 30 segundos do vídeo principal quando carrega
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
  heroVideo.addEventListener("loadedmetadata", () => {
    if (heroVideo.duration > 30) heroVideo.currentTime = 30;
  });
}
