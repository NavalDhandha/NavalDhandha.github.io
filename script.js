const root = document.documentElement;
const themeButton = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const storedTheme = localStorage.getItem('naval-theme');
// Light is the default for new visitors; keep previously saved preferences.
root.dataset.theme = storedTheme === 'dark' ? 'dark' : 'light';
function updateThemeIcon() { themeIcon.textContent = root.dataset.theme === 'light' ? '☾' : '☀'; }
updateThemeIcon();
themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('naval-theme', root.dataset.theme);
  updateThemeIcon();
});
const menuButton = document.getElementById('menuToggle');
const nav = document.getElementById('navlinks');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
filters.forEach(button => button.addEventListener('click', () => {
  const selection = button.dataset.filter;
  filters.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  cards.forEach(card => { card.hidden = selection !== 'all' && !card.dataset.category.split(' ').includes(selection); });
}));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } });
}, { threshold: .08 });
document.querySelectorAll('.section, .project-card, .experience, .skill-block').forEach(el => { el.classList.add('reveal'); observer.observe(el); });
