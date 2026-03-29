import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Get in <span className="text-secondary">Touch</span></h1>
        <p>We're here to help. Reach out to the society office for any queries.</p>
      </div>

      <div className="page-container">
        <div className="contact-grid">
          <div className="contact-info glass-card">
            <h2>Contact Information</h2>
            <div className="info-list">
              <div className="info-item">
                <div className="icon-wrapper"><MapPin size={20} /></div>
                <div>
                  <strong>Address</strong>
                  <p>Plot GH-5, Block C, Uday Nagar,<br/>Sector 45, Gurugram, Haryana 122003</p>
                </div>
              </div>
              <div className="info-item">
                <div className="icon-wrapper"><Phone size={20} /></div>
                <div>
                  <strong>Phone</strong>
                  <p>+91 98765 43210 (Estate Manager)<br/>+91 98765 00000 (Main Gate Security)</p>
                </div>
              </div>
              <div className="info-item">
                <div className="icon-wrapper"><Mail size={20} /></div>
                <div>
                  <strong>Email</strong>
                  <p>contact@royalpresidency.com<br/>complaints@royalpresidency.com</p>
                </div>
              </div>
              <div className="info-item">
                <div className="icon-wrapper"><Clock size={20} /></div>
                <div>
                  <strong>Office Hours</strong>
                  <p>Monday - Saturday: 9:00 AM - 6:00 PM<br/>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form glass-card">
            <h2>Send us a Message</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label>Email / Phone</label>
                <input type="text" placeholder="How can we reach you?" required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="What is this regarding?" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="Your message here..." required></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
