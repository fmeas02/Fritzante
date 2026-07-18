// =========================================================
// FRITZ ANTE — page "Les Moments"
// =========================================================

// ---- Menu mobile (burger) ----
const burgerBtn = document.getElementById("burgerBtn");
const navLinks = document.getElementById("navLinks");

burgerBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// ---- Bandeau cookies ----
const cookieBanner = document.getElementById("cookieBanner");
const cookieAccept = document.getElementById("cookieAccept");
const cookieRefuse = document.getElementById("cookieRefuse");

function hideCookieBanner() {
  cookieBanner.classList.add("hidden");
}

// Si l'utilisateur a déjà répondu, on ne réaffiche pas le bandeau
if (localStorage.getItem("fritzante_cookie_choice")) {
  hideCookieBanner();
}

cookieAccept.addEventListener("click", () => {
  localStorage.setItem("fritzante_cookie_choice", "accepted");
  hideCookieBanner();
});

cookieRefuse.addEventListener("click", () => {
  localStorage.setItem("fritzante_cookie_choice", "refused");
  hideCookieBanner();
});

// ---- Apparition des cartes "Moments" au scroll ----
const cards = document.querySelectorAll(".moment-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // petit décalage pour un effet en cascade
        setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, index * 60);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

cards.forEach((card) => observer.observe(card));

// ---- Barre d'outils : bascule vue grille / vue liste (défilement horizontal) ----
document.querySelectorAll(".shelf-toolbar").forEach((toolbar) => {
  const grid = toolbar.nextElementSibling; // le .shelf-grid juste après
  const [gridBtn, listBtn] = toolbar.querySelectorAll(".view-btn");
  if (!grid || !gridBtn || !listBtn) return;

  gridBtn.addEventListener("click", () => {
    grid.classList.remove("shelf-grid--list");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
  });

  listBtn.addEventListener("click", () => {
    grid.classList.add("shelf-grid--list");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
  });
});
