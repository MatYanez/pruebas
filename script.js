// Cargar datos del proyecto activo (si existe)
const proyectoActivo = JSON.parse(localStorage.getItem("proyectoActivo"));
if (proyectoActivo) {
  const tituloProyecto = document.getElementById("tituloProyecto");
  if (tituloProyecto) tituloProyecto.textContent = `🎴 ${proyectoActivo.nombre}`;
}

const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const imagen = document.getElementById("imagen");
const poder = document.getElementById("poder");
const colorFondo = document.getElementById("colorFondo");
const resetBtn = document.getElementById("resetBtn");

const carta = document.getElementById("carta");
const cartaNombre = carta.querySelector(".carta-nombre");
const cartaDescripcion = carta.querySelector(".carta-descripcion");
const cartaImagen = carta.querySelector(".carta-imagen");
const cartaPoder = carta.querySelector(".carta-poder");

nombre.addEventListener("input", () => (cartaNombre.textContent = nombre.value || "Sin nombre"));
descripcion.addEventListener("input", () => (cartaDescripcion.textContent = descripcion.value || "Sin descripción"));
imagen.addEventListener("input", () => {
  cartaImagen.style.backgroundImage = imagen.value
    ? `url('${imagen.value}')`
    : "url('https://picsum.photos/280/200?random=1')";
});
poder.addEventListener("input", () => (cartaPoder.textContent = `⚡ ${poder.value || 0}`));
colorFondo.addEventListener("input", () => (carta.style.backgroundColor = colorFondo.value));

resetBtn.addEventListener("click", () => {
  nombre.value = "";
  descripcion.value = "";
  imagen.value = "";
  poder.value = "";
  colorFondo.value = "#f1f2f6";
  cartaNombre.textContent = "Dragón Azul";
  cartaDescripcion.textContent = "Una criatura legendaria del cielo.";
  cartaImagen.style.backgroundImage = "url('https://picsum.photos/280/200?random=1')";
  cartaPoder.textContent = "⚡ 85";
  carta.style.backgroundColor = "#f1f2f6";
});

const exportBtn = document.getElementById("exportBtn");

exportBtn.addEventListener("click", () => {
  html2canvas(carta, { backgroundColor: null }).then((canvas) => {
    const link = document.createElement("a");
    link.download = `${cartaNombre.textContent.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

// --- Tabs verticales ---
const vTabs = document.querySelectorAll(".tab-btn-vertical");
const vPanels = document.querySelectorAll(".tab-panel-vertical");

vTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    vTabs.forEach((t) => t.classList.remove("active"));
    vPanels.forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    const target = tab.dataset.tab;
    document.getElementById(`tab-${target}`).classList.add("active");
  });
});

// --- Tab: Cartas ---
const nuevaCartaBtn = document.getElementById("nuevaCartaBtn");
const listaCartas = document.getElementById("listaCartas");
let cartas = [];

if (nuevaCartaBtn) {
  nuevaCartaBtn.addEventListener("click", () => {
    const nombre = prompt("Nombre de la nueva carta:");
    if (!nombre) return;
    const nueva = { id: Date.now(), nombre };
    cartas.push(nueva);
    renderCartas();
  });
}

function renderCartas() {
  listaCartas.innerHTML = "";
  cartas.forEach((c) => {
    const div = document.createElement("div");
    div.textContent = c.nombre;
    listaCartas.appendChild(div);
  });
}

// --- Tab: Variables ---
const nuevaVariableBtn = document.getElementById("nuevaVariableBtn");
const variablesContainer = document.getElementById("variablesContainer");
let variables = [];

if (nuevaVariableBtn) {
  nuevaVariableBtn.addEventListener("click", () => {
    const nombre = prompt("Nombre de la variable:");
    if (!nombre) return;
    const valor = prompt("Valor inicial:");
    variables.push({ nombre, valor });
    renderVariables();
  });
}

function renderVariables() {
  variablesContainer.innerHTML = "";
  variables.forEach((v) => {
    const div = document.createElement("div");
    div.textContent = `${v.nombre}: ${v.valor}`;
    variablesContainer.appendChild(div);
  });
}

// --- Tab: Contenido ---
const contenidoTexto = document.getElementById("contenidoTexto");
if (contenidoTexto) {
  contenidoTexto.addEventListener("input", () => {
    console.log("Contenido actualizado:", contenidoTexto.value);
  });
}

// --- Tab: Configuración ---
const guardarProyectoBtn = document.getElementById("guardarProyectoBtn");
if (guardarProyectoBtn) {
  guardarProyectoBtn.addEventListener("click", () => {
    const proyectoActivo = JSON.parse(localStorage.getItem("proyectoActivo"));
    const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];

    const index = proyectos.findIndex((p) => p.id === proyectoActivo.id);
    const actualizado = {
      ...proyectoActivo,
      cartas,
      variables,
      contenido: contenidoTexto.value,
    };

    if (index >= 0) proyectos[index] = actualizado;
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
    localStorage.setItem("proyectoActivo", JSON.stringify(actualizado));

    alert("✅ Proyecto guardado correctamente");
  });
}
