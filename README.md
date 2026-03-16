# 🐴 Percherones y Veterinarias Esquivel

Sitio web informativo para **Percherones y Veterinarias Esquivel**, un negocio familiar ubicado en **Puruándiro, Michoacán** que ofrece dos servicios principales: veterinaria para mascotas y renta de carretas jaladas por caballos percherones para eventos especiales.

---

## 🌐 Demo

> Abre `index.html` directamente en tu navegador — no requiere servidor ni instalación.

---

## 📸 Vista previa

### Hero — Split Screen
El visitante elige a cuál sección ir desde el inicio: la mitad izquierda lleva a la **Veterinaria** y la derecha a los **Percherones**. Cada panel se expande al hacer hover con animaciones CSS.

### Dos mundos, una sola página
| Veterinaria | Percherones |
|-------------|-------------|
| Verde bosque `#2D5016` | Negro profundo `#1A1A1A` |
| Cormorant Garamond + Playfair Display | Playfair Display italic + dorado `#C9A84C` |
| Servicios, horarios, WhatsApp | Bodas, XV años, servicio fúnebre |

---

## 🗂️ Estructura del proyecto

```
esquivel/
├── index.html              ← Página principal (todo en uno)
├── css/
│   ├── variables.css       ← Variables CSS, tipografías, reset global
│   ├── navbar.css          ← Navbar fija con scroll effect y menú móvil
│   ├── hero.css            ← Split screen animado
│   ├── veterinaria.css     ← Sección veterinaria y horarios
│   ├── percherones.css     ← Eventos, stats y cobertura
│   ├── galeria.css         ← Grid masonry + lightbox
│   ├── testimonios.css     ← Sección nosotros + reseñas
│   ├── contacto.css        ← Datos de contacto + mapa
│   └── footer.css          ← Footer + botón flotante WhatsApp
├── js/
│   └── main.js             ← Navbar, galería, lightbox, animaciones
└── img/
    ├── logo-esquivel.png
    ├── img-AlfonsoEsquivel.jpg
    └── img1.jpg … img20.jpg
```

---

## ✨ Características

- **Hero split screen** — hover expande el panel, revela subtítulo y CTA
- **Galería con filtros** — Todos / Percherones / Veterinaria, con lightbox navegable por teclado (`← →` y `Esc`)
- **Contadores animados** — 20+ caballos, 10+ carretas, 30+ años de experiencia
- **Fade-up al scroll** — via IntersectionObserver, sin dependencias externas
- **Botón flotante WhatsApp** — pulsante, fijo en esquina inferior derecha
- **Navbar responsiva** — menú hamburguesa en móvil, scroll shrink effect
- **Mapa de Google** integrado con iframe (Puruándiro, Michoacán)
- **SEO básico** — meta description y Open Graph incluidos
- **Accesibilidad** — aria-labels, roles semánticos, navegación por teclado en lightbox

---

## 🎨 Diseño

**Tipografías** (Google Fonts):
- `Playfair Display` — títulos display
- `Cormorant Garamond` — cuerpo y subtítulos
- `Josefin Sans` — UI, etiquetas, navegación

**Paleta Veterinaria:**
```
Verde bosque  #2D5016
Verde menta   #7CB87A
Crema         #F5F0E8
```

**Paleta Percherones:**
```
Negro profundo  #1A1A1A
Dorado          #C9A84C
Hueso           #F2ECD8
```

---

## 📋 Secciones

1. **Hero** — Split screen interactivo
2. **Veterinaria** — 6 servicios + horarios de atención
3. **Percherones** — Bodas, XV años y servicio fúnebre
4. **Galería** — 20 fotos reales con filtros y lightbox
5. **Nosotros** — Historia de Alfonso Esquivel
6. **Testimonios** — Reseñas de clientes
7. **Contacto** — WhatsApp, Instagram, Facebook y mapa
8. **Footer**

---

## 📞 Contacto del negocio

| Canal | Info |
|-------|------|
| 📱 WhatsApp / Tel | [438 100 1019](https://wa.me/524381001019) |
| 📸 Instagram | [@veterinariasesquivel](https://www.instagram.com/veterinariasesquivel) |
| 👤 Facebook | [Percherones Esquivel Puruándiro](https://www.facebook.com/PercheronesEsquivelPuruandiro/) |
| 📍 Ubicación | Puruándiro, Michoacán, México |

---

## 🛠️ Tecnologías

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

- HTML5 semántico
- CSS3 puro (variables, grid, flexbox, animaciones)
- JavaScript vanilla (sin frameworks ni dependencias)
- Google Fonts
- Google Maps embed

---

## 🚀 Uso

```bash
# Clonar el repo
git clone https://github.com/tu-usuario/esquivel.git

# Abrir en navegador
cd esquivel
open index.html   # macOS
start index.html  # Windows
```

No requiere Node.js, npm, ni ningún build step. Es HTML/CSS/JS puro.

---

## 📄 Licencia

Sitio desarrollado a medida para **Percherones y Veterinarias Esquivel**. Todos los derechos sobre las fotografías y el logo pertenecen al cliente.
