// Cargar proyecto activo
const proyectoActivo = JSON.parse(localStorage.getItem("proyectoActivo"));
const projectName = document.getElementById("projectName");

if (proyectoActivo && projectName) {
  projectName.textContent = proyectoActivo.nombre;
} else {
  alert("No hay proyecto activo. Volviendo al inicio.");
  window.location.href = "index.html";
}

// Tabs
const tabs = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".tab-section");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));

    tab.classList.add("active");
    const id = tab.dataset.tab;
    document.getElementById(`tab-${id}`).classList.add("active");
  });
});

// Guardar cambios
document.getElementById("saveProjectBtn")?.addEventListener("click", () => {
  const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  const idx = proyectos.findIndex(p => p.id === proyectoActivo.id);

  if (idx >= 0) {
    proyectos[idx] = { ...proyectos[idx], fecha: new Date().toISOString() };
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
    localStorage.setItem("proyectoActivo", JSON.stringify(proyectos[idx]));
    alert("✅ Proyecto guardado correctamente.");
  }
});

// Eliminar proyecto
document.getElementById("deleteProjectBtn")?.addEventListener("click", () => {
  if (!confirm("¿Seguro que deseas eliminar este proyecto?")) return;

  const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  const nuevos = proyectos.filter(p => p.id !== proyectoActivo.id);
  localStorage.setItem("proyectos", JSON.stringify(nuevos));
  localStorage.removeItem("proyectoActivo");
  window.location.href = "index.html";
});
