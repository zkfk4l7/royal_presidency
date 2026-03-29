import { Link, useLocation } from 'react-router-dom';
import { Home, Info, Bell, Building2, Phone, UserCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Notices', path: '/notices', icon: <Bell size={18} /> },
    { name: 'Amenities', path: '/amenities', icon: <Building2 size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={18} /> },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <Building2 size={24} color="var(--primary)" className="logo-icon" />
        <span>Royal Presidency</span>
      </Link>
      
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={location.pathname === link.path ? 'active-link' : ''}
            onClick={() => setIsOpen(false)}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
        <Link to="/portal" className="btn-primary" onClick={() => setIsOpen(false)}>
          <UserCircle size={18} />
          <span>Member Login</span>
        </Link>
      </div>
      
      <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
}
