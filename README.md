# 🎯 QuizMaster - Plataforma de Trivia Educativa

> **Autor:** Matías Viana Carlsson (MVC)  
> **Asignatura:** Paradigmas de Programación III  
> **Proyecto:** Sistema de Quiz Interactivo con Gamificación

---

## 📖 Descripción del Proyecto

**QuizMaster** es una plataforma web interactiva de trivia diseñada para gamificar el aprendizaje a través de preguntas de opción múltiple. El sistema permite a los usuarios poner a prueba sus conocimientos en diferentes categorías (Ciencia, Historia, Geografía, Arte y Deportes) con tres niveles de dificultad.

### 🎯 Características Principales

- ✅ Sistema de preguntas con opción múltiple (40+ preguntas)
- ✅ Validación en tiempo real con feedback inmediato
- ✅ Sistema de puntuación progresiva con temporizador
- ✅ Tabla de mejores puntajes almacenada en base de datos
- ✅ 5 categorías temáticas con 3 niveles de dificultad
- ✅ 3 secciones principales (Inicio, Juego, Resultados)
- ✅ Diseño completamente responsive (Desktop, Tablet, Mobile)
- ✅ Animaciones fluidas y experiencia de usuario optimizada

---

## 🎨 Decisiones de Diseño

### 🎨 Paleta de Colores

La paleta fue seleccionada para crear una experiencia moderna, vibrante y accesible:

| Color               | Código HEX | Uso                                              |
| ------------------- | ---------- | ------------------------------------------------ |
| **Índigo Vibrante** | `#6366f1`  | Color principal, botones, elementos interactivos |
| **Púrpura**         | `#8b5cf6`  | Color secundario, gradientes                     |
| **Ámbar/Dorado**    | `#f59e0b`  | Advertencias, nivel medio de dificultad          |
| **Verde Éxito**     | `#10b981`  | Respuestas correctas, nivel fácil                |
| **Rojo Error**      | `#ef4444`  | Respuestas incorrectas, nivel difícil            |
| **Azul Oscuro**     | `#1e293b`  | Texto principal, encabezados                     |
| **Gris Texto**      | `#334155`  | Texto secundario                                 |
| **Gris Claro**      | `#64748b`  | Texto terciario, placeholders                    |
| **Fondo Claro**     | `#f8fafc`  | Fondo general de la aplicación                   |
| **Blanco**          | `#ffffff`  | Tarjetas, elementos destacados                   |

#### 🌈 Gradientes Definidos

```css
--mvc-gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
--mvc-gradient-success: linear-gradient(135deg, #10b981 0%, #059669 100%);
--mvc-gradient-error: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
```

**Razón de la elección:**

- **Modernidad:** Colores vibrantes que atraen a un público educativo joven
- **Accesibilidad:** Contraste WCAG AA/AAA para legibilidad
- **Psicología del color:** Verde para éxito, rojo para error, azul para confianza
- **Gamificación:** Paleta colorida que refuerza la experiencia lúdica

---

### 📝 Tipografía

Se implementó una jerarquía clara con dos familias tipográficas:

#### **Fuente Principal: Poppins**

- **Uso:** Textos del cuerpo, formularios, botones
- **Pesos:** 300 (Light), 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Fuente de Google Fonts**

#### **Fuente para Encabezados: Space Grotesk**

- **Uso:** Títulos, encabezados, números destacados
- **Pesos:** 500 (Medium), 700 (Bold)
- **Fuente de Google Fonts**

#### Jerarquía de Tamaños:

```css
h1 {
  font-size: 2.5rem;
} /* 40px - Título principal */
h2 {
  font-size: 2rem;
} /* 32px - Subtítulos */
h3 {
  font-size: 1.5rem;
} /* 24px - Secciones */
h4 {
  font-size: 1.25rem;
} /* 20px */
h5 {
  font-size: 1.125rem;
} /* 18px */
h6 {
  font-size: 1rem;
} /* 16px */
body {
  font-size: 16px;
} /* Tamaño base */
```

**Razón de la elección:**

- **Poppins:** Fuente moderna, geométrica y muy legible en pantallas
- **Space Grotesk:** Contraste visual para encabezados, carácter técnico-moderno
- **Google Fonts:** Carga rápida y optimizada
- **Jerarquía clara:** Facilita el escaneo visual del contenido

---

### 📐 Layout y Estructura

#### **Sistema de Grid y Flexbox**

El diseño utiliza CSS Grid y Flexbox estratégicamente:

**Grid:**

- Hero section: `grid-template-columns: 1.5fr 1fr`
- Cards de resultados: `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`
- Ranking: `grid-template-columns: 60px 1fr 100px 150px`

**Flexbox:**

- Navegación horizontal
- Botones con íconos
- Cards de estadísticas verticales

#### **Contenedor Principal**

```css
.mvc-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

**Razón:** 1200px proporciona una lectura cómoda en pantallas grandes sin desperdiciar espacio.

#### **Espaciado Consistente**

Sistema de espaciado basado en múltiplos de `0.5rem`:

```css
--mvc-spacing-xs: 0.5rem; /* 8px */
--mvc-spacing-sm: 1rem; /* 16px */
--mvc-spacing-md: 1.5rem; /* 24px */
--mvc-spacing-lg: 2rem; /* 32px */
--mvc-spacing-xl: 3rem; /* 48px */
```

**Razón:** Proporciona consistencia visual y ritmo vertical/horizontal armónico.

---

## 📱 Diseño Responsive

### 🎯 Breakpoints Implementados

#### **1. Desktop (1200px+)**

- Layout completo de dos columnas
- Navegación horizontal completa
- Máxima información visible

#### **2. Tablets (768px - 1199px)**

```css
@media (max-width: 768px);
```

**Cambios:**

- Hero cambia a una columna: `grid-template-columns: 1fr`
- Stats cards en fila horizontal
- Game header apilado verticalmente
- Ranking simplificado (oculta fecha)
- Tamaños de fuente reducidos

#### **3. Mobile (480px - 767px)**

```css
@media (max-width: 480px);
```

**Cambios:**

- **Menú hamburguesa activado** (3 líneas animadas)
- Navegación en dropdown vertical
- Dificultad selector en columna
- Results cards apiladas (1 columna)
- Botones a ancho completo
- Reducción adicional de fuentes

#### **4. Landscape Mobile (altura < 500px)**

```css
@media (max-height: 500px) and (orientation: landscape);
```

**Cambios:**

- Reducción de padding vertical
- Formularios más compactos
- Optimización para pantallas horizontales pequeñas

---

### 📱 Menú Adaptativo

**Desktop:** Navegación horizontal estándar  
**Mobile:** Menú hamburguesa animado con transformaciones CSS

```css
/* Animación del menú hamburguesa */
.mvc-nav-toggle.mvc-active span:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}
.mvc-nav-toggle.mvc-active span:nth-child(2) {
  opacity: 0;
}
.mvc-nav-toggle.mvc-active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}
```

---

## ✨ Animaciones y Transiciones

### 🎬 Transiciones Suaves

Transición global definida con cubic-bezier para movimientos naturales:

```css
--mvc-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### 🎭 Animaciones Implementadas

#### **1. Fade In (Secciones)**

```css
@keyframes mvc-fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### **2. Pulse (Logo)**

```css
@keyframes mvc-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
```

#### **3. Timer Pulse (Temporizador)**

```css
@keyframes mvc-timerPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
```

#### **4. Respuesta Correcta**

```css
@keyframes mvc-correctAnswer {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
```

#### **5. Respuesta Incorrecta (Shake)**

```css
@keyframes mvc-incorrectAnswer {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}
```

#### **6. Spinner de Carga**

```css
@keyframes mvc-spin {
  to {
    transform: rotate(360deg);
  }
}
```

---

## ♿ Accesibilidad

### Mejoras Implementadas:

✅ **Contraste adecuado:** Todos los textos cumplen WCAG AA  
✅ **Estados de foco visibles:**

```css
*:focus-visible {
  outline: 2px solid var(--mvc-primary);
  outline-offset: 2px;
}
```

✅ **Animaciones reducidas para usuarios sensibles:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

✅ **Textos descriptivos en formularios** (labels, placeholders)  
✅ **Feedback visual inmediato** (colores + texto)  
✅ **Tamaños de toque mínimos** (44x44px en móviles)

---

## 🗂️ Estructura de Carpetas

```
Parcial Paradigmas II/
│
├── mvc_index.php               # Archivo principal HTML
├── README.md                   # Este archivo
│
├── mvc_css/
│   └── mvc_global.css          # Estilos globales del proyecto
│
├── mvc_scripts/                # Archivos JavaScript (Fase 2)
│   ├── mvc_app.js              # Lógica principal
│   ├── mvc_game.js             # Lógica del juego
│   └── mvc_utils.js            # Utilidades
│
├── mvc_conexionDB/
│   └── mvc_conexion.php        # Conexión PDO a MySQL
│
├── mvc_procesar/               # Procesamiento backend (Fase 3)
│   └── mvc_quiz.php            # API PHP para el quiz
│
├── mvc_models/                 # Modelos (futuro)
├── mvc_controllers/            # Controladores (futuro)
├── mvc_views/                  # Vistas (futuro)
├── mvc_assets/                 # Imágenes, fuentes (futuro)
│
└── mvc_database/               # Base de datos
    ├── mvc_estructura.sql      # Estructura de BD
    ├── mvc_datos.sql           # Datos de prueba
    └── INSTRUCCIONES.md        # Guía de instalación BD
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript** - Interactividad (Fase 2)

### Backend

- **PHP 8+** - Lógica del servidor
- **PDO** - Conexión segura a base de datos

### Base de Datos

- **MySQL 8.0+** - Almacenamiento de datos
- **4 Tablas Relacionadas** - Categorías, Preguntas, Partidas, Respuestas

---

## 🚀 Próximos Pasos

### Fase 2: Interactividad con JavaScript ⏳

- [ ] Lógica de validación de respuestas
- [ ] Sistema de puntuación progresiva
- [ ] Temporizador con penalización
- [ ] Feedback visual inmediato
- [ ] Navegación entre secciones
- [ ] Animaciones dinámicas

### Fase 3: Backend con PHP ⏳

- [ ] API para obtener preguntas desde BD
- [ ] Sistema de ranking persistente
- [ ] Registro de partidas jugadas
- [ ] Consultas optimizadas
- [ ] Manejo de sesiones

---

## 📊 Métricas del Proyecto

| Métrica                | Valor                         |
| ---------------------- | ----------------------------- |
| Secciones              | 3 (Inicio, Juego, Resultados) |
| Categorías             | 5                             |
| Preguntas              | 40+                           |
| Niveles de dificultad  | 3                             |
| Breakpoints responsive | 3+                            |
| Tablas de BD           | 4                             |
| Líneas de CSS          | 1,100+                        |
| Colores en paleta      | 5 principales + neutros       |
| Fuentes tipográficas   | 2 familias                    |

---

## 🎯 Requisitos Cumplidos

### ✅ Funcionales

- [x] Mínimo 15 preguntas (40+ implementadas)
- [x] Validación en tiempo real (preparado para JS)
- [x] Sistema de puntuación y temporizador (UI lista)
- [x] Tabla de mejores puntajes (BD y estructura lista)
- [x] Categorías con dificultad variable (5 categorías, 3 niveles)

### ✅ No Funcionales

- [x] Mínimo 3 secciones (Inicio, Juego, Resultados)
- [x] Animaciones fluidas (6+ animaciones CSS)
- [x] Diseño responsive (3 breakpoints + landscape)
- [x] Interfaz intuitiva sin instrucciones complejas

### ✅ Base de Datos

- [x] Mínimo 2 tablas relacionadas (4 tablas implementadas)
- [x] Claves primarias y foráneas
- [x] Datos de prueba (10+ registros por tabla)
- [x] Archivos SQL exportados (mvc_estructura.sql, mvc_datos.sql)

### ✅ Diseño

- [x] Paleta de colores coherente (5 colores principales)
- [x] Tipografía consistente (Poppins + Space Grotesk)
- [x] Responsive con 3 breakpoints (Desktop, Tablet, Mobile, Landscape)
- [x] Menú adaptativo (hamburguesa en mobile)
- [x] Transiciones suaves (cubic-bezier)
- [x] Loading states visibles
- [x] Contraste adecuado (WCAG AA)
- [x] Espaciado uniforme (sistema de espaciado)

---

## 📝 Nomenclatura MVC

**Todos los archivos, clases, funciones y tablas usan el prefijo `mvc_` (Matías Viana Carlsson):**

✅ Carpetas: `mvc_css/`, `mvc_database/`, `mvc_scripts/`  
✅ Archivos: `mvc_index.php`, `mvc_global.css`, `mvc_conexion.php`  
✅ Tablas: `mvc_categorias`, `mvc_preguntas`, `mvc_partidas`  
✅ Clases CSS: `.mvc-container`, `.mvc-btn`, `.mvc-section`  
✅ Funciones: `mvc_obtener_conexion()`, `mvc_ejecutar_consulta()`

---

## 🎓 Decisiones Técnicas Destacadas

### 1. **Variables CSS para Theming**

Permite cambiar toda la paleta de colores desde un solo lugar, facilitando el mantenimiento.

### 2. **Patrón Singleton en Conexión DB**

Garantiza una única instancia de conexión a la base de datos, mejorando el rendimiento.

### 3. **Grid con Auto-fit**

Los cards se reorganizan automáticamente según el espacio disponible sin media queries adicionales.

### 4. **Animaciones con GPU**

Uso de `transform` y `opacity` para animaciones fluidas aceleradas por hardware.

### 5. **Mobile-first approach**

Aunque el CSS base es desktop, los breakpoints están optimizados para mobile como prioridad.

---

## 📄 Licencia

Este proyecto fue desarrollado como parte del curso de Paradigmas de Programación III.  
**Autor:** Matías Viana Carlsson  
**Año:** 2025

---

## 🙏 Agradecimientos

- **Google Fonts** por las tipografías Poppins y Space Grotesk
- **XAMPP** por el entorno de desarrollo local
- **Visual Studio Code** como editor de código

---

**¡QuizMaster está listo para la siguiente fase de desarrollo! 🚀**

_Próximo paso: Implementación de interactividad con JavaScript_
