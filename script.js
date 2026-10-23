document.getElementById('yr').textContent = new Date().getFullYear();

const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  }
});

// No backend yet: the form opens the visitor's email client addressed to the company.
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = [
    `Name: ${f.get('name')}`,
    `Email: ${f.get('email')}`,
    `Company: ${f.get('company') || '-'}`,
    `Interest: ${f.get('topic')}`,
    '',
    f.get('message')
  ].join('\n');
  location.href = 'mailto:info@itzone.work.gd?subject=' +
    encodeURIComponent('Quote request – ' + f.get('topic')) +
    '&body=' + encodeURIComponent(body);
  document.getElementById('form-note').textContent = 'Opening your email app to send the request…';
});

// Scroll reveal + card spotlight (skipped for reduced motion)
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const targets = document.querySelectorAll('.sec-head, .card, .dev, .steps li, .checks li, .band-in, .form, .industries .wrap');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  targets.forEach((el, i) => {
    el.classList.add('rv');
    el.style.setProperty('--d', (i % 4) * 0.07 + 's');
    io.observe(el);
  });
}
document.querySelectorAll('.card, .dev').forEach(el => el.addEventListener('pointermove', e => {
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  el.style.setProperty('--my', (e.clientY - r.top) + 'px');
}));
