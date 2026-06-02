// ========================
// COMPONENTS.JS — Inject shared navbar & footer
// ========================

const NAV_HTML = `
<nav class="navbar" id="navbar">
  <a href="index.html" class="nav-logo">
    Kopi Arunika
    <span>Since 2018 · Artisan Coffee</span>
  </a>
  <ul class="nav-links">
    <li><a href="index.html">Beranda</a></li>
    <li><a href="menu.html">Menu</a></li>
    <li><a href="about.html">Tentang Kami</a></li>
    <li><a href="contact.html" class="nav-cta">Kunjungi Kami</a></li>
  </ul>
  <div class="hamburger" id="hamburger" aria-label="Buka menu">
    <span></span><span></span><span></span>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <span class="mobile-close" id="mobileClose">✕</span>
  <a href="index.html">Beranda</a>
  <a href="menu.html">Menu</a>
  <a href="about.html">Tentang Kami</a>
  <a href="contact.html">Kunjungi Kami</a>
</div>
`;

const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div>
        <span class="footer-brand-name">Kopi Arunika</span>
        <p class="footer-brand-desc">
          Secangkir kopi bukan sekadar minuman — ia adalah momen, cerita, dan kehangatan yang kami racik dengan sepenuh hati sejak 2018.
        </p>
        <div class="footer-socials">
          <div class="social-btn" title="Instagram">IG</div>
          <div class="social-btn" title="TikTok">TK</div>
          <div class="social-btn" title="WhatsApp">WA</div>
          <div class="social-btn" title="Google Maps">📍</div>
        </div>
      </div>

      <div>
        <span class="footer-col-title">Navigasi</span>
        <ul class="footer-links">
          <li><a href="index.html">Beranda</a></li>
          <li><a href="menu.html">Menu Kami</a></li>
          <li><a href="about.html">Tentang Kami</a></li>
          <li><a href="contact.html">Kontak & Lokasi</a></li>
        </ul>
      </div>

      <div>
        <span class="footer-col-title">Jam Buka</span>
        <ul class="footer-links" style="gap: 0.5rem;">
          <li style="color: var(--text-muted); font-size: 0.85rem;">Senin – Jumat</li>
          <li style="color: var(--gold); font-size: 0.85rem; font-weight: 700;">07.00 – 22.00</li>
          <li style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">Sabtu – Minggu</li>
          <li style="color: var(--gold); font-size: 0.85rem; font-weight: 700;">08.00 – 23.00</li>
          <li style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem;">Hari Libur Nasional</li>
          <li style="color: var(--gold); font-size: 0.85rem; font-weight: 700;">09.00 – 21.00</li>
        </ul>
      </div>

      <div>
        <span class="footer-col-title">Kontak</span>
        <div class="footer-contact-item">
          <span class="contact-icon">📍</span>
          <span class="contact-text">Jl. Raya Artisan No. 12, Permata Balaraja, Kab. Tangerang, Banten 15660</span>
        </div>
        <div class="footer-contact-item">
          <span class="contact-icon">📞</span>
          <span class="contact-text">+62 856-1234-5678</span>
        </div>
        <div class="footer-contact-item">
          <span class="contact-icon">✉️</span>
          <span class="contact-text">hello@kopiarunika.id</span>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© 2024 Kopi Arunika. Semua hak dilindungi.</span>
      <span>Dibuat dengan ☕ &amp; ❤️ di Balaraja</span>
    </div>
  </div>
</footer>
`;

// Inject on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.getElementById('nav-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  if (navEl) navEl.outerHTML = NAV_HTML;
  if (footerEl) footerEl.outerHTML = FOOTER_HTML;
});
