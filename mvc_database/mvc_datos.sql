
-- QuizMaster - Datos de Preguntas
-- Matías Viana Carlsson (MVC)
-- Descripción: 15 preguntas de programación básica


USE mvc_quizmaster_db;

-- Limpiar datos existentes (opcional)
-- TRUNCATE TABLE mvc_respuestas_jugador;
-- TRUNCATE TABLE mvc_partidas;
-- TRUNCATE TABLE mvc_preguntas;


-- INSERTAR LAS 15 PREGUNTAS DE PROGRAMACIÓN BÁSICA


INSERT INTO mvc_preguntas 
(mvc_texto_pregunta, mvc_opcion_a, mvc_opcion_b, mvc_opcion_c, mvc_opcion_d, mvc_respuesta_correcta) 
VALUES

-- Pregunta 1
('¿Qué es una variable en programación?', 
 'Un contenedor para almacenar datos', 
 'Una función que realiza cálculos', 
 'Un tipo de dato específico', 
 'Un bucle que repite código', 
 'A'),

-- Pregunta 2
('¿Cuál de los siguientes es un lenguaje de programación?', 
 'HTML', 
 'CSS', 
 'Python', 
 'JSON', 
 'C'),

-- Pregunta 3
('¿Qué significa HTML?', 
 'Hyper Text Markup Language', 
 'High Tech Modern Language', 
 'Home Tool Markup Language', 
 'Hyperlinks and Text Markup Language', 
 'A'),

-- Pregunta 4
('¿Cuál es la etiqueta correcta para crear un párrafo en HTML?', 
 '<p>', 
 '<paragraph>', 
 '<text>', 
 '<para>', 
 'A'),

-- Pregunta 5
('¿Qué propiedad CSS se usa para cambiar el color del texto?', 
 'color', 
 'text-color', 
 'font-color', 
 'text-style', 
 'A'),

-- Pregunta 6
('¿Cuál es el operador de igualdad estricta en JavaScript?', 
 '===', 
 '==', 
 '=', 
 '!==', 
 'A'),

-- Pregunta 7
('¿Qué función se usa en JavaScript para imprimir en la consola?', 
 'console.log()', 
 'print()', 
 'echo()', 
 'write()', 
 'A'),

-- Pregunta 8
('¿Con qué símbolo comienza una variable en PHP?', 
 '$', 
 '#', 
 '@', 
 '&', 
 'A'),

-- Pregunta 9
('¿Qué significa CSS?', 
 'Cascading Style Sheets', 
 'Computer Style Sheets', 
 'Creative Style System', 
 'Colorful Style Sheets', 
 'A'),

-- Pregunta 10
('¿Cuál es el método correcto para incluir un archivo JavaScript externo en HTML?', 
 '<script src="archivo.js"></script>', 
 '<js src="archivo.js"></js>', 
 '<link src="archivo.js">', 
 '<include src="archivo.js">', 
 'A'),

-- Pregunta 11
('¿Qué estructura de control se usa para repetir código en programación?', 
 'Bucles (for, while)', 
 'Condicionales (if, else)', 
 'Funciones', 
 'Variables', 
 'A'),

-- Pregunta 12
('¿Cuál es la forma correcta de comentar una línea en PHP?', 
 '// comentario', 
 '<!-- comentario -->', 
 '/* comentario', 
 '# comentario', 
 'A'),

-- Pregunta 13
('¿Qué propiedad CSS se usa para cambiar el tamaño de fuente?', 
 'font-size', 
 'text-size', 
 'size', 
 'font-weight', 
 'A'),

-- Pregunta 14
('¿Cuál es el tipo de dato que representa verdadero o falso?', 
 'Boolean', 
 'String', 
 'Integer', 
 'Float', 
 'A'),

-- Pregunta 15
('¿Qué atributo HTML se usa para definir estilos en línea?', 
 'style', 
 'class', 
 'css', 
 'format', 
 'A');


-- Verificar que se insertaron correctamente

SELECT 
    mvc_pregunta_id AS 'ID',
    mvc_texto_pregunta AS 'Pregunta',
    mvc_respuesta_correcta AS 'Correcta'
FROM mvc_preguntas
ORDER BY mvc_pregunta_id;


-- Total: 15 preguntas de programación básica

