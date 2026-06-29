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
    
    // Global mouse tracker for instant cursor hydration
    window.__mousePos = { x: -100, y: -100 }; // Start off-screen but initialized
    var trackMouse = function(e) {
      window.__mousePos.x = e.clientX;
      window.__mousePos.y = e.clientY;
    };
    window.addEventListener('mousemove', trackMouse, { passive: true });
    window.addEventListener('mousedown', trackMouse, { passive: true });
  } catch { }
})()
