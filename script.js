const modal = document.querySelector('#modal');
const body = document.body;

function openModal() { modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false'); body.style.overflow = 'hidden'; }
function closeModal() { modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true'); body.style.overflow = ''; }

document.querySelectorAll('[data-open-modal]').forEach(button => button.addEventListener('click', openModal));
document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', closeModal));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

document.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  const original = button.innerHTML;
  button.innerHTML = 'Заявка отправлена ✓';
  button.disabled = true;
  form.reset();
  setTimeout(() => { button.innerHTML = original; button.disabled = false; if (form.id === 'modal-form') closeModal(); }, 2500);
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .13 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const header = document.querySelector('.header');
document.querySelector('.menu-toggle').addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  document.querySelector('.menu-toggle').setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => header.classList.remove('menu-open')));
