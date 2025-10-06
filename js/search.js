let instruments = [];

// Helper Functions untuk menyimpan dan mengambil data favorit dari browser
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Ambil data dari file JSON
fetch("../js/data.json")
  .then(response => response.json())
  .then(data => {
    instruments = data;
    displayResults(instruments); // tampilkan semua pas load pertama
    // populateFilters(); // Fungsi ini mungkin sudah ada di filter.js atau kode lain
  })
  .catch(error => console.error("Gagal load data:", error));

// Render hasil
function displayResults(list) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  const favorites = getFavorites(); // Ambil daftar favorit saat ini

  if (list.length === 0) {
    results.innerHTML = "<p>Tidak ada hasil ditemukan</p>";
    return;
  }

  list.forEach(item => {
    // Cek apakah item ini ada di daftar favorit
    const isFavorited = favorites.includes(item.id);
    const favoritedClass = isFavorited ? 'favorited' : '';
    
    // Template card diubah untuk menyertakan wrapper dan ikon bintang
    const card = `
      <div class="card-wrapper">
        <a href="alatmusik.html?id=${item.id}" class="card">
          <img src="${item.image}" alt="${item.name}">
          <div class="card-content">
            <h3>${item.name}</h3>
            <p>${item.origin}</p>
          </div>
        </a>
        <i 
          class="fas fa-star favorite-btn ${favoritedClass}" 
          data-id="${item.id}"
        ></i>
      </div>
    `;
    results.innerHTML += card;
  });
}

// Event listener untuk menangani klik pada ikon bintang
document.getElementById("results").addEventListener('click', function(e) {
    // Pastikan yang diklik adalah elemen dengan class 'favorite-btn'
    if (e.target.classList.contains('favorite-btn')) {
        toggleFavorite(e.target);
    }
});

// Fungsi untuk menambah atau menghapus item dari favorit
function toggleFavorite(starIcon) {
    const instrumentId = starIcon.getAttribute('data-id');
    let favorites = getFavorites();

    if (favorites.includes(instrumentId)) {
        // Jika sudah favorit, hapus dari daftar
        favorites = favorites.filter(id => id !== instrumentId);
        starIcon.classList.remove('favorited');
    } else {
        // Jika belum, tambahkan ke daftar favorit
        favorites.push(instrumentId);
        starIcon.classList.add('favorited');
    }
    
    saveFavorites(favorites); // Simpan daftar favorit yang baru ke browser
}

// Catatan: Kode filter asli Anda bisa diletakkan di sini jika masih digunakan di file ini.
// Contoh: function applyFilters(), event listeners untuk filter, dll.