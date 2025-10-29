<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuizMaster - Programación Básica</title>

    <!-- CSS Separados por Utilidad -->
    <link rel="stylesheet" href="mvc_css/mvc_global.css">
    <link rel="stylesheet" href="mvc_css/mvc_animaciones.css">
    <link rel="stylesheet" href="mvc_css/mvc_responsive.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Space+Grotesk:wght@500;700&display=swap"
        rel="stylesheet">
</head>

<body>
    <div class="mvc-container">
        <header class="mvc-header">
            <div class="mvc-logo">
                <span class="mvc-logo-icon">💻</span>
                <h1 class="mvc-logo-text">QuizMaster</h1>
            </div>

            <!-- Botón hamburguesa (solo visible en mobile) -->
            <button class="mvc-hamburger" id="mvcHamburger" aria-label="Menú">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav class="mvc-nav" id="mvcNav">
                <a href="mvc_ranking.php" class="mvc-nav-link">🏆 Ranking</a>
                <a href="mvc_index.php" class="mvc-nav-link">📝 Nuevo Quiz</a>
            </nav>
        </header>

        <main class="mvc-main">
            <div class="mvc-hero">
                <h2 class="mvc-hero-title">Quiz de Programación Básica</h2>
                <p class="mvc-hero-subtitle">Demuestra tus conocimientos en desarrollo web</p>

                <!-- Temporizador -->
                <div class="mvc-timer-container">
                    <span class="mvc-timer-icon">⏰</span>
                    <span class="mvc-timer-label">Tiempo restante:</span>
                    <span id="mvcTimer" class="mvc-timer-value">10:00</span>
                </div>
            </div>

            <form id="mvcFormQuiz" class="mvc-quiz-form" action="mvc_procesar/mvc_quiz.php"
                method="POST">
                <!-- Nombre del Jugador -->
                <div class="mvc-form-group">
                    <label for="mvcNombreJugador" class="mvc-label">
                        <span class="mvc-label-icon">👤</span>
                        Ingresa tu nombre:
                    </label>
                    <input type="text" id="mvcNombreJugador" name="mvc_nombre_jugador"
                        class="mvc-input" placeholder="Ej: Matías Carlsson" required maxlength="50">
                </div>

                <hr class="mvc-divider">

                <!-- Sección de Preguntas -->
                <div id="mvcPreguntasContainer" class="mvc-preguntas-container">
                    <!-- Las 15 preguntas se cargarán dinámicamente con JS -->
                </div>

                <!-- Botón Submit -->
                <div class="mvc-form-actions">
                    <button type="submit" class="mvc-btn mvc-btn-primary mvc-btn-large"
                        id="mvcBtnSubmit" aria-label="Enviar respuestas del quiz">
                        <span class="mvc-btn-text">Enviar Respuestas</span>
                        <span class="mvc-btn-icon">→</span>
                        <span class="mvc-spinner" style="display: none;"></span>
                    </button>
                </div>

                <!-- Resultados (oculto hasta enviar) -->
                <div id="mvcResultados" class="mvc-resultados" style="display: none;" role="region"
                    aria-live="polite" aria-label="Resultados del quiz">
                    <h3 class="mvc-resultados-title">Resultados</h3>
                    <div class="mvc-resultados-summary">
                        <div class="mvc-resultado-item">
                            <span class="mvc-resultado-label">Correctas:</span>
                            <span id="mvcCorrectCount" class="mvc-resultado-value"
                                aria-label="Respuestas correctas">0</span>
                        </div>
                        <div class="mvc-resultado-item">
                            <span class="mvc-resultado-label">Incorrectas:</span>
                            <span id="mvcIncorrectCount" class="mvc-resultado-value"
                                aria-label="Respuestas incorrectas">0</span>
                        </div>
                        <div class="mvc-resultado-item">
                            <span class="mvc-resultado-label">Nota:</span>
                            <span id="mvcNotaFinal" class="mvc-resultado-value"
                                aria-label="Nota final">0.0</span>
                        </div>
                    </div>
                </div>
            </form>
        </main>

        <footer class="mvc-footer">
            <p>&copy; 2025 QuizMaster - Matías Viana Carlsson</p>
        </footer>
    </div>

    <!-- Scripts -->
    <script src="mvc_scripts/mvc_utils.js"></script>
    <script src="mvc_scripts/mvc_menu.js"></script>
    <script src="mvc_scripts/mvc_game.js"></script>
    <script src="mvc_scripts/mvc_app.js"></script>
</body>

</html>