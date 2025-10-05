import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaCheckCircle } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import './Header.css';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          <span className="header-icon">
            <FaCheckCircle />
          </span>
          To-do List
        </h1>
        <button onClick={toggleTheme} className="theme-toggle" title="Toggle Theme">
          {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
        </button>
      </div>
    </header>
  );
};

export default Header;