<?php
/**
 * QuizMaster - Sistema de Quiz de Programación
 * Matías Viana Carlsson (MVC)
 * 
 * Archivo: mvc_quiz.php
 * Descripción: Backend completo del quiz
 */

header('Content-Type: application/json; charset=utf-8');
require_once '../mvc_conexionDB/mvc_conexion.php';

// Obtener acción
$accion = $_POST['accion'] ?? $_GET['accion'] ?? '';

switch ($accion) {
    case 'obtener_preguntas':
        mvc_obtener_preguntas();
        break;

    case 'verificar_respuesta':
        mvc_verificar_respuesta();
        break;

    case 'guardar_partida':
        mvc_guardar_partida();
        break;

    case 'obtener_ranking':
        mvc_obtener_ranking();
        break;

    default:
        echo json_encode([
            'success' => false,
            'error' => 'Acción no válida'
        ]);
        break;
}

// FUNCIÓN 1: OBTENER TODAS LAS PREGUNTAS
function mvc_obtener_preguntas()
{
    $query = "SELECT 
                mvc_pregunta_id,
                mvc_texto_pregunta,
                mvc_opcion_a,
                mvc_opcion_b,
                mvc_opcion_c,
                mvc_opcion_d
              FROM mvc_preguntas 
              WHERE mvc_activo = 1 
              ORDER BY mvc_pregunta_id";

    $resultado = mvc_ejecutar_consulta($query);

    if ($resultado) {
        $preguntas = mvc_obtener_todos($resultado);

        // Formatear para el frontend
        $preguntas_formateadas = [];
        foreach ($preguntas as $p) {
            $preguntas_formateadas[] = [
                'id' => (int) $p['mvc_pregunta_id'],
                'texto' => $p['mvc_texto_pregunta'],
                'opciones' => [
                    $p['mvc_opcion_a'],
                    $p['mvc_opcion_b'],
                    $p['mvc_opcion_c'],
                    $p['mvc_opcion_d']
                ]
            ];
        }

        echo json_encode([
            'success' => true,
            'preguntas' => $preguntas_formateadas
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Error al obtener preguntas'
        ]);
    }
}

// FUNCIÓN 2: VERIFICAR RESPUESTA
function mvc_verificar_respuesta()
{
    $pregunta_id = (int) ($_POST['pregunta_id'] ?? 0);
    $respuesta = strtoupper($_POST['respuesta'] ?? '');

    if ($pregunta_id === 0 || empty($respuesta)) {
        echo json_encode([
            'success' => false,
            'error' => 'Datos incompletos'
        ]);
        return;
    }

    $query = "SELECT mvc_respuesta_correcta 
              FROM mvc_preguntas 
              WHERE mvc_pregunta_id = ?";

    $stmt = mvc_ejecutar_preparada($query, 'i', $pregunta_id);

    if ($stmt) {
        $resultado = $stmt->get_result();
        $pregunta = mvc_obtener_uno($resultado);

        if ($pregunta) {
            $es_correcta = ($pregunta['mvc_respuesta_correcta'] === $respuesta);

            echo json_encode([
                'success' => true,
                'es_correcta' => $es_correcta,
                'respuesta_correcta' => $pregunta['mvc_respuesta_correcta']
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Pregunta no encontrada'
            ]);
        }

        $stmt->close();
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Error en la consulta'
        ]);
    }
}

// FUNCIÓN 3: GUARDAR PARTIDA COMPLETA
function mvc_guardar_partida()
{
    $nombre = trim($_POST['nombre'] ?? '');
    $correctas = (int) ($_POST['correctas'] ?? 0);
    $incorrectas = (int) ($_POST['incorrectas'] ?? 0);
    $respuestas = $_POST['respuestas'] ?? '[]';

    if (empty($nombre)) {
        echo json_encode([
            'success' => false,
            'error' => 'Nombre es obligatorio'
        ]);
        return;
    }

    // Decodificar respuestas
    $respuestas_array = json_decode($respuestas, true);
    if (!is_array($respuestas_array)) {
        echo json_encode([
            'success' => false,
            'error' => 'Formato de respuestas inválido'
        ]);
        return;
    }

    // Obtener IP del usuario
    $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

    // Insertar partida
    $query = "INSERT INTO mvc_partidas 
              (mvc_nombre_jugador, mvc_preguntas_correctas, mvc_preguntas_incorrectas, mvc_preguntas_totales, mvc_ip_jugador) 
              VALUES (?, ?, ?, 15, ?)";

    $stmt = mvc_ejecutar_preparada($query, 'siis', $nombre, $correctas, $incorrectas, $ip);

    if ($stmt) {
        $partida_id = mvc_ultimo_id();
        $stmt->close();

        // Guardar cada respuesta
        $respuestas_guardadas = 0;
        foreach ($respuestas_array as $respuesta) {
            $pregunta_id = (int) ($respuesta['preguntaId'] ?? 0);
            $respuesta_usuario = strtoupper($respuesta['respuesta'] ?? '');
            $es_correcta = ($respuesta['esCorrecta'] ?? false) ? 1 : 0;

            if ($pregunta_id > 0 && !empty($respuesta_usuario)) {
                $query_resp = "INSERT INTO mvc_respuestas_jugador 
                              (mvc_partida_id, mvc_pregunta_id, mvc_respuesta_jugador, mvc_es_correcta) 
                              VALUES (?, ?, ?, ?)";

                $stmt_resp = mvc_ejecutar_preparada($query_resp, 'iisi', $partida_id, $pregunta_id, $respuesta_usuario, $es_correcta);

                if ($stmt_resp) {
                    $respuestas_guardadas++;
                    $stmt_resp->close();
                }
            }
        }

        // Obtener datos de la partida guardada con nota calculada
        $query_partida = "SELECT 
                            mvc_partida_id,
                            mvc_porcentaje_acierto,
                            mvc_nota_final
                          FROM mvc_partidas 
                          WHERE mvc_partida_id = ?";

        $stmt_partida = mvc_ejecutar_preparada($query_partida, 'i', $partida_id);

        if ($stmt_partida) {
            $resultado = $stmt_partida->get_result();
            $partida = mvc_obtener_uno($resultado);
            $stmt_partida->close();

            echo json_encode([
                'success' => true,
                'partida_id' => $partida_id,
                'respuestas_guardadas' => $respuestas_guardadas,
                'porcentaje' => (float) $partida['mvc_porcentaje_acierto'],
                'nota' => (float) $partida['mvc_nota_final'],
                'mensaje' => 'Partida guardada correctamente'
            ]);
        } else {
            echo json_encode([
                'success' => true,
                'partida_id' => $partida_id,
                'respuestas_guardadas' => $respuestas_guardadas,
                'mensaje' => 'Partida guardada correctamente'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Error al guardar la partida'
        ]);
    }
}

// FUNCIÓN 4: OBTENER RANKING TOP 10
function mvc_obtener_ranking()
{
    $query = "SELECT 
                mvc_nombre_jugador,
                mvc_preguntas_correctas,
                mvc_preguntas_totales,
                mvc_porcentaje_acierto,
                mvc_nota_final,
                DATE_FORMAT(mvc_fecha_partida, '%d/%m/%Y %H:%i') as fecha
              FROM mvc_partidas
              ORDER BY mvc_nota_final DESC, mvc_fecha_partida DESC
              LIMIT 10";

    $resultado = mvc_ejecutar_consulta($query);

    if ($resultado) {
        $ranking = mvc_obtener_todos($resultado);

        echo json_encode([
            'success' => true,
            'ranking' => $ranking
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Error al obtener ranking'
        ]);
    }
}
?>