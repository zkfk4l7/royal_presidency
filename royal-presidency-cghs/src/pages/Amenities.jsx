import './Amenities.css';

export default function Amenities() {
  const facilities = [
    { title: 'Club House', desc: 'A multi-purpose hall for events and community gatherings.', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=400' },
    { title: 'Swimming Pool', desc: 'Temperature-controlled pool with separate kids area.', img: 'https://images.unsplash.com/photo-1576013551627-1cc001f5c88c?auto=format&fit=crop&q=80&w=400' },
    { title: 'Fitness Center', desc: 'State-of-the-art gym equipment with qualified trainers.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400' },
    { title: 'Children Play Area', desc: 'Safe and engaging outdoor play zone for kids.', img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400' },
    { title: 'Landscaped Gardens', desc: 'Lush green parks with walking tracks.', img: 'https://images.unsplash.com/photo-1588880331179-7097f48039d9?auto=format&fit=crop&q=80&w=400' },
    { title: 'Sports Courts', desc: 'Dedicated courts for Tennis and Badminton.', img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=400' }
  ];

  return (
    <div className="amenities-page">
      <div className="page-header">
        <h1>World-Class <span className="text-secondary">Amenities</span></h1>
        <p>Discover the premium facilities that make living here a true joy.</p>
      </div>

      <div className="page-container">
        <div className="amenities-grid">
          {facilities.map((fac, idx) => (
            <div key={idx} className="glass-card amenity-card">
              <div className="amenity-img" style={{ backgroundImage: `url(${fac.img})` }}></div>
              <div className="amenity-info">
                <h3>{fac.title}</h3>
                <p>{fac.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
