// ========================
// COMPONENTS.JS — Ironclad Barbershop
// ========================

const NAV_HTML = `
<nav class="navbar" id="navbar">
  <a href="index.html" class="nav-logo">
    <div class="nav-logo-icon">✂️</div>
    <div class="nav-logo-text">
      <span class="nav-logo-main">IRONCLAD</span>
      <span class="nav-logo-tag">Barbershop · Est. 2019</span>
    </div>
  </a>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="services.html">Layanan</a></li>
    <li><a href="booking.html" class="nav-book">Book Now</a></li>
  </ul>
  <div class="hamburger" id="hamburger">
    <span></span><span></span><span></span>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <span class="mobile-close" id="mobileClose">✕</span>
  <a href="index.html">Home</a>
  <a href="services.html">Layanan</a>
  <a href="booking.html">Book Now</a>
</div>
`;

const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div>
        <div class="footer-logo-wrap">
          <div class="footer-logo-icon">✂️</div>
          <span class="footer-logo-name">IRONCLAD</span>
        </div>
        <p class="footer-desc">
          Barbershop premium di Citra Raya, Tangerang. Kami bukan hanya potong rambut — kami membentuk penampilan pria yang percaya diri. Dikerjakan oleh barber tersertifikasi dengan pengalaman bertahun-tahun.
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
          <li><a href="services.html">Layanan & Harga</a></li>
          <li><a href="booking.html">Booking Online</a></li>
        </ul>
      </div>

      <div>
        <span class="footer-col-title">Jam Buka</span>
        <ul class="footer-links" style="gap:0.5rem;">
          <li style="color:var(--muted); font-size:0.83rem;">Senin – Jumat</li>
          <li style="color:var(--copper); font-size:0.83rem; font-family:'Barlow Condensed',sans-serif; font-weight:600; letter-spacing:1px;">09.00 – 21.00 WIB</li>
          <li style="color:var(--muted); font-size:0.83rem; margin-top:0.4rem;">Sabtu – Minggu</li>
          <li style="color:var(--copper); font-size:0.83rem; font-family:'Barlow Condensed',sans-serif; font-weight:600; letter-spacing:1px;">08.00 – 22.00 WIB</li>
        </ul>
      </div>

      <div>
        <span class="footer-col-title">Lokasi & Kontak</span>
        <div class="footer-contact-item">
          <span class="fc-icon">📍</span>
          <span class="fc-text">Ruko Citra Raya Boulevard No. 12A, Citra Raya, Tangerang, Banten</span>
        </div>
        <div class="footer-contact-item">
          <span class="fc-icon">📞</span>
          <span class="fc-text">+62 812-3456-7890 (WA)</span>
        </div>
        <div class="footer-contact-item">
          <span class="fc-icon">📱</span>
          <span class="fc-text">@ironclad.barbershop</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2024 IRONCLAD Barbershop. Citra Raya, Tangerang.</span>
      <span>Look Sharp. Stay Bold.</span>
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

// ========================
// MAIN.JS
// ========================
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const fn = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', fn); fn();
}

function initMobileMenu() {
  const ham   = document.querySelector('.hamburger');
  const menu  = document.querySelector('.mobile-menu');
  const close = document.querySelector('.mobile-close');
  if (!ham || !menu) return;
  ham.addEventListener('click',    () => menu.classList.add('open'));
  close?.addEventListener('click', () => menu.classList.remove('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 100);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });
}

function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    els.forEach(el => {
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = Math.ceil(target / 60);
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur + suffix;
        if (cur >= target) clearInterval(t);
      }, 20);
    });
    obs.disconnect();
  }, { threshold: 0.5 });
  const anchor = els[0].closest('section') || els[0].parentElement;
  if (anchor) obs.observe(anchor);
}

function initTodayHours() {
  const day = new Date().getDay();
  document.querySelectorAll('.hours-row[data-days]').forEach(row => {
    const days = row.dataset.days.split(',').map(Number);
    if (days.includes(day)) row.classList.add('today');
  });
}

function initBookingDate() {
  const el = document.getElementById('bookDate');
  if (!el) return;
  el.min = new Date().toISOString().split('T')[0];
  el.value = new Date().toISOString().split('T')[0];
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initReveal();
  initActiveNav();
  initCounters();
  initTodayHours();
  initBookingDate();
});
