const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");
const provinsiOptions = document.getElementById("provinsiOptions");
const caraMainOptions = document.getElementById("caraMainOptions");

// Toggle panel show/hide
filterToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  filterPanel.classList.toggle("show");
});

// Klik luar -> nutup panel
document.addEventListener("click", (e) => {
  if (!filterPanel.contains(e.target) && !filterToggle.contains(e.target)) {
    filterPanel.classList.remove("show");
  }
});

// Isi opsi dari data.json
function initFilters() {
  // Provinsi (ambil dari field "origin")
  const provinsiList = [...new Set(instruments.map(item => item.origin))];
  provinsiList.forEach(p => {
    if (p) {
      let label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" value="${p}"> ${p}`;
      provinsiOptions.appendChild(label);
    }
  });

  // Cara Main (ambil dari field "howtoplay")
  const caraMainList = [...new Set(instruments.map(item => item.howtoplay))];
  caraMainList.forEach(c => {
    if (c) {
      let label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" value="${c}"> ${c}`;
      caraMainOptions.appendChild(label);
    }
  });

  // Event listener untuk semua checkbox
  document.querySelectorAll("#provinsiOptions input, #caraMainOptions input")
    .forEach(cb => cb.addEventListener("change", applyFilters));
}

function applyFilters() {
  let keyword = document.getElementById("searchInput").value.toLowerCase();

  // Ambil pilihan provinsi (origin)
  const provinsiChecked = [...document.querySelectorAll("#provinsiOptions input:checked")].map(cb => cb.value);
  // Ambil pilihan cara main (howtoplay)
  const caraMainChecked = [...document.querySelectorAll("#caraMainOptions input:checked")].map(cb => cb.value);

  let filtered = instruments.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(keyword) ||
      item.origin.toLowerCase().includes(keyword);

    const matchProvinsi = provinsiChecked.length === 0 || provinsiChecked.includes(item.origin);
    const matchCaraMain = caraMainChecked.length === 0 || caraMainChecked.includes(item.howtoplay);

    return matchSearch && matchProvinsi && matchCaraMain;
  });

  displayResults(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => initFilters(), 500);
});
