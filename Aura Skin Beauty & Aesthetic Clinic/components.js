// ========================
// COMPONENTS.JS — Aura Skin Clinic
// ========================

const NAV_HTML = `
<nav class="navbar" id="navbar">
  <a href="index.html" class="nav-logo">
    <span class="nav-logo-main">Aura Skin</span>
    <span class="nav-logo-tag">Beauty & Aesthetic Clinic</span>
  </a>
  <ul class="nav-links">
    <li><a href="index.html">Beranda</a></li>
    <li><a href="layanan.html">Layanan</a></li>
    <li><a href="paket.html">Paket</a></li>
    <li><a href="booking.html" class="nav-cta">Booking Konsultasi</a></li>
  </ul>
  <div class="hamburger" id="hamburger">
    <span></span><span></span><span></span>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <span class="mobile-close" id="mobileClose">✕</span>
  <a href="index.html">Beranda</a>
  <a href="layanan.html">Layanan</a>
  <a href="paket.html">Paket</a>
  <a href="booking.html">Booking</a>
</div>
`;

const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div>
        <span class="footer-logo">Aura Skin</span>
        <span class="footer-logo-sub">Beauty & Aesthetic Clinic</span>
        <p class="footer-desc">
          Klinik kecantikan profesional dengan layanan perawatan kulit, facial, dan estetika modern. Ditangani oleh dokter berpengalaman dan terapis bersertifikat.
        </p>
        <div class="footer-socials">
          <div class="social-btn">IG</div>
          <div class="social-btn">TK</div>
          <div class="social-btn">WA</div>
          <div class="social-btn">📍</div>
        </div>
      </div>

      <div>
        <span class="footer-col-title">Navigasi</span>
        <ul class="footer-links">
          <li><a href="index.html">Beranda</a></li>
          <li><a href="layanan.html">Layanan</a></li>
          <li><a href="paket.html">Paket Perawatan</a></li>
          <li><a href="booking.html">Booking Konsultasi</a></li>
        </ul>
      </div>

      <div>
        <span class="footer-col-title">Jam Praktek</span>
        <ul class="footer-links" style="gap:0.5rem;">
          <li style="color:rgba(255,255,255,0.4); font-size:0.83rem;">Senin – Jumat</li>
          <li style="color:#c4837a; font-size:0.83rem; font-weight:500;">09.00 – 20.00 WIB</li>
          <li style="color:rgba(255,255,255,0.4); font-size:0.83rem; margin-top:0.4rem;">Sabtu</li>
          <li style="color:#c4837a; font-size:0.83rem; font-weight:500;">09.00 – 17.00 WIB</li>
          <li style="color:rgba(255,255,255,0.4); font-size:0.83rem; margin-top:0.4rem;">Minggu</li>
          <li style="color:rgba(255,255,255,0.3); font-size:0.83rem; font-style:italic;">Tutup</li>
        </ul>
      </div>

      <div>
        <span class="footer-col-title">Kontak</span>
        <div class="footer-contact-item">
          <span class="fc-icon">📍</span>
          <span class="fc-text">Ruko Citra Raya Commercial Area Blok A5, Tangerang, Banten</span>
        </div>
        <div class="footer-contact-item">
          <span class="fc-icon">📞</span>
          <span class="fc-text">+62 813-4567-8901 (WA/Call)</span>
        </div>
        <div class="footer-contact-item">
          <span class="fc-icon">✉️</span>
          <span class="fc-text">hello@auraskinclinic.id</span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2024 Aura Skin Beauty & Aesthetic Clinic. Semua hak dilindungi.</span>
      <span>Citra Raya · Tangerang · <a href="#">Kebijakan Privasi</a></span>
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
