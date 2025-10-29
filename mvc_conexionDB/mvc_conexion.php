<?php
/**
 * Matías Viana Carlsson (MVC)
 * Paradigmas de Programación III
 * 
 * Archivo: mvc_conexion.php
 * Descripción: Conexión simplificada a MySQL usando MySQLi
 */

// Configuración de base de datos
define('MVC_DB_HOST', 'localhost');
define('MVC_DB_NAME', 'mvc_quizmaster_db');
define('MVC_DB_USER', 'root');
define('MVC_DB_PASS', '2103');
define('MVC_DB_CHARSET', 'utf8mb4');

// Variable global para la conexión
$mvc_conexion = null;

/**
 * Obtiene la conexión a la base de datos
 * @return mysqli|false Conexión MySQLi o false en caso de error
 */
function mvc_obtener_conexion()
{
    global $mvc_conexion;

    // Si ya existe una conexión, retornarla
    if ($mvc_conexion !== null && $mvc_conexion->ping()) {
        return $mvc_conexion;
    }

    // Crear nueva conexión
    $mvc_conexion = new mysqli(MVC_DB_HOST, MVC_DB_USER, MVC_DB_PASS, MVC_DB_NAME);

    // Verificar errores de conexión
    if ($mvc_conexion->connect_error) {
        error_log("Error de conexión MVC: " . $mvc_conexion->connect_error);
        die(json_encode([
            'success' => false,
            'error' => 'Error de conexión a la base de datos'
        ]));
    }

    // Establecer charset
    $mvc_conexion->set_charset(MVC_DB_CHARSET);

    return $mvc_conexion;
}

/**
 * Cierra la conexión a la base de datos
 */
function mvc_cerrar_conexion()
{
    global $mvc_conexion;

    if ($mvc_conexion !== null) {
        $mvc_conexion->close();
        $mvc_conexion = null;
    }
}

/**
 * Ejecuta una consulta SQL
 * @param string $query Consulta SQL
 * @return mysqli_result|bool Resultado de la consulta
 */
function mvc_ejecutar_consulta($query)
{
    $conexion = mvc_obtener_conexion();
    $resultado = $conexion->query($query);

    if (!$resultado) {
        error_log("Error en consulta MVC: " . $conexion->error);
    }

    return $resultado;
}

/**
 * Ejecuta una consulta preparada de forma segura
 * @param string $query Consulta SQL con placeholders (?)
 * @param string $tipos Tipos de parámetros (s=string, i=integer, d=double, b=blob)
 * @param array $params Parámetros para la consulta
 * @return mysqli_stmt|false Statement preparado o false en caso de error
 */
function mvc_ejecutar_preparada($query, $tipos, ...$params)
{
    $conexion = mvc_obtener_conexion();
    $stmt = $conexion->prepare($query);

    if (!$stmt) {
        error_log("Error preparando consulta MVC: " . $conexion->error);
        return false;
    }

    // Bind de parámetros si existen
    if (!empty($params)) {
        $stmt->bind_param($tipos, ...$params);
    }

    if (!$stmt->execute()) {
        error_log("Error ejecutando consulta MVC: " . $stmt->error);
        return false;
    }

    return $stmt;
}

/**
 * Obtiene todos los registros de un resultado
 * @param mysqli_result $resultado Resultado de consulta
 * @return array Array asociativo con los registros
 */
function mvc_obtener_todos($resultado)
{
    if (!$resultado) {
        return [];
    }

    return $resultado->fetch_all(MYSQLI_ASSOC);
}

/**
 * Obtiene un solo registro
 * @param mysqli_result $resultado Resultado de consulta
 * @return array|null Array asociativo con el registro o null
 */
function mvc_obtener_uno($resultado)
{
    if (!$resultado) {
        return null;
    }

    return $resultado->fetch_assoc();
}

/**
 * Escapa una cadena para uso seguro en SQL
 * @param string $valor Valor a escapar
 * @return string Valor escapado
 */
function mvc_escapar($valor)
{
    $conexion = mvc_obtener_conexion();
    return $conexion->real_escape_string($valor);
}

/**
 * Obtiene el ID del último registro insertado
 * @return int ID del último insert
 */
function mvc_ultimo_id()
{
    $conexion = mvc_obtener_conexion();
    return $conexion->insert_id;
}

/**
 * Obtiene el número de filas afectadas
 * @return int Número de filas afectadas
 */
function mvc_filas_afectadas()
{
    $conexion = mvc_obtener_conexion();
    return $conexion->affected_rows;
}
?>