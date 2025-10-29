/**
 * QuizMaster - Sistema de Trivia Educativa
 * Matías Viana Carlsson (MVC)
 *
 * Archivo: mvc_game.js
 * Descripción: Lógica del quiz con 15 preguntas de programación básica
 */

// BANCO DE PREGUNTAS - PROGRAMACIÓN BÁSICA
// 15 preguntas sobre programación básica

const MVC_PREGUNTAS = [
  {
    id: 1,
    texto: "¿Qué es una variable en programación?",
    opciones: [
      "Un contenedor para almacenar datos",
      "Una función que realiza cálculos",
      "Un tipo de dato específico",
      "Un bucle que repite código",
    ],
    correcta: 0,
  },
  {
    id: 2,
    texto: "¿Cuál de los siguientes es un lenguaje de programación?",
    opciones: ["HTML", "CSS", "Python", "JSON"],
    correcta: 2,
  },
  {
    id: 3,
    texto: "¿Qué significa HTML?",
    opciones: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
    ],
    correcta: 0,
  },
  {
    id: 4,
    texto: "¿Cuál es la etiqueta correcta para crear un párrafo en HTML?",
    opciones: ["<p>", "<paragraph>", "<text>", "<para>"],
    correcta: 0,
  },
  {
    id: 5,
    texto: "¿Qué propiedad CSS se usa para cambiar el color del texto?",
    opciones: ["color", "text-color", "font-color", "text-style"],
    correcta: 0,
  },
  {
    id: 6,
    texto: "¿Cuál es el operador de igualdad estricta en JavaScript?",
    opciones: ["===", "==", "=", "!=="],
    correcta: 0,
  },
  {
    id: 7,
    texto: "¿Qué función se usa en JavaScript para imprimir en la consola?",
    opciones: ["console.log()", "print()", "echo()", "write()"],
    correcta: 0,
  },
  {
    id: 8,
    texto: "¿Con qué símbolo comienza una variable en PHP?",
    opciones: ["$", "#", "@", "&"],
    correcta: 0,
  },
  {
    id: 9,
    texto: "¿Qué significa CSS?",
    opciones: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets",
    ],
    correcta: 0,
  },
  {
    id: 10,
    texto: "¿Cuál es el método correcto para incluir un archivo JavaScript externo en HTML?",
    opciones: [
      '<script src="archivo.js"></script>',
      '<js src="archivo.js"></js>',
      '<link src="archivo.js">',
      '<include src="archivo.js">',
    ],
    correcta: 0,
  },
  {
    id: 11,
    texto: "¿Qué estructura de control se usa para repetir código en programación?",
    opciones: ["Bucles (for, while)", "Condicionales (if, else)", "Funciones", "Variables"],
    correcta: 0,
  },
  {
    id: 12,
    texto: "¿Cuál es la forma correcta de comentar una línea en PHP?",
    opciones: ["// comentario", "<!-- comentario -->", "/* comentario", "# comentario"],
    correcta: 0,
  },
  {
    id: 13,
    texto: "¿Qué propiedad CSS se usa para cambiar el tamaño de fuente?",
    opciones: ["font-size", "text-size", "size", "font-weight"],
    correcta: 0,
  },
  {
    id: 14,
    texto: "¿Cuál es el tipo de dato que representa verdadero o falso?",
    opciones: ["Boolean", "String", "Integer", "Float"],
    correcta: 0,
  },
  {
    id: 15,
    texto: "¿Qué atributo HTML se usa para definir estilos en línea?",
    opciones: ["style", "class", "css", "format"],
    correcta: 0,
  },
];

// VARIABLES GLOBALES DEL JUEGO

const MVC_GAME = {
  respuestasUsuario: [], // Array para guardar respuestas del usuario
  correctas: 0,
  incorrectas: 0,
  tiempoInicio: null,
  tiempoLimite: 600, // 10 minutos en segundos
  timerInterval: null,
  tiempoTerminado: false,
};

// RENDERIZAR PREGUNTAS EN EL DOM

/**
 * Renderiza las 15 preguntas en el formulario
 */
function mvc_renderizarPreguntas() {
  console.log("📝 Renderizando 15 preguntas...");

  const container = document.getElementById("mvcPreguntasContainer");
  if (!container) {
    console.error("❌ No se encontró el contenedor de preguntas");
    return;
  }

  container.innerHTML = ""; // Limpiar contenedor

  // Crear cada pregunta
  MVC_PREGUNTAS.forEach((pregunta, index) => {
    const preguntaCard = document.createElement("div");
    preguntaCard.className = "mvc-pregunta-card";
    preguntaCard.id = `mvc-pregunta-${pregunta.id}`;

    // Número de pregunta
    const numeroPregunta = document.createElement("div");
    numeroPregunta.className = "mvc-pregunta-numero";
    numeroPregunta.textContent = `Pregunta ${index + 1}`;

    // Texto de la pregunta
    const textoPregunta = document.createElement("h3");
    textoPregunta.className = "mvc-pregunta-texto";
    textoPregunta.textContent = pregunta.texto;

    // Contenedor de opciones
    const opcionesContainer = document.createElement("div");
    opcionesContainer.className = "mvc-opciones-container";

    // Crear cada opción
    pregunta.opciones.forEach((opcion, opcionIndex) => {
      const opcionLabel = document.createElement("label");
      opcionLabel.className = "mvc-opcion-label";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `mvc_pregunta_${pregunta.id}`;
      radio.value = opcionIndex;
      radio.className = "mvc-radio";
      radio.dataset.preguntaId = pregunta.id;
      radio.dataset.correcta = pregunta.correcta;

      // Event listener para verificar en tiempo real
      radio.addEventListener("change", function () {
        mvc_verificarRespuestaEnTiempoReal(this);
      });

      const radioCustom = document.createElement("span");
      radioCustom.className = "mvc-radio-custom";

      const textoOpcion = document.createElement("span");
      textoOpcion.className = "mvc-opcion-texto";
      textoOpcion.textContent = opcion;

      const iconoResultado = document.createElement("span");
      iconoResultado.className = "mvc-icon-resultado";
      iconoResultado.style.display = "none";

      opcionLabel.appendChild(radio);
      opcionLabel.appendChild(radioCustom);
      opcionLabel.appendChild(textoOpcion);
      opcionLabel.appendChild(iconoResultado);

      opcionesContainer.appendChild(opcionLabel);
    });

    // Ensamblar la tarjeta
    preguntaCard.appendChild(numeroPregunta);
    preguntaCard.appendChild(textoPregunta);
    preguntaCard.appendChild(opcionesContainer);

    container.appendChild(preguntaCard);
  });

  console.log("✅ Preguntas renderizadas correctamente");

  // Iniciar temporizador
  mvc_iniciarTemporizador();
}

// TEMPORIZADOR

/**
 * Inicia el temporizador de 10 minutos
 */
function mvc_iniciarTemporizador() {
  MVC_GAME.tiempoInicio = Date.now();

  // Actualizar cada segundo
  MVC_GAME.timerInterval = setInterval(() => {
    const tiempoTranscurrido = Math.floor((Date.now() - MVC_GAME.tiempoInicio) / 1000);
    const tiempoRestante = MVC_GAME.tiempoLimite - tiempoTranscurrido;

    if (tiempoRestante <= 0) {
      mvc_terminarPorTiempo();
    } else {
      mvc_actualizarDisplayTimer(tiempoRestante);
    }
  }, 1000);
}

/**
 * Actualiza el display del temporizador
 * @param {number} segundos - Segundos restantes
 */
function mvc_actualizarDisplayTimer(segundos) {
  const minutos = Math.floor(segundos / 60);
  const segs = segundos % 60;
  const display = `${minutos}:${segs.toString().padStart(2, "0")}`;

  const timerElement = document.getElementById("mvcTimer");
  if (timerElement) {
    timerElement.textContent = display;

    // Cambiar color si quedan menos de 2 minutos
    if (segundos < 120) {
      timerElement.style.color = "var(--mvc-error)";
      timerElement.classList.add("mvc-animate-pulse");
    }
  }
}

/**
 * Termina el quiz por tiempo agotado
 */
function mvc_terminarPorTiempo() {
  clearInterval(MVC_GAME.timerInterval);
  MVC_GAME.tiempoTerminado = true;

  alert("⏰ ¡Tiempo agotado! El quiz se enviará automáticamente.");

  // Auto-submit del formulario
  const form = document.getElementById("mvcFormQuiz");
  if (form) {
    form.dispatchEvent(new Event("submit", { cancelable: true }));
  }
}

// VERIFICACIÓN EN TIEMPO REAL

/**
 * Verifica si la respuesta seleccionada es correcta
 * y marca visualmente al lado de la opción
 * @param {HTMLElement} radioInput - Input radio seleccionado
 */
function mvc_verificarRespuestaEnTiempoReal(radioInput) {
  const preguntaId = parseInt(radioInput.dataset.preguntaId);
  const respuestaCorrecta = parseInt(radioInput.dataset.correcta);
  const respuestaUsuario = parseInt(radioInput.value);
  const esCorrecta = respuestaUsuario === respuestaCorrecta;

  console.log(`Pregunta ${preguntaId}: ${esCorrecta ? "✅ Correcta" : "❌ Incorrecta"}`);

  // Obtener el label padre
  const label = radioInput.closest(".mvc-opcion-label");
  const icono = label.querySelector(".mvc-icon-resultado");

  // Limpiar todas las opciones de esta pregunta primero
  const todasOpciones = document.querySelectorAll(`input[name="mvc_pregunta_${preguntaId}"]`);
  todasOpciones.forEach((opt) => {
    const optLabel = opt.closest(".mvc-opcion-label");
    optLabel.classList.remove("mvc-correct", "mvc-incorrect");
    const optIcono = optLabel.querySelector(".mvc-icon-resultado");
    optIcono.style.display = "none";
  });

  // Marcar la opción seleccionada
  if (esCorrecta) {
    label.classList.add("mvc-correct");
    label.classList.remove("mvc-incorrect");
    icono.textContent = "✓";
    icono.className = "mvc-icon-resultado mvc-icon-correct";
  } else {
    label.classList.add("mvc-incorrect");
    label.classList.remove("mvc-correct");
    icono.textContent = "✗";
    icono.className = "mvc-icon-resultado mvc-icon-incorrect";
  }

  icono.style.display = "inline-flex";

  // Guardar respuesta del usuario
  mvc_guardarRespuestaUsuario(preguntaId, respuestaUsuario, esCorrecta);
}

/**
 * Guarda la respuesta del usuario en el array global
 * @param {number} preguntaId - ID de la pregunta
 * @param {number} respuesta - Índice de la opción seleccionada
 * @param {boolean} esCorrecta - Si es correcta o no
 */
function mvc_guardarRespuestaUsuario(preguntaId, respuesta, esCorrecta) {
  // Buscar si ya existe una respuesta para esta pregunta
  const index = MVC_GAME.respuestasUsuario.findIndex((r) => r.preguntaId === preguntaId);

  const respuestaData = {
    preguntaId: preguntaId,
    respuesta: respuesta,
    esCorrecta: esCorrecta,
  };

  if (index !== -1) {
    // Actualizar respuesta existente
    MVC_GAME.respuestasUsuario[index] = respuestaData;
  } else {
    // Agregar nueva respuesta
    MVC_GAME.respuestasUsuario.push(respuestaData);
  }

  console.log("💾 Respuesta guardada:", respuestaData);
}

// PROCESAR FORMULARIO

/**
 * Calcula y muestra los resultados finales
 * @param {Event} e - Evento de submit del formulario
 */
function mvc_procesarFormulario(e) {
  e.preventDefault();

  console.log("📊 Procesando resultados...");

  // Mostrar loading en botón
  const btnSubmit = document.getElementById("mvcBtnSubmit");
  const btnText = btnSubmit.querySelector(".mvc-btn-text");
  const btnSpinner = btnSubmit.querySelector(".mvc-spinner");

  btnSubmit.disabled = true;
  btnText.textContent = "Procesando...";
  btnSpinner.style.display = "inline-block";

  // Detener temporizador
  if (MVC_GAME.timerInterval) {
    clearInterval(MVC_GAME.timerInterval);
  }

  // Validar que todas las preguntas estén respondidas
  const todasRespondidas = MVC_GAME.respuestasUsuario.length === MVC_PREGUNTAS.length;

  if (!todasRespondidas && !MVC_GAME.tiempoTerminado) {
    const faltantes = MVC_PREGUNTAS.length - MVC_GAME.respuestasUsuario.length;
    alert(`⚠️ Faltan ${faltantes} pregunta(s) por responder`);

    // Restaurar botón
    btnSubmit.disabled = false;
    btnText.textContent = "Enviar Respuestas";
    btnSpinner.style.display = "none";

    // Reiniciar temporizador si no se terminó por tiempo
    if (!MVC_GAME.tiempoTerminado) {
      MVC_GAME.tiempoInicio =
        Date.now() -
        (MVC_GAME.tiempoLimite -
          parseInt(document.getElementById("mvcTimer").textContent.split(":")[0]) * 60 -
          parseInt(document.getElementById("mvcTimer").textContent.split(":")[1])) *
          1000;
    }
    return;
  }

  // Simular delay de procesamiento
  setTimeout(() => {
    // Calcular correctas e incorrectas
    MVC_GAME.correctas = MVC_GAME.respuestasUsuario.filter((r) => r.esCorrecta).length;
    MVC_GAME.incorrectas = MVC_PREGUNTAS.length - MVC_GAME.correctas;

    // Calcular porcentaje y nota
    const porcentaje = mvc_calcularPorcentaje(MVC_GAME.correctas, MVC_PREGUNTAS.length);
    let nota = mvc_calcularNota(porcentaje);

    // Penalización por tiempo terminado
    if (MVC_GAME.tiempoTerminado) {
      nota = Math.max(1.0, nota - 1.0); // Reducir 1 punto
      console.log("⚠️ Penalización por tiempo: -1.0 punto");
    }

    // Mostrar resultados
    mvc_mostrarResultados(MVC_GAME.correctas, MVC_GAME.incorrectas, nota, MVC_GAME.tiempoTerminado);

    // Restaurar botón
    btnSubmit.disabled = false;
    btnText.textContent = "Enviar Respuestas";
    btnSpinner.style.display = "none";

    // Scroll suave hacia resultados
    document.getElementById("mvcResultados").scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    console.log("✅ Resultados mostrados:", {
      correctas: MVC_GAME.correctas,
      incorrectas: MVC_GAME.incorrectas,
      porcentaje: porcentaje + "%",
      nota: nota,
      penalizado: MVC_GAME.tiempoTerminado,
    });

    // Guardar en la BD automáticamente
    mvc_guardarEnBD();
  }, 800); // Delay de 800ms para mostrar loading
}

/**
 * Muestra los resultados en el DOM
 * @param {number} correctas - Cantidad de respuestas correctas
 * @param {number} incorrectas - Cantidad de respuestas incorrectas
 * @param {number} nota - Nota final calculada
 * @param {boolean} penalizado - Si fue penalizado por tiempo
 */
function mvc_mostrarResultados(correctas, incorrectas, nota, penalizado = false) {
  const resultadosDiv = document.getElementById("mvcResultados");
  resultadosDiv.style.display = "block";

  document.getElementById("mvcCorrectCount").textContent = correctas;
  document.getElementById("mvcIncorrectCount").textContent = incorrectas;
  document.getElementById("mvcNotaFinal").textContent = nota.toFixed(1);

  // Mostrar mensaje de penalización si aplica
  if (penalizado) {
    const penalizacionMsg = document.createElement("div");
    penalizacionMsg.className = "mvc-penalizacion-msg";
    penalizacionMsg.innerHTML = "⚠️ <strong>Penalización por tiempo:</strong> -1.0 punto";
    resultadosDiv.insertBefore(penalizacionMsg, resultadosDiv.firstChild.nextSibling);
  }

  // Agregar clase de animación
  resultadosDiv.classList.add("mvc-animate-fadeIn");
}

/**
 * Calcula la nota final en escala chilena (1.0 - 7.0)
 * @param {number} porcentaje - Porcentaje de acierto
 * @returns {number} Nota calculada
 */
function mvc_calcularNota(porcentaje) {
  if (porcentaje >= 95) return 7.0;
  if (porcentaje >= 85) return 6.5;
  if (porcentaje >= 75) return 6.0;
  if (porcentaje >= 65) return 5.5;
  if (porcentaje >= 55) return 5.0;
  if (porcentaje >= 45) return 4.5;
  if (porcentaje >= 35) return 4.0;
  return 3.5;
}

// GUARDAR EN BASE DE DATOS (FUTURO)

/**
 * Guarda la partida completa en la base de datos
 */
function mvc_guardarEnBD() {
  console.log("💾 Guardando partida en BD...");

  const nombre = document.getElementById("mvcNombreJugador").value.trim();

  if (!nombre) {
    alert("⚠️ Debes ingresar tu nombre");
    return;
  }

  // Preparar datos
  const respuestasParaBD = MVC_GAME.respuestasUsuario.map((r) => ({
    preguntaId: r.preguntaId,
    respuesta: String.fromCharCode(65 + r.respuesta), // Convertir 0,1,2,3 a A,B,C,D
    esCorrecta: r.esCorrecta,
  }));

  const formData = new URLSearchParams();
  formData.append("accion", "guardar_partida");
  formData.append("nombre", nombre);
  formData.append("correctas", MVC_GAME.correctas);
  formData.append("incorrectas", MVC_GAME.incorrectas);
  formData.append("respuestas", JSON.stringify(respuestasParaBD));

  // Enviar a PHP
  fetch("mvc_procesar/mvc_quiz.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("✅ Partida guardada:", data);
        alert(`✅ Partida guardada!\nNota: ${data.nota}\nPorcentaje: ${data.porcentaje}%`);
      } else {
        console.error("❌ Error:", data.error);
      }
    })
    .catch((error) => {
      console.error("❌ Error:", error);
    });
}

// Exportar funciones globales
window.mvc_renderizarPreguntas = mvc_renderizarPreguntas;
window.mvc_procesarFormulario = mvc_procesarFormulario;

console.log("✅ mvc_game.js cargado correctamente");
