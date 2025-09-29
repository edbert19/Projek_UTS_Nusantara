// ambil container
const resultsContainer = document.getElementById("results");
const searchInput = document.getElementById("searchInput");

// fungsi render card
function renderInstruments(list) {
  const container = document.getElementById("results-container");
  container.innerHTML = "";

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
    `;

    container.appendChild(card);
  });
}


// render awal
renderInstruments(instruments);

// fitur search
searchInput.addEventListener("input", function() {
  const keyword = this.value.toLowerCase();
  const filtered = instruments.filter(item =>
    item.name.toLowerCase().includes(keyword) ||
    item.origin.toLowerCase().includes(keyword)
  );
  renderInstruments(filtered);
});
