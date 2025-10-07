// File: js/mobile-nav.js

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');

  // Saat tombol hamburger di-klik
  hamburger.addEventListener('click', function () {
    // Toggle class 'active' untuk menampilkan/menyembunyikan menu
    navLinks.classList.toggle('active');
    // Toggle class 'active' untuk mengubah hamburger menjadi 'X'
    hamburger.classList.toggle('active');
  });
});