import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Multi<span className="highlight">Mian</span></h3>
          <p>Transforming PDF Solutions</p>
        </div>
        <div className="footer-links">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="#" className="social-icon"><i className="fab fa-github"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="contact-info">
              <li><i className="fas fa-envelope"></i> mhassamkb@gmail.com</li>
              <li><i className="fas fa-phone"></i> +92 319 6086194</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MultiMian. All rights reserved.</p>
        <p className="footer-signature">
          Crafted with <i className="fas fa-heart"></i> by MultiMian
        </p>
      </div>
    </footer>
  );
};

export default Footer; 