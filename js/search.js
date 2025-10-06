let instruments = [];

// Helper ambil parameter dari URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Ambil data dari file JSON
fetch("../js/data.json")
  .then(response => response.json())
  .then(data => {
    instruments = data;
    displayResults(instruments); // tampilkan semua pas load pertama
    populateFilters(); // isi dropdown filter setelah data ke-load

    // 🔹 Cek apakah ada parameter "prov" di URL
    const provParam = getQueryParam("prov");
    if (provParam) {
      // Auto filter berdasarkan provinsi
      const filtered = instruments.filter(item => 
        item.origin.toLowerCase() === provParam.toLowerCase()
      );
      displayResults(filtered);

      // Sekalian isi search box biar kelihatan
      const searchInput = document.getElementById("searchInput");
      if (searchInput) searchInput.value = provParam;
    }
  })
  .catch(error => console.error("Gagal load data:", error));

// Render hasil
function displayResults(list) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (list.length === 0) {
    results.innerHTML = "<p>Tidak ada hasil ditemukan</p>";
    return;
  }

  list.forEach(item => {
    const card = `
      <a href="alatmusik.html?id=${item.id}" class="card">
        <img src="${item.image}" alt="${item.name}">
        <div class="card-content">
          <h3>${item.name}</h3>
          <p><b>Asal:</b> ${item.origin}</p>
        </div>
      </a>
    `;
    results.innerHTML += card;
  });
}

// Fungsi isi dropdown provinsi
function populateFilters() {
  const provinsiOptions = document.getElementById("provinsiOptions");
  let provinsiSet = new Set();

  instruments.forEach(item => {
    if (item.origin) {
      provinsiSet.add(item.origin);
    }
  });

  provinsiOptions.innerHTML = "";
  provinsiSet.forEach(prov => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" value="${prov}"> ${prov}`;
    provinsiOptions.appendChild(label);
    provinsiOptions.appendChild(document.createElement("br"));
  });
}

// Fungsi search manual
function searchInstrument() {
  applyFilters();
}

// Fungsi filter
function applyFilters() {
  const input = document.getElementById("searchInput").value.toLowerCase();

  let filtered = instruments.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(input) ||
      item.origin.toLowerCase().includes(input) ||
      item.history.toLowerCase().includes(input) || 
      item.meaning.toLowerCase().includes(input);

    return matchSearch;
  });

  displayResults(filtered);
}

// Event listener untuk search realtime
document.getElementById("searchInput").addEventListener("input", applyFilters);
