
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const alat = instruments.find(item => item.id === id);

if (alat) {
  document.getElementById("nama").innerText = alat.name;
  document.getElementById("foto").src = alat.image;
  document.getElementById("origin").innerText = alat.origin;
  document.getElementById("deskripsi").innerText = alat.history || "Belum ada deskripsi.";
} else {
  document.querySelector(".content-box").innerHTML = "<h2>Alat musik tidak ditemukan</h2>";
}
