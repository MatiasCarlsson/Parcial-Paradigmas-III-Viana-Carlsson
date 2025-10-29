<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>🏆 Ranking - QuizMaster</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
        rel="stylesheet" />
    <link rel="stylesheet" href="mvc_css/mvc_global.css" />
    <link rel="stylesheet" href="mvc_css/mvc_animaciones.css" />
    <link rel="stylesheet" href="mvc_css/mvc_responsive.css" />
    <style>
        .mvc-ranking-container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
        }

        .mvc-ranking-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .mvc-ranking-header h1 {
            font-family: "Space Grotesk", sans-serif;
            font-size: 2.5rem;
            color: var(--mvc-primary);
            margin-bottom: 0.5rem;
        }

        .mvc-ranking-table {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .mvc-ranking-table table {
            width: 100%;
            border-collapse: collapse;
        }

        .mvc-ranking-table thead {
            background: linear-gradient(135deg, var(--mvc-primary), var(--mvc-secondary));
            color: white;
        }

        .mvc-ranking-table th {
            padding: 1rem;
            text-align: left;
            font-weight: 600;
        }

        .mvc-ranking-table td {
            padding: 1rem;
            border-bottom: 1px solid var(--mvc-light);
        }

        .mvc-ranking-table tbody tr:hover {
            background-color: rgba(99, 102, 241, 0.05);
        }

        .mvc-rank-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            font-weight: bold;
            font-size: 0.9rem;
        }

        .mvc-rank-1 {
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #000;
        }

        .mvc-rank-2 {
            background: linear-gradient(135deg, #c0c0c0, #e8e8e8);
            color: #000;
        }

        .mvc-rank-3 {
            background: linear-gradient(135deg, #cd7f32, #e89a5c);
            color: white;
        }

        .mvc-rank-other {
            background: var(--mvc-light);
            color: var(--mvc-dark);
        }

        .mvc-nota-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
        }

        .mvc-nota-excelente {
            background-color: rgba(16, 185, 129, 0.1);
            color: var(--mvc-success);
        }

        .mvc-nota-buena {
            background-color: rgba(99, 102, 241, 0.1);
            color: var(--mvc-primary);
        }

        .mvc-nota-regular {
            background-color: rgba(251, 191, 36, 0.1);
            color: #f59e0b;
        }

        .mvc-nota-mala {
            background-color: rgba(239, 68, 68, 0.1);
            color: var(--mvc-error);
        }

        .mvc-loading {
            text-align: center;
            padding: 3rem;
            color: var(--mvc-primary);
        }

        .mvc-empty {
            text-align: center;
            padding: 3rem;
            color: var(--mvc-text-light);
        }

        .mvc-back-button {
            display: inline-block;
            margin-top: 2rem;
            padding: 0.75rem 2rem;
            background: var(--mvc-primary);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .mvc-back-button:hover {
            background: var(--mvc-secondary);
            transform: translateY(-2px);
        }
    </style>
</head>

<body>
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
            <a href="mvc_index.php" class="mvc-nav-link">📝 Nuevo Quiz</a>
            <a href="mvc_ranking.php" class="mvc-nav-link">🏆 Ranking</a>
        </nav>
    </header>

    <div class="mvc-ranking-container">
        <div class="mvc-ranking-header">
            <h1>🏆 Ranking Top 10</h1>
            <p>Los mejores jugadores de QuizMaster</p>
        </div>

        <div id="mvcRankingContent" class="mvc-ranking-table">
            <div class="mvc-loading">
                <p>⏳ Cargando ranking...</p>
            </div>
        </div>

        <div style="text-align: center">
            <a href="mvc_index.php" class="mvc-back-button">← Volver al Quiz</a>
        </div>
    </div>

    <script>
        // Cargar ranking al cargar la página
        window.addEventListener("DOMContentLoaded", function () {
            mvc_cargarRanking();
        });

        /**
         * Carga el ranking desde la BD
         */
        function mvc_cargarRanking() {
            fetch("mvc_procesar/mvc_quiz.php?accion=obtener_ranking")
                .then((response) => response.json())
                .then((data) => {
                    if (data.success && data.ranking.length > 0) {
                        mvc_mostrarRanking(data.ranking);
                    } else {
                        mvc_mostrarVacio();
                    }
                })
                .catch((error) => {
                    console.error("Error al cargar ranking:", error);
                    mvc_mostrarError();
                });
        }

        /**
         * Muestra el ranking en la tabla
         */
        function mvc_mostrarRanking(ranking) {
            const container = document.getElementById("mvcRankingContent");

            let html = `
          <table>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Jugador</th>
                <th>Correctas</th>
                <th>Porcentaje</th>
                <th>Nota</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
        `;

            ranking.forEach((jugador, index) => {
                const posicion = index + 1;
                const badgeClass = posicion === 1 ? "mvc-rank-1" : posicion === 2 ? "mvc-rank-2" : posicion === 3 ? "mvc-rank-3" : "mvc-rank-other";

                const nota = parseFloat(jugador.mvc_nota_final);
                const notaClass = nota >= 6.0 ? "mvc-nota-excelente" : nota >= 5.0 ? "mvc-nota-buena" : nota >= 4.0 ? "mvc-nota-regular" : "mvc-nota-mala";

                html += `
            <tr>
              <td><span class="mvc-rank-badge ${badgeClass}">${posicion}</span></td>
              <td><strong>${jugador.mvc_nombre_jugador}</strong></td>
              <td>${jugador.mvc_preguntas_correctas}/${jugador.mvc_preguntas_totales}</td>
              <td>${parseFloat(jugador.mvc_porcentaje_acierto).toFixed(1)}%</td>
              <td><span class="mvc-nota-badge ${notaClass}">${nota.toFixed(1)}</span></td>
              <td>${jugador.fecha}</td>
            </tr>
          `;
            });

            html += `
            </tbody>
          </table>
        `;

            container.innerHTML = html;
        }

        /**
         * Muestra mensaje cuando no hay datos
         */
        function mvc_mostrarVacio() {
            const container = document.getElementById("mvcRankingContent");
            container.innerHTML = `
          <div class="mvc-empty">
            <p>📊 Aún no hay partidas registradas</p>
            <p>¡Sé el primero en jugar!</p>
          </div>
        `;
        }

        /**
         * Muestra mensaje de error
         */
        function mvc_mostrarError() {
            const container = document.getElementById("mvcRankingContent");
            container.innerHTML = `
          <div class="mvc-empty">
            <p>❌ Error al cargar el ranking</p>
            <p>Por favor, intenta nuevamente más tarde</p>
          </div>
        `;
        }
    </script>
    <script src="mvc_scripts/mvc_menu.js"></script>
</body>

</html>