const htmlEl      = document.documentElement;
const themeToggle = document.getElementById('themeToggleBtn');
const themePanel  = document.getElementById('themePanel');
const themeOpts   = document.querySelectorAll('.t-opt');

const savedTheme = localStorage.getItem('dd-theme') || 'rose';
applyTheme(savedTheme);

themeToggle.addEventListener('click', e => { e.stopPropagation(); themePanel.classList.toggle('open'); });
document.addEventListener('click', () => themePanel.classList.remove('open'));
themePanel.addEventListener('click', e => e.stopPropagation());

themeOpts.forEach(btn => {
  btn.addEventListener('click', () => {
    applyTheme(btn.dataset.theme);
    themePanel.classList.remove('open');
  });
});

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('dd-theme', theme);
  updateBgColors(theme);
  themeOpts.forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
}
