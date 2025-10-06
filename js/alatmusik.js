const params = new URLSearchParams(window.location.search);
const instrumentId = params.get("id");

fetch("../js/data.json") 
  .then(response => response.json())
  .then(data => {
    const instrument = data.find(item => item.id === instrumentId);
    if (instrument) {
      showDetail(instrument);
    } else {
      document.querySelector(".content-box").innerHTML = "<p>Data tidak ditemukan.</p>";
    }
  })
  .catch(error => console.error("Gagal load data:", error));

function showDetail(item) {
  document.getElementById("nama").textContent = item.name;
  document.getElementById("foto").src = item.image;
  document.getElementById("origin").textContent = item.origin;
  document.getElementById("history").textContent = item.history;
  document.getElementById("meaning").textContent = item.meaning;
  document.getElementById("howToPlaydetail").textContent = item.howToPlayDetail;

  const contentBox = document.querySelector(".content-box");
  const favBtn = createFavoriteButton(item.id);
  contentBox.appendChild(favBtn);
}
