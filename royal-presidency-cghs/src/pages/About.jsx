import './About.css';

export default function About() {
  const committee = [
    { name: 'Rajiv Sharma', role: 'President', phone: '+91 98765 11111' },
    { name: 'Anita Desai', role: 'Secretary', phone: '+91 98765 22222' },
    { name: 'Vikram Singh', role: 'Treasurer', phone: '+91 98765 33333' },
    { name: 'Meera Reddy', role: 'Executive Member', phone: '+91 98765 44444' },
  ];

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
          <div className="committee-grid">
            {committee.map((member, index) => (
              <div key={index} className="glass-card committee-card">
                <div className="avatar">{member.name.charAt(0)}</div>
                <h3>{member.name}</h3>
                <span className="role">{member.role}</span>
                <span className="phone">{member.phone}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
