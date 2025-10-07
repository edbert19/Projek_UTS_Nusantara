
const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");
const provinsiOptions = document.getElementById("provinsiOptions");
const caraMainOptions = document.getElementById("caraMainOptions");

// === SHOW / HIDE PANEL ===
filterToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  filterPanel.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!filterPanel.contains(e.target) && !filterToggle.contains(e.target)) {
    filterPanel.classList.remove("show");
  }
});

// === INISIALISASI FILTER ===
function initFilters() {
  if (!instruments || instruments.length === 0) return; // pastikan data udah siap

  // Bersihkan dulu biar ga dobel
  provinsiOptions.innerHTML = "";
  caraMainOptions.innerHTML = "";

  // === PROVINSI ===
  const provinsiList = [...new Set(instruments.map(i => i.origin))];
  provinsiList.forEach(prov => {
    if (prov) {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" value="${prov}"> ${prov}`;
      provinsiOptions.appendChild(label);
    }
  });

  // === CARA MAIN ===
  const caraMainList = [...new Set(instruments.map(i => i.howToPlay))];
  caraMainList.forEach(cara => {
    if (cara) {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" value="${cara}"> ${cara}`;
      caraMainOptions.appendChild(label);
    }
  });

  // === EVENT CHECKBOX ===
  document.querySelectorAll("#provinsiOptions input, #caraMainOptions input")
    .forEach(cb => cb.addEventListener("change", applyFilters));
}

// === FILTERING LOGIC ===
function applyFilters() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  const provinsiChecked = [...document.querySelectorAll("#provinsiOptions input:checked")].map(cb => cb.value);
  const caraMainChecked = [...document.querySelectorAll("#caraMainOptions input:checked")].map(cb => cb.value);

  const filtered = instruments.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(keyword) ||
      item.origin.toLowerCase().includes(keyword);

    const matchProv = provinsiChecked.length === 0 || provinsiChecked.includes(item.origin);
    const matchCara = caraMainChecked.length === 0 || caraMainChecked.includes(item.howToPlay);

    return matchSearch && matchProv && matchCara;
  });

  displayResults(filtered);
}

// === TUNGGU DATA DARI search.js ===
document.addEventListener("DOMContentLoaded", () => {
  const checkData = setInterval(() => {
    if (instruments && instruments.length > 0) {
      clearInterval(checkData);
      initFilters();
    }
  }, 200);
});

