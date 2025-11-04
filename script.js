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
