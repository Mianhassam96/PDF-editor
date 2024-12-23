import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-text">Multi<span className="highlight">Mian</span></span>
          <span className="tagline">PDF Solutions</span>
        </div>
        <nav className="header-nav">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header; 