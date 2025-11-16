import React, { useEffect, useState } from 'react';
import './index.css';

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');

    // If saved theme exists → use it
    if (saved) return saved;

    // Otherwise follow system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button type="button" className="themetoggle-btn" onClick={toggle}>
      {theme === 'dark' ? (
        <span className="themetoggle-icon">🌞</span>
      ) : (
        <span className="themetoggle-icon">🌙</span>
      )}
    </button>
  );
}

export default ThemeToggle;
