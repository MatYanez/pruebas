const nuevoProyectoBtn = document.getElementById("nuevoProyectoBtn");
const listaProyectos = document.getElementById("listaProyectos");

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
    card.addEventListener("click", () => {
      localStorage.setItem("proyectoActivo", JSON.stringify(proyecto));
 window.location.href = "project.html";
    });
    listaProyectos.appendChild(card);
  });
}

nuevoProyectoBtn.addEventListener("click", () => {
  const nombre = prompt("Nombre del nuevo proyecto:");
  if (!nombre) return;

  const nuevo = {
    id: Date.now(),
    nombre,
    fecha: new Date().toISOString(),
    datos: {}, // aquí se guardarán los valores del editor
  };

  const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  proyectos.push(nuevo);
  localStorage.setItem("proyectos", JSON.stringify(proyectos));
  cargarProyectos();
});

window.addEventListener("DOMContentLoaded", cargarProyectos);
