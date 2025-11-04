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
