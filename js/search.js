

/// Render hasil
function displayResults(list) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  list.forEach(item => {
    const card = `
      <a href="alatmusik.html?id=${item.id}" class="card">
        <img src="${item.image}" alt="${item.name}">
        <div class="card-content">
          <h3>${item.name}</h3>
          <p>${item.origin}</p>
        </div>
      </a>
    `;
    results.innerHTML += card;
  });
}

// Fungsi search
function searchInstrument() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filtered = instruments.filter(item =>
    item.name.toLowerCase().includes(input) ||
    item.origin.toLowerCase().includes(input)
  );
  displayResults(filtered);
}

// Tampilkan semua saat pertama kali
window.onload = () => displayResults(instruments);
