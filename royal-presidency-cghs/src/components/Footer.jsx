import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo">
            <Building2 size={32} color="var(--secondary)" />
            <h2>Royal Presidency</h2>
          </div>
          <p className="footer-desc">
            A premium cooperative group housing society dedicated to providing an elite, secure, and harmonious living environment.
          </p>
        </div>
        
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/notices">Notice Board</Link></li>
            <li><Link to="/amenities">Amenities</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li><MapPin size={18} /> <span>Plot GH-5, Block C, Sector 45, Gurugram, HR 122003</span></li>
            <li><Phone size={18} /> <span>+91 98765 43210</span></li>
            <li><Mail size={18} /> <span>contact@royalpresidency.com</span></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Royal Presidency CGHS. All rights reserved.</p>
      </div>
    </footer>
  );
}
