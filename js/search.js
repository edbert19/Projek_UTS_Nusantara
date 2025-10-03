let instruments = [];

// Ambil data dari file JSON
fetch("../js/data.json")
  .then(response => response.json())
  .then(data => {
    instruments = data;
    displayResults(instruments); // tampilkan semua pas load pertama
    populateFilters(); // isi dropdown filter setelah data ke-load
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
          <p>${item.origin} - ${item.howtoplay}</p>
        </div>
      </a>
    `;
    results.innerHTML += card;
  });
}

// Fungsi isi dropdown pulau
function populateFilters() {
  const pulauSelect = document.getElementById("pulauSelect");
  let pulauSet = new Set();

  instruments.forEach(item => {
    if (item.origin) {
      pulauSet.add(item.origin);
    }
  });

  pulauSet.forEach(pulau => {
    const option = document.createElement("option");
    option.value = pulau;
    option.textContent = pulau;
    pulauSelect.appendChild(option);
  });
}

// Fungsi search
function searchInstrument() {
  applyFilters();
}

// Fungsi filter
function applyFilters() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const pulau = document.getElementById("pulauSelect").value;
  const caraMain = document.getElementById("caraMainSelect").value;

  let filtered = instruments.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(input) ||
      item.origin.toLowerCase().includes(input);

    const matchPulau = pulau === "" || item.origin === pulau;
    const matchCaraMain = caraMain === "" || item.howtoplay === caraMain;

    return matchSearch && matchPulau && matchCaraMain;
  });

  displayResults(filtered);
}

// Event listener untuk filter
document.getElementById("pulauSelect").addEventListener("change", applyFilters);
document.getElementById("caraMainSelect").addEventListener("change", applyFilters);
document.getElementById("searchInput").addEventListener("input", applyFilters);
