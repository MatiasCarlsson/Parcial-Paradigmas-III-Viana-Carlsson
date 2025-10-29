/**
 * QuizMaster - Sistema de Trivia Educativa
 * Matías Viana Carlsson (MVC)
 *
 * Archivo: mvc_utils.js
 * Descripción: Funciones utilitarias y helpers
 */

console.log("📦 mvc_utils.js cargado correctamente");

/**
 * Formatea un número con separadores de miles
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado
 */
function mvc_formatearNumero(num) {
  return new Intl.NumberFormat("es-AR").format(num);
}

/**
 * Formatea una fecha
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} Fecha formateada
 */
function mvc_formatearFecha(fecha) {
  const date = fecha instanceof Date ? fecha : new Date(fecha);
  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Obtiene un emoji según la categoría
 * @param {string} categoria - Nombre de la categoría
 * @returns {string} Emoji correspondiente
 */
function mvc_obtenerEmojiCategoria(categoria) {
  const emojis = {
    ciencia: "🔬",
    historia: "📚",
    geografia: "🌍",
    arte: "🎨",
    deportes: "⚽",
  };
  return emojis[categoria] || "❓";
}

/**
 * Obtiene el color según la categoría
 * @param {string} categoria - Nombre de la categoría
 * @returns {string} Color en hexadecimal
 */
function mvc_obtenerColorCategoria(categoria) {
  const colores = {
    ciencia: "#10b981",
    historia: "#6366f1",
    geografia: "#f59e0b",
    arte: "#8b5cf6",
    deportes: "#ef4444",
  };
  return colores[categoria] || "#64748b";
}

/**
 * Mezcla aleatoriamente un array (Fisher-Yates shuffle)
 * @param {Array} array - Array a mezclar
 * @returns {Array} Array mezclado
 */
function mvc_mezclarArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
function mvc_validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Escapa HTML para prevenir XSS
 * @param {string} text - Texto a escapar
 * @returns {string} Texto escapado
 */
function mvc_escaparHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Debounce para funciones
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función con debounce
 */
function mvc_debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Realiza una petición AJAX
 * @param {string} url - URL del endpoint
 * @param {Object} options - Opciones de la petición
 * @returns {Promise} Promesa con la respuesta
 */
async function mvc_ajax(url, options = {}) {
  const defaultOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error en petición AJAX:", error);
    throw error;
  }
}

/**
 * Muestra una notificación temporal
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo: 'success', 'error', 'info'
 */
function mvc_mostrarNotificacion(mensaje, tipo = "info") {
  // Esta función se implementará completamente en Fase 2
  console.log(`📢 [${tipo.toUpperCase()}] ${mensaje}`);

  // Placeholder para futuras notificaciones toast
  alert(mensaje);
}

/**
 * Calcula el porcentaje
 * @param {number} parte - Parte
 * @param {number} total - Total
 * @returns {number} Porcentaje con 2 decimales
 */
function mvc_calcularPorcentaje(parte, total) {
  if (total === 0) return 0;
  return Math.round((parte / total) * 100 * 100) / 100;
}

/**
 * Obtiene el mensaje según el puntaje
 * @param {number} porcentaje - Porcentaje de acierto
 * @returns {string} Mensaje motivacional
 */
function mvc_obtenerMensajePorcentaje(porcentaje) {
  if (porcentaje >= 90) return "🏆 ¡Excelente! Eres un maestro del conocimiento";
  if (porcentaje >= 75) return "🌟 ¡Muy bien! Tienes un gran conocimiento";
  if (porcentaje >= 60) return "👍 ¡Bien hecho! Vas por buen camino";
  if (porcentaje >= 40) return "📚 Puedes mejorar, ¡sigue practicando!";
  return "💪 No te rindas, la práctica hace al maestro";
}

// Exportar funciones para uso global
window.mvc_formatearNumero = mvc_formatearNumero;
window.mvc_formatearFecha = mvc_formatearFecha;
window.mvc_obtenerEmojiCategoria = mvc_obtenerEmojiCategoria;
window.mvc_obtenerColorCategoria = mvc_obtenerColorCategoria;
window.mvc_mezclarArray = mvc_mezclarArray;
window.mvc_validarEmail = mvc_validarEmail;
window.mvc_escaparHTML = mvc_escaparHTML;
window.mvc_debounce = mvc_debounce;
window.mvc_ajax = mvc_ajax;
window.mvc_mostrarNotificacion = mvc_mostrarNotificacion;
window.mvc_calcularPorcentaje = mvc_calcularPorcentaje;
window.mvc_obtenerMensajePorcentaje = mvc_obtenerMensajePorcentaje;
