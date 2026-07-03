(function() {
  try {
    var theme = localStorage.getItem('theme') || 'dark';
    var root = document.documentElement;
    if (theme === 'system') {
      var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(dark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
    }
  } catch { }
})()
