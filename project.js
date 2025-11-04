// === Cargar proyecto activo ===
const proyectoActivo = JSON.parse(localStorage.getItem("proyectoActivo"));
const projectName = document.getElementById("projectName");

if (proyectoActivo && projectName) {
  projectName.textContent = proyectoActivo.nombre;
} else {
  alert("No hay proyecto activo. Volviendo al inicio.");
  window.location.href = "index.html";
}

// === Navegación entre tabs ===
const tabButtons = document.querySelectorAll(".tab-btn");
const tabSections = document.querySelectorAll(".tab-section");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Quitar estado activo
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabSections.forEach((sec) => sec.classList.remove("active"));

    // Activar el tab seleccionado
    button.classList.add("active");
    const target = button.getAttribute("data-tab");
    document.getElementById(`tab-${target}`).classList.add("active");

    // Guardar la tab activa en localStorage
    localStorage.setItem("tabActiva", target);
  });
});

// === Restaurar tab activa previa ===
window.addEventListener("DOMContentLoaded", () => {
  const tabGuardada = localStorage.getItem("tabActiva");
  if (tabGuardada) {
    document.querySelector(`[data-tab="${tabGuardada}"]`)?.click();
  }
});

// === Guardar proyecto ===
const saveBtn = document.getElementById("saveProjectBtn");
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
    const index = proyectos.findIndex(p => p.id === proyectoActivo.id);

    if (index >= 0) {
      proyectos[index] = { ...proyectoActivo, fecha: new Date().toISOString() };
      localStorage.setItem("proyectos", JSON.stringify(proyectos));
      localStorage.setItem("proyectoActivo", JSON.stringify(proyectos[index]));
      alert("✅ Proyecto guardado correctamente.");
    }
  });
}

// === Eliminar proyecto ===
const deleteBtn = document.getElementById("deleteProjectBtn");
if (deleteBtn) {
  deleteBtn.addEventListener("click", () => {
    if (!confirm("¿Seguro que deseas eliminar este proyecto?")) return;

    const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
    const nuevos = proyectos.filter(p => p.id !== proyectoActivo.id);
    localStorage.setItem("proyectos", JSON.stringify(nuevos));
    localStorage.removeItem("proyectoActivo");
    window.location.href = "index.html";
  });
}


//variable de cartas

// === VARIABLES: Tipos de carta y categorías ===

// Cargar datos del proyecto activo
if (!proyectoActivo.datos) proyectoActivo.datos = {};
if (!proyectoActivo.datos.variables) proyectoActivo.datos.variables = [];

// Elementos del DOM
const tiposContainer = document.getElementById("tiposContainer");
const addTipoBtn = document.getElementById("addTipoBtn");

// Renderizar lista de tipos
function renderTipos() {
  tiposContainer.innerHTML = "";

  if (proyectoActivo.datos.variables.length === 0) {
    tiposContainer.innerHTML = `
      <p style="color:#8e8e93;">Aún no hay tipos de carta. Agrega uno para comenzar.</p>
    `;
    return;
  }

  proyectoActivo.datos.variables.forEach((tipo, tipoIndex) => {
    const tipoDiv = document.createElement("div");
    tipoDiv.className = "tipo-card";
    tipoDiv.innerHTML = `
      <div class="tipo-header">
        <input class="tipo-nombre" value="${tipo.nombre}" placeholder="Nombre del tipo">
        <button class="delete-tipo">🗑</button>
      </div>
      <div class="categorias">
        ${tipo.categorias.map((cat, catIndex) => `
          <div class="categoria-item">
            <input class="categoria-nombre" value="${cat}" placeholder="Categoría">
            <button class="delete-cat" data-tipo="${tipoIndex}" data-cat="${catIndex}">✖</button>
          </div>
        `).join("")}
      </div>
      <button class="add-cat" data-index="${tipoIndex}">+ Agregar categoría</button>
    `;

    tiposContainer.appendChild(tipoDiv);
  });

  attachTipoEvents();
}

// Eventos de los botones dentro de los tipos
function attachTipoEvents() {
  // Eliminar tipo
  document.querySelectorAll(".delete-tipo").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      proyectoActivo.datos.variables.splice(index, 1);
      guardarVariables();
      renderTipos();
    });
  });

  // Agregar categoría
  document.querySelectorAll(".add-cat").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tipoIndex = parseInt(btn.dataset.index);
      proyectoActivo.datos.variables[tipoIndex].categorias.push("");
      guardarVariables();
      renderTipos();
    });
  });

  // Eliminar categoría
  document.querySelectorAll(".delete-cat").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tipoIndex = parseInt(btn.dataset.tipo);
      const catIndex = parseInt(btn.dataset.cat);
      proyectoActivo.datos.variables[tipoIndex].categorias.splice(catIndex, 1);
      guardarVariables();
      renderTipos();
    });
  });

  // Edición en vivo de nombres
  document.querySelectorAll(".tipo-nombre").forEach((input, index) => {
    input.addEventListener("input", () => {
      proyectoActivo.datos.variables[index].nombre = input.value;
      guardarVariables(false);
    });
  });

  document.querySelectorAll(".categoria-nombre").forEach((input) => {
    input.addEventListener("input", () => {
      const tipoIndex = Array.from(tiposContainer.querySelectorAll(".tipo-card")).indexOf(input.closest(".tipo-card"));
      const catIndex = Array.from(input.closest(".categorias").querySelectorAll(".categoria-item")).indexOf(input.closest(".categoria-item"));
      proyectoActivo.datos.variables[tipoIndex].categorias[catIndex] = input.value;
      guardarVariables(false);
    });
  });
}

// Guardar variables en localStorage
function guardarVariables(showAlert = true) {
  const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  const idx = proyectos.findIndex(p => p.id === proyectoActivo.id);

  if (idx >= 0) {
    proyectos[idx].datos.variables = proyectoActivo.datos.variables;
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
    localStorage.setItem("proyectoActivo", JSON.stringify(proyectos[idx]));
    if (showAlert) console.log("✅ Variables guardadas.");
  }
}

// Botón para agregar nuevo tipo
addTipoBtn.addEventListener("click", () => {
  const nuevoTipo = { nombre: "Nuevo tipo", categorias: [] };
  proyectoActivo.datos.variables.push(nuevoTipo);
  guardarVariables(false);
  renderTipos();
});

// Render inicial
renderTipos();


//fin variable de cartas