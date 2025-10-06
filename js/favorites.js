document.addEventListener('DOMContentLoaded', () => {
    let allInstruments = [];
    const resultsContainer = document.getElementById('favorite-results');

    function getFavorites() {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    }

    function saveFavorites(favorites) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    fetch('../js/data.json')
        .then(response => response.json())
        .then(data => {
            allInstruments = data;
            loadFavorites(); 
        })
        .catch(error => console.error("Gagal memuat data:", error));

    function loadFavorites() {
        const favoriteIds = getFavorites();
        const favoriteInstruments = allInstruments.filter(item => favoriteIds.includes(item.id));
        displayFavorites(favoriteInstruments);
    }

    function displayFavorites(list) {
        resultsContainer.innerHTML = '';

        if (list.length === 0) {
            resultsContainer.innerHTML = '<p class="no-favorites-message">Anda belum menambahkan alat musik favorit.</p>';
            return;
        }

        list.forEach(item => {
            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'card-wrapper';
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

    resultsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('favorite-btn')) {
            const instrumentId = e.target.getAttribute('data-id');
            let favorites = getFavorites();
            favorites = favorites.filter(id => id !== instrumentId);
            saveFavorites(favorites);

            const cardWrapperToRemove = document.querySelector(`.card-wrapper[data-id="${instrumentId}"]`);
            if (cardWrapperToRemove) {
                cardWrapperToRemove.remove();
            }

            if (getFavorites().length === 0) {
                 resultsContainer.innerHTML = '<p class="no-favorites-message">Anda belum menambahkan alat musik favorit.</p>';
            }
        }
    });
});