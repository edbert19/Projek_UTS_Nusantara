document.addEventListener('DOMContentLoaded', () => {
    let allInstruments = [];
    const resultsContainer = document.getElementById('favorite-results');

    // --- Helper Functions untuk Local Storage ---
    function getFavorites() {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    }

    function saveFavorites(favorites) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // --- Ambil semua data alat musik ---
    fetch('../js/data.json')
        .then(response => response.json())
        .then(data => {
            allInstruments = data;
            loadFavorites(); // Setelah data siap, muat item favorit
        })
        .catch(error => console.error("Gagal memuat data:", error));

    // --- Fungsi untuk memuat dan menampilkan item favorit ---
    function loadFavorites() {
        const favoriteIds = getFavorites();
        const favoriteInstruments = allInstruments.filter(item => favoriteIds.includes(item.id));
        displayFavorites(favoriteInstruments);
    }

    // --- Fungsi untuk merender card ke halaman ---
    function displayFavorites(list) {
        resultsContainer.innerHTML = '';

        if (list.length === 0) {
            resultsContainer.innerHTML = '<p class="no-favorites-message">Anda belum menambahkan alat musik favorit.</p>';
            return;
        }

        list.forEach(item => {
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'card-wrapper';
            // Simpan data-id di wrapper untuk mempermudah penghapusan
            cardWrapper.setAttribute('data-id', item.id); 
            
            cardWrapper.innerHTML = `
                <a href="alatmusik.html?id=${item.id}" class="card">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="card-content">
                        <h3>${item.name}</h3>
                        <p>${item.origin}</p>
                    </div>
                </a>
                <i class="fas fa-star favorite-btn favorited" data-id="${item.id}"></i>
            `;
            resultsContainer.appendChild(cardWrapper);
        });
    }

    // --- Event listener untuk menghapus favorit ---
    resultsContainer.addEventListener('click', function(e) {
        // Cek apakah yang diklik adalah tombol favorit
        if (e.target.classList.contains('favorite-btn')) {
            const instrumentId = e.target.getAttribute('data-id');
            let favorites = getFavorites();
            
            // Hapus dari array favorites
            favorites = favorites.filter(id => id !== instrumentId);
            saveFavorites(favorites);

            // Hapus card dari tampilan (DOM)
            const cardWrapperToRemove = document.querySelector(`.card-wrapper[data-id="${instrumentId}"]`);
            if (cardWrapperToRemove) {
                cardWrapperToRemove.remove();
            }

            // Jika daftar favorit jadi kosong, tampilkan pesan
            if (getFavorites().length === 0) {
                 resultsContainer.innerHTML = '<p class="no-favorites-message">Anda belum menambahkan alat musik favorit.</p>';
            }
        }
    });
});