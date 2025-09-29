// Data alat musik
const instruments = [
  // KALIMANTAN
  {
    name: "Sampe",
    origin: "Kalimantan Timur, Dayak Kenyah",
    image: "images/sampe.jpg",
    link: "sampe.html"
  },
  {
    name: "Gendang Dayak",
    origin: "Kalimantan Barat",
    image: "images/gendang_dayak.jpg",
    link: "gendang_dayak.html"
  },

  {
    name: "Gamelan Banjar",
    origin: "Kalimantan Selatan",
    image: "images/gamelan_banjar.jpg",
    link: "gamelan_banjar.html"
  },

  {
    name: "Serunai Banjar",
    origin: "Kalimantan Selatan",
    image: "images/serunai_banjar.jpg",
    link: "serunai_banjar.html"
  },
  {
    name: "Jatung Utang",
    origin: "Kalimantan Tengah",
    image: "images/jatung_utang.jpg",
    link: "jatung_utang.html"
  },
  {
    name: "Kalang Kupak",
    origin: "Kalimantan Selatan",
    image: "images/kalang_kupak.jpg",
    link: "kalang_kupak.html"
  },

  {
  name: "Panting",
  origin: "Kalimantan Selatan, Suku Banjar",
  history: "Panting adalah alat musik petik tradisional khas masyarakat Banjar di Kalimantan Selatan. Bentuknya mirip gitar kecil atau gambus dengan 4 hingga 6 senar. Panting biasanya dimainkan untuk mengiringi lagu-lagu Banjar, baik dalam acara hiburan, upacara adat, maupun pertunjukan seni tradisional. Suaranya yang khas menjadikan Panting sebagai salah satu identitas budaya musik Banjar.",
  image: "images/panting.jpg",
  link: "panting.html"
},

 {
    name: "Balikan",
    origin: "Kalimantan Tengah",
    image: "images/balikan.jpg",
    link: "balikan.html"
  },

  // SULAWESI
  {
    name: "Kolintang",
    origin: "Sulawesi Utara, Minahasa",
    image: "images/kolintang.jpg",
    link: "kolintang.html"
  },
  {
    name: "Ganda",
    origin: "Sulawesi Selatan",
    image: "images/ganda.jpg",
    link: "ganda.html"
  },
  {
    name: "Pui-pui",
    origin: "Sulawesi Selatan",
    image: "images/pui_pui.jpg",
    link: "pui_pui.html"
  },
  {
    name: "Keso-keso",
    origin: "Sulawesi Selatan, Bugis-Makassar",
    image: "images/keso_keso.jpg",
    link: "keso_keso.html"
  },
  {
    name: "Popondi",
    origin: "Sulawesi Barat",
    image: "images/popondi.jpg",
    link: "popondi.html"
  },
  {
    name: "Alosu",
    origin: "Sulawesi Selatan",
    image: "images/alosu.jpg",
    link: "alosu.html"
  },
  {
    name: "Pare’e",
    origin: "Sulawesi Barat",
    image: "images/paree.jpg",
    link: "paree.html"
  },
  {
    name: "Gambus",
    origin: "Sulawesi Selatan",
    image: "images/gambus.jpg",
    link: "gambus.html"
  },
  {
    name: "Suling Bola",
    origin: "Sulawesi Selatan",
    image: "images/suling_bola.jpg",
    link: "suling_bola.html"
  }
];

// Render hasil
function displayResults(list) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  list.forEach(item => {
    const card = `
      <a href="${item.link}" class="card">
        <img src="${item.image}" alt="${item.name}">
        <div class="card-content">
          <h3>${item.name}</h3>
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
