let instruments = [];

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

fetch("../js/data.json")
  .then(response => response.json())
  .then(data => {
    instruments = data;
    displayResults(instruments);
    populateFilters();

    const provParam = getQueryParam("prov");
    if (provParam) {
      const filtered = instruments.filter(item =>
        item.origin.toLowerCase() === provParam.toLowerCase()
      );
      displayResults(filtered);

      const searchInput = document.getElementById("searchInput");
      if (searchInput) searchInput.value = provParam;
    }
  })
  .catch(error => console.error("Gagal load data:", error));

function displayResults(list) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  const favorites = getFavorites();

  if (list.length === 0) {
    results.innerHTML = "<p>Tidak ada hasil ditemukan</p>";
    return;
  }

  list.forEach(item => {
    const isFavorited = favorites.includes(item.id);
    const favoritedClass = isFavorited ? 'favorited' : '';

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

document.getElementById("results").addEventListener('click', function (e) {
  if (e.target.classList.contains('favorite-btn')) {
    toggleFavorite(e.target);
  }
});

function toggleFavorite(starIcon) {
  const instrumentId = starIcon.getAttribute('data-id');
  let favorites = getFavorites();

  if (favorites.includes(instrumentId)) {
    favorites = favorites.filter(id => id !== instrumentId);
    starIcon.classList.remove('favorited');
  } else {
    favorites.push(instrumentId);
    starIcon.classList.add('favorited');
  }

  saveFavorites(favorites);
}

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

function searchInstrument() {
  applyFilters();
}

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

document.getElementById("searchInput").addEventListener("input", applyFilters);
