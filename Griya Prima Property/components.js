// ========================
// COMPONENTS.JS — Griya Prima Properti
// ========================

const NAV_HTML = `
<nav class="navbar" id="navbar">
  <a href="index.html" class="nav-logo">
    <span class="nav-logo-main">Griya Prima</span>
    <span class="nav-logo-tag">Property & Real Estate</span>
  </a>
  <ul class="nav-links">
    <li><a href="index.html">Beranda</a></li>
    <li><a href="listing.html">Properti</a></li>
    <li><a href="layanan.html">Layanan</a></li>
    <li><a href="kontak.html" class="nav-cta">Konsultasi Gratis</a></li>
  </ul>
  <div class="hamburger" id="hamburger">
    <span></span><span></span><span></span>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <span class="mobile-close" id="mobileClose">✕</span>
  <a href="index.html">Beranda</a>
  <a href="listing.html">Properti</a>
  <a href="layanan.html">Layanan</a>
  <a href="kontak.html">Konsultasi</a>
</div>
`;

const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <span class="footer-logo-main">Griya Prima</span>
        <span class="footer-logo-sub">Property & Real Estate</span>
        <p class="footer-desc">
          Agen properti terpercaya di kawasan Citra Raya dan sekitarnya. Kami membantu Anda menemukan, membeli, menjual, dan menyewakan properti dengan proses yang transparan dan mudah.
        </p>
        <div class="footer-socials">
          <div class="social-btn">IG</div>
          <div class="social-btn">FB</div>
          <div class="social-btn">WA</div>
          <div class="social-btn">YT</div>
        </div>
      </div>

      <div>
        <span class="footer-col-title">Navigasi</span>
        <ul class="footer-links">
          <li><a href="index.html">Beranda</a></li>
          <li><a href="listing.html">Daftar Properti</a></li>
          <li><a href="layanan.html">Layanan Kami</a></li>
          <li><a href="kontak.html">Hubungi Kami</a></li>
        </ul>
      </div>

      <div>
        <span class="footer-col-title">Layanan</span>
        <ul class="footer-links">
          <li><a href="layanan.html">Jual Properti</a></li>
          <li><a href="layanan.html">Beli Properti</a></li>
          <li><a href="layanan.html">Sewa Properti</a></li>
          <li><a href="layanan.html">KPR Konsultasi</a></li>
          <li><a href="layanan.html">Investasi Properti</a></li>
        </ul>
      </div>

      <div>
        <span class="footer-col-title">Kontak</span>
        <div class="footer-contact-item">
          <span class="fc-icon">📍</span>
          <span class="fc-text">Ruko Citra Raya Town Square Blok B2, Tangerang, Banten 15750</span>
        </div>
        <div class="footer-contact-item">
          <span class="fc-icon">📞</span>
          <span class="fc-text">+62 821-3456-7890 (WA/Call)</span>
        </div>
        <div class="footer-contact-item">
          <span class="fc-icon">✉️</span>
          <span class="fc-text">info@griyaprima.id</span>
        </div>
        <div class="footer-contact-item">
          <span class="fc-icon">🕐</span>
          <span class="fc-text">Senin – Sabtu, 08.00 – 20.00 WIB</span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2024 Griya Prima Property. Semua hak dilindungi. Terdaftar di PPAT Kab. Tangerang.</span>
      <span><a href="#">Kebijakan Privasi</a> · <a href="#">Syarat & Ketentuan</a></span>
    </div>
  </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
  const n = document.getElementById('nav-placeholder');
  const f = document.getElementById('footer-placeholder');
  if (n) n.outerHTML = NAV_HTML;
  if (f) f.outerHTML = FOOTER_HTML;
});
