import { ArrowRight, ShieldCheck, Activity, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="badge">Welcome to Premium Living</span>
          <h1>Experience Elite<br />Community Living at<br /><span className="text-secondary">Royal Presidency</span></h1>
          <p className="hero-desc">
            A harmonious blend of luxury, security, and vibrant community life in the heart of the city.
          </p>
          <div className="hero-actions">
            <Link to="/about" className="btn-primary">
              Discover More <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <div className="hero-image-placeholder glass-card">
            {/* Using a modern CSS shape/gradient as placeholder instead of an actual image */}
            <div className="abstract-shape"></div>
            <div className="float-card card-1">
              <ShieldCheck size={24} color="var(--success)" />
              <div>
                <strong>24/7</strong>
                <span>Security</span>
              </div>
            </div>
            <div className="float-card card-2">
              <Activity size={24} color="var(--primary)" />
              <div>
                <strong>Premium</strong>
                <span>Amenities</span>
              </div>
            </div>
            <div className="float-card card-3">
              <Users size={24} color="var(--secondary)" />
              <div>
                <strong>500+</strong>
                <span>Families</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Updates Section */}
      <section className="quick-updates">
        <div className="page-container">
          <div className="updates-header">
            <h2>Recent Circulars</h2>
            <Link to="/notices" className="link-arrow">View All <ArrowRight size={16}/></Link>
          </div>
          <div className="updates-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card update-card">
                <span className="date">Oct {15 - i}, 2026</span>
                <h3>Annual General Meeting {2026}</h3>
                <p>The AGM is scheduled for the upcoming weekend. All members are requested to attend.</p>
                <Link to="/notices" className="read-more">Read Notice</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
