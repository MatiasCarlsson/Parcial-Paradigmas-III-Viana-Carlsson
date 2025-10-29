/**
 * QuizMaster - Sistema de Trivia Educativa
 * Matías Viana Carlsson (MVC)
 *
 * Archivo: mvc_app.js
 * Descripción: Controlador principal de la aplicación
 */

// ===================================
// INICIALIZACIÓN
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🎯 QuizMaster - Inicializando aplicación...");

  // Renderizar preguntas al cargar la página
  mvc_renderizarPreguntas();

  // Configurar event listeners
  mvc_configurarEventListeners();

  console.log("✅ Aplicación inicializada correctamente");
});

// ===================================
// CONFIGURACIÓN DE EVENT LISTENERS
// ===================================

/**
 * Configura todos los event listeners de la aplicación
 */
function mvc_configurarEventListeners() {
  // Form submit
  const form = document.getElementById("mvcFormQuiz");
  if (form) {
    form.addEventListener("submit", mvc_procesarFormulario);
  }

  console.log("✅ Event listeners configurados");
}

console.log("📦 mvc_app.js cargado correctamente");
