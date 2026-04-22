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
              <li><a href="https://multimian.com/">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://github.com/Mianhassam96" className="social-icon" title="GitHub"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/mianhassam96/" className="social-icon" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="https://www.facebook.com/mian.hassam.kz" className="social-icon" title="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="https://www.instagram.com/mianhassam96/" className="social-icon" title="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="contact-info">
              <li><i className="fas fa-envelope"></i> <a href="mailto:mianhassam96@gmail.com">mianhassam96@gmail.com</a></li>
              <li><i className="fas fa-phone"></i> <a href="tel:+923258831437">+92 325 8831437</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 MultiMian. All rights reserved.</p>
        <p className="footer-signature">
          Crafted with <i className="fas fa-heart"></i> by <a href="https://multimian.com/">MultiMian</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 