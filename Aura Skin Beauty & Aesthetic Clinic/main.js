// ========================
// MAIN.JS — Klinik Kecantikan
// ========================

function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const fn = () => nav.classList.toggle('scrolled', window.scrollY > 50);
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
        setTimeout(() => e.target.classList.add('visible'), i * 90);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
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
  const d = new Date();
  d.setDate(d.getDate() + 1);
  el.min = d.toISOString().split('T')[0];
  el.value = d.toISOString().split('T')[0];
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
