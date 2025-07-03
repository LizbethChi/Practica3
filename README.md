# GameFinder

**GameFinder** es una aplicación web diseñada para buscar y gestionar tus videojuegos favoritos. Este proyecto académico está construido con HTML, JavaScript y Tailwind CSS, y no requiere backend ni base de datos, ya que usa `localStorage` para guardar la información del usuario.

## Funcionalidades

### Búsqueda de juegos
- Puedes buscar videojuegos por nombre o descripción escribiendo en la barra de búsqueda.
- El sistema mostrará resultados dinámicos a medida que escribes (al presionar Enter o al hacer clic en el ícono de búsqueda).

### Filtros por género
- Puedes filtrar los juegos disponibles según su género: **Todos**, **Acción**, **RPG**, y **Aventura**.
- Al hacer clic en un filtro, se actualizará la lista de juegos mostrados.

### Vista de detalles
- Al hacer clic sobre una tarjeta de juego o en el botón **"Ver detalles"**, se abrirá un modal que muestra:
  - Imagen del juego
  - Año de lanzamiento
  - Plataforma
  - Descripción
  - Enlace oficial del juego

### Gestión de favoritos
- Puedes añadir o eliminar juegos de tu lista de favoritos.
- La información se almacena en el navegador usando `localStorage`, así que se conserva entre sesiones.
- La sección de favoritos muestra todos los juegos marcados con opciones para eliminarlos individualmente.

## Tecnologías

- **HTML5** – Estructura de la interfaz.
- **JavaScript (Vanilla)** – Lógica de filtrado, búsqueda, favoritos, y renderizado dinámico.
- **Tailwind CSS** – Estilos modernos y responsivos.

---
#### ©Integrantes del equipo
1. Adanelly Gamboa
2. Lizeth Puc
3. Lizbeth Chi