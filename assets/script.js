(function () {
  const STORAGE_KEY = 'pp_theme';
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const icon = btn.querySelector('.icon');
  const label = btn.querySelector('.label');
  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    let saved = null;

    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      saved = null;
    }

    if (saved === 'dark' || saved === 'light') return saved;
    return mq.matches ? 'dark' : 'light';
  }

  function apply(theme) {
    const isDark = theme === 'dark';

    root.setAttribute('data-theme', theme);
    btn.setAttribute('aria-pressed', String(isDark));

    icon.textContent = isDark ? '🌞' : '🌙';
    label.textContent = isDark ? 'Modo claro' : 'Modo escuro';
    btn.title = isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro';
  }

  function save(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {
      // Ignora em ambientes bloqueados (modo privado, políticas, etc.)
    }
  }

  apply(currentTheme());

  btn.addEventListener('click', function () {
    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(newTheme);
    save(newTheme);
  });

  mq.addEventListener('change', function (event) {
    let saved = null;

    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      saved = null;
    }

    if (saved !== 'dark' && saved !== 'light') {
      apply(event.matches ? 'dark' : 'light');
    }
  });
})();
