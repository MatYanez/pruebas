// === Referencias al DOM ===
const nuevoProyectoBtn = document.getElementById("nuevoProyectoBtn");
const listaProyectos = document.getElementById("listaProyectos");

// === Cargar proyectos al iniciar ===
window.addEventListener("DOMContentLoaded", cargarProyectos);

function cargarProyectos() {
  const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  listaProyectos.innerHTML = "";

  if (proyectos.length === 0) {
    listaProyectos.innerHTML = `
      <p style="text-align:center;color:#888;margin-top:40px;">
        Aún no tienes proyectos. Crea uno nuevo para empezar.
      </p>
    `;
    return;
  }

  proyectos.forEach((proyecto) => {
    const card = document.createElement("div");
    card.className = "proyecto-card";
    card.innerHTML = `
      <h3>${proyecto.nombre}</h3>
      <small>Creado el ${new Date(proyecto.fecha).toLocaleDateString()}</small>
    `;

    // 🔹 Al hacer clic en un proyecto, guardarlo como activo y abrirlo
    card.addEventListener("click", () => {
      localStorage.setItem("proyectoActivo", JSON.stringify(proyecto));
      window.location.href = "project.html";
    });

    listaProyectos.appendChild(card);
  });
}

// === Crear un nuevo proyecto ===
nuevoProyectoBtn.addEventListener("click", () => {
  const nombre = prompt("Nombre del nuevo proyecto:");
  if (!nombre) return;

  const nuevoProyecto = {
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

  // Guardar el proyecto en localStorage
  const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  proyectos.push(nuevoProyecto);
  localStorage.setItem("proyectos", JSON.stringify(proyectos));

  // Guardar el proyecto activo
  localStorage.setItem("proyectoActivo", JSON.stringify(nuevoProyecto));

  // Redirigir a la página del proyecto
  window.location.href = "project.html";
});
