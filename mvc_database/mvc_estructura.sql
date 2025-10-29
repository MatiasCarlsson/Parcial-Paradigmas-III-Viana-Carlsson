-- Crear base de datos
CREATE DATABASE IF NOT EXISTS mvc_quizmaster_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE mvc_quizmaster_db;

-- TABLA: mvc_preguntas
-- Descripción: Banco de 15 preguntas de programación básica
CREATE TABLE IF NOT EXISTS mvc_preguntas (
    mvc_pregunta_id INT PRIMARY KEY AUTO_INCREMENT,
    mvc_texto_pregunta TEXT NOT NULL,
    mvc_opcion_a VARCHAR(255) NOT NULL,
    mvc_opcion_b VARCHAR(255) NOT NULL,
    mvc_opcion_c VARCHAR(255) NOT NULL,
    mvc_opcion_d VARCHAR(255) NOT NULL,
    mvc_respuesta_correcta ENUM('A', 'B', 'C', 'D') NOT NULL,
    mvc_fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mvc_activo BOOLEAN DEFAULT TRUE,
    
    -- Índice para preguntas activas
    INDEX idx_mvc_activo (mvc_activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLA: mvc_partidas
-- Descripción: Registro de partidas jugadas
CREATE TABLE IF NOT EXISTS mvc_partidas (
    mvc_partida_id INT PRIMARY KEY AUTO_INCREMENT,
    mvc_nombre_jugador VARCHAR(100) NOT NULL,
    mvc_preguntas_correctas INT DEFAULT 0,
    mvc_preguntas_incorrectas INT DEFAULT 0,
    mvc_preguntas_totales INT DEFAULT 15,
    mvc_porcentaje_acierto DECIMAL(5,2) DEFAULT 0.00,
    mvc_nota_final DECIMAL(3,1) DEFAULT 1.0,
    mvc_fecha_partida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mvc_ip_jugador VARCHAR(45),
    
    -- Índices para búsqueda y ranking
    INDEX idx_mvc_fecha (mvc_fecha_partida DESC),
    INDEX idx_mvc_jugador (mvc_nombre_jugador),
    INDEX idx_mvc_nota (mvc_nota_final DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLA: mvc_respuestas_jugador
-- Descripción: Detalle de respuestas por partida
CREATE TABLE IF NOT EXISTS mvc_respuestas_jugador (
    mvc_respuesta_id INT PRIMARY KEY AUTO_INCREMENT,
    mvc_partida_id INT NOT NULL,
    mvc_pregunta_id INT NOT NULL,
    mvc_respuesta_jugador ENUM('A', 'B', 'C', 'D') NOT NULL,
    mvc_es_correcta BOOLEAN DEFAULT FALSE,
    mvc_fecha_respuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Relaciones
    FOREIGN KEY (mvc_partida_id) REFERENCES mvc_partidas(mvc_partida_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (mvc_pregunta_id) REFERENCES mvc_preguntas(mvc_pregunta_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
        
    -- Índices
    INDEX idx_mvc_partida (mvc_partida_id),
    INDEX idx_mvc_pregunta (mvc_pregunta_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- VISTA: mvc_ranking_general
-- Descripción: Top 10 mejores puntuaciones
CREATE OR REPLACE VIEW mvc_ranking_general AS
SELECT 
    mvc_partida_id,
    mvc_nombre_jugador,
    mvc_preguntas_correctas,
    mvc_preguntas_incorrectas,
    mvc_preguntas_totales,
    mvc_porcentaje_acierto,
    mvc_nota_final,
    mvc_fecha_partida
FROM mvc_partidas
ORDER BY mvc_nota_final DESC, mvc_fecha_partida DESC
LIMIT 10;

-- VISTA: mvc_estadisticas_generales
-- Descripción: Estadísticas globales del sistema
CREATE OR REPLACE VIEW mvc_estadisticas_generales AS
SELECT 
    COUNT(DISTINCT mvc_nombre_jugador) AS mvc_total_jugadores,
    COUNT(mvc_partida_id) AS mvc_total_partidas,
    AVG(mvc_preguntas_correctas) AS mvc_promedio_correctas,
    AVG(mvc_porcentaje_acierto) AS mvc_promedio_acierto,
    AVG(mvc_nota_final) AS mvc_promedio_nota,
    MAX(mvc_nota_final) AS mvc_mejor_nota,
    MIN(mvc_nota_final) AS mvc_peor_nota
FROM mvc_partidas;


-- TRIGGER: mvc_calcular_estadisticas_partida
-- Descripción: Calcula porcentaje y nota automáticamente

DELIMITER //
CREATE TRIGGER mvc_calcular_estadisticas_partida
BEFORE INSERT ON mvc_partidas
FOR EACH ROW
BEGIN
    -- Calcular porcentaje de acierto
    IF NEW.mvc_preguntas_totales > 0 THEN
        SET NEW.mvc_porcentaje_acierto = (NEW.mvc_preguntas_correctas / NEW.mvc_preguntas_totales) * 100;
    END IF;
    
    -- Calcular nota según escala chilena (1.0 - 7.0)
    IF NEW.mvc_porcentaje_acierto >= 95 THEN
        SET NEW.mvc_nota_final = 7.0;
    ELSEIF NEW.mvc_porcentaje_acierto >= 85 THEN
        SET NEW.mvc_nota_final = 6.5;
    ELSEIF NEW.mvc_porcentaje_acierto >= 75 THEN
        SET NEW.mvc_nota_final = 6.0;
    ELSEIF NEW.mvc_porcentaje_acierto >= 65 THEN
        SET NEW.mvc_nota_final = 5.5;
    ELSEIF NEW.mvc_porcentaje_acierto >= 55 THEN
        SET NEW.mvc_nota_final = 5.0;
    ELSEIF NEW.mvc_porcentaje_acierto >= 45 THEN
        SET NEW.mvc_nota_final = 4.5;
    ELSEIF NEW.mvc_porcentaje_acierto >= 35 THEN
        SET NEW.mvc_nota_final = 4.0;
    ELSE
        SET NEW.mvc_nota_final = 3.5;
    END IF;
END//
DELIMITER ;


-- TRIGGER: mvc_actualizar_estadisticas_partida
-- Descripción: Actualiza estadísticas al modificar partida

DELIMITER //
CREATE TRIGGER mvc_actualizar_estadisticas_partida
BEFORE UPDATE ON mvc_partidas
FOR EACH ROW
BEGIN
    -- Calcular porcentaje de acierto
    IF NEW.mvc_preguntas_totales > 0 THEN
        SET NEW.mvc_porcentaje_acierto = (NEW.mvc_preguntas_correctas / NEW.mvc_preguntas_totales) * 100;
    END IF;
    
    -- Calcular nota según escala chilena (1.0 - 7.0)
    IF NEW.mvc_porcentaje_acierto >= 95 THEN
        SET NEW.mvc_nota_final = 7.0;
    ELSEIF NEW.mvc_porcentaje_acierto >= 85 THEN
        SET NEW.mvc_nota_final = 6.5;
    ELSEIF NEW.mvc_porcentaje_acierto >= 75 THEN
        SET NEW.mvc_nota_final = 6.0;
    ELSEIF NEW.mvc_porcentaje_acierto >= 65 THEN
        SET NEW.mvc_nota_final = 5.5;
    ELSEIF NEW.mvc_porcentaje_acierto >= 55 THEN
        SET NEW.mvc_nota_final = 5.0;
    ELSEIF NEW.mvc_porcentaje_acierto >= 45 THEN
        SET NEW.mvc_nota_final = 4.5;
    ELSEIF NEW.mvc_porcentaje_acierto >= 35 THEN
        SET NEW.mvc_nota_final = 4.0;
    ELSE
        SET NEW.mvc_nota_final = 3.5;
    END IF;
END//
DELIMITER ;
