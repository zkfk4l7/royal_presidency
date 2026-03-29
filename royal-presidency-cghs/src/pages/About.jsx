import { useState, useEffect } from 'react';
import { apiFetch } from '../utils/api';
import './About.css';

export default function About() {
  const [committee, setCommittee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const data = await apiFetch('/committee');
        setCommittee(data);
      } catch (err) {
        console.error("Failed to load committee", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCommittee();
  }, []);

  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About <span className="text-secondary">Us</span></h1>
        <p>Learn more about our vibrant community and the people who make it great.</p>
      </div>

      <div className="page-container">
        <section className="about-history glass-card">
          <h2>Our History & Vision</h2>
          <p>
            Established in 2010, Royal Presidency CGHS was built with a singular vision: to create a 
            harmonious, secure, and premium living environment for its residents. Over the years, we 
            have grown into a close-knit family of over 500 households, celebrating diverse cultures and 
            fostering strong community bonds.
          </p>
          <p>
            Our society prides itself on maintaining high standards of cleanliness, robust security protocols, 
            and offering state-of-the-art amenities that cater to all age groups.
          </p>
        </section>

        <section className="about-committee">
          <h2 className="section-title">Managing Committee</h2>
          {isLoading ? (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>Loading managing committee roster...</div>
          ) : committee.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem', border: '2px dashed #cbd5e1', borderRadius: '12px' }}>
              Committee roster is currently being updated.
            </div>
          ) : (
            <div className="committee-grid">
              {committee.map((member, index) => (
                <div key={member._id || index} className="glass-card committee-card" style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s both` }}>
                  <div className="avatar">{member.name.charAt(0)}</div>
                  <h3>{member.name}</h3>
                  <span className="role">{member.role}</span>
                  <span className="phone">{member.phone}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
