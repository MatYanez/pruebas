const nuevoProyectoBtn = document.getElementById("nuevoProyectoBtn");
const listaProyectos = document.getElementById("listaProyectos");

// Cargar proyectos al iniciar
window.addEventListener("DOMContentLoaded", cargarProyectos);

function cargarProyectos() {
  const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  listaProyectos.innerHTML = "";

  if (proyectos.length === 0) {
    listaProyectos.innerHTML = `
      <p style="text-align:center;color:#888;margin-top:40px;">
        Aún no tienes proyectos. Crea uno nuevo para empezar.
      </p>`;
    return;
  }

  proyectos.forEach((proyecto) => {
    const card = document.createElement("div");
    card.className = "proyecto-card";
    card.innerHTML = `
      <h3>${proyecto.nombre}</h3>
      <small>Creado el ${new Date(proyecto.fecha).toLocaleDateString()}</small>
    `;

    // 🔹 Al hacer clic: guardar y abrir
    card.addEventListener("click", () => {
      localStorage.setItem("proyectoActivo", JSON.stringify(proyecto));
      console.log("Abriendo proyecto:", proyecto.nombre); // debug
      window.location.href = "project.html";
    });

    listaProyectos.appendChild(card);
  });
}

// Crear nuevo proyecto
nuevoProyectoBtn.addEventListener("click", () => {
  const nombre = prompt("Nombre del nuevo proyecto:");
  if (!nombre) return;

  const nuevoProyecto = {
    id: Date.now(),
    nombre,
    fecha: new Date().toISOString(),
    datos: { maqueta: {}, cartas: [], variables: [], contenido: "", config: {} },
  };

  const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  proyectos.push(nuevoProyecto);
  localStorage.setItem("proyectos", JSON.stringify(proyectos));

  // 🔹 Guardar proyecto activo ANTES de redirigir
  localStorage.setItem("proyectoActivo", JSON.stringify(nuevoProyecto));
  console.log("Nuevo proyecto creado:", nuevoProyecto.nombre); // debug

  // Redirigir
  window.location.href = "project.html";
});
