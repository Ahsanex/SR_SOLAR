// ============ Year in footer ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ Sticky nav background on scroll ============
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ============ Mobile drawer ============
const drawer = document.getElementById('mobileDrawer');
document.getElementById('drawerOpen').addEventListener('click', () => drawer.classList.add('open'));
document.getElementById('drawerClose').addEventListener('click', () => drawer.classList.remove('open'));
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));

// ============ Scroll reveal ============
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ============ Premium vs Cheap toggle (signature interactive element) ============
const toggleBtns = document.querySelectorAll('.toggle-btn');
const specValues = document.querySelectorAll('.spec-row .value');
const linePremium = document.getElementById('linePremium');
const lineCheap = document.getElementById('lineCheap');

toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    const mode = btn.dataset.mode; // 'premium' | 'cheap'

    specValues.forEach(v => {
      v.textContent = mode === 'premium' ? v.dataset.premium : v.dataset.cheap;
      v.classList.toggle('good', mode === 'premium');
      v.classList.toggle('bad', mode === 'cheap');
    });

    if (mode === 'premium') {
      linePremium.style.opacity = '1';
      lineCheap.style.opacity = '.25';
    } else {
      linePremium.style.opacity = '.25';
      lineCheap.style.opacity = '1';
    }
  });
});

// ============ Contact form -> mailto (no backend on a static site) ============
const form = document.getElementById('quoteForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const type = document.getElementById('type').value;
    const msg = document.getElementById('msg').value.trim();

    const subject = encodeURIComponent(`Site survey request — ${type}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nInterested in: ${type}\n\nDetails:\n${msg}`
    );
    // TODO: replace with SR Solartech's real business email address
    window.location.href = `mailto:info@srsolartech.example?subject=${subject}&body=${body}`;
  });
}
