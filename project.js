// === Referencias a elementos del DOM ===
const nuevoProyectoBtn = document.getElementById("nuevoProyectoBtn");
const listaProyectos = document.getElementById("listaProyectos");

// === Cargar lista de proyectos al iniciar ===
window.addEventListener("DOMContentLoaded", cargarProyectos);

function cargarProyectos() {
  const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  listaProyectos.innerHTML = "";

  if (proyectos.length === 0) {
    listaProyectos.innerHTML = "<p style='text-align:center;color:#888;'>Aún no tienes proyectos.</p>";
    return;
  }

  proyectos.forEach((proyecto) => {
    const card = document.createElement("div");
    card.className = "proyecto-card";
    card.innerHTML = `
      <h3>${proyecto.nombre}</h3>
      <small>Creado el ${new Date(proyecto.fecha).toLocaleDateString()}</small>
    `;

    // 🔹 Al hacer clic, guarda el proyecto activo y redirige a project.html
    card.addEventListener("click", () => {
      localStorage.setItem("proyectoActivo", JSON.stringify(proyecto));
      window.location.href = "project.html";
    });

    listaProyectos.appendChild(card);
  });
}

// === Crear nuevo proyecto ===
nuevoProyectoBtn.addEventListener("click", () => {
  const nombre = prompt("Nombre del nuevo proyecto:");
  if (!nombre) return;

  const nuevo = {
    id: Date.now(),
    nombre,
    fecha: new Date().toISOString(),
    datos: {
      maqueta: {},
      cartas: [],
      variables: [],
      contenido: "",
      config: {},
    },
  };

  const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  proyectos.push(nuevo);
  localStorage.setItem("proyectos", JSON.stringify(proyectos));

  // 🔹 Guardar como proyecto activo y abrirlo directamente
  localStorage.setItem("proyectoActivo", JSON.stringify(nuevo));
  window.location.href = "project.html";
});

// === Cambiar entre tabs ===
const tabButtons = document.querySelectorAll(".tab-btn");
const tabSections = document.querySelectorAll(".tab-section");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Quitar estado activo de todos
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabSections.forEach((section) => section.classList.remove("active"));

    // Activar el tab clicado
    button.classList.add("active");
    const target = button.getAttribute("data-tab");
    document.getElementById(`tab-${target}`).classList.add("active");
  });
});
