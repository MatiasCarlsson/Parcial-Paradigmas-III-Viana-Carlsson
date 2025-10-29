/**
 * QuizMaster - Sistema de Trivia Educativa
 * Matías Viana Carlsson (MVC)
 *
 * Archivo: mvc_menu.js
 * Descripción: Menú hamburguesa responsive
 */

console.log("🍔 mvc_menu.js cargado correctamente");

/**
 * Inicializa el menú hamburguesa
 */
function mvc_inicializarMenu() {
  const hamburger = document.getElementById("mvcHamburger");
  const nav = document.getElementById("mvcNav");

  if (!hamburger || !nav) {
    return;
  }

  // Toggle menú al hacer click
  hamburger.addEventListener("click", function () {
    this.classList.toggle("mvc-active");
    nav.classList.toggle("mvc-active");

    // Accesibilidad
    const isExpanded = this.classList.contains("mvc-active");
    this.setAttribute("aria-expanded", isExpanded);
  });

  // Cerrar menú al hacer click en un link
  const navLinks = nav.querySelectorAll(".mvc-nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("mvc-active");
      nav.classList.remove("mvc-active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("mvc-active");
      nav.classList.remove("mvc-active");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}

// Inicializar cuando cargue el DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mvc_inicializarMenu);
} else {
  mvc_inicializarMenu();
}
