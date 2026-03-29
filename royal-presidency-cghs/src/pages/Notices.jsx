import { FileText, Download } from 'lucide-react';
import './Notices.css';

export default function Notices() {
  const notices = [
    { id: 1, title: 'Annual General Meeting 2026', date: 'Oct 14, 2026', type: 'Meeting' },
    { id: 2, title: 'Water Supply Interruption Notice', date: 'Oct 10, 2026', type: 'Maintenance' },
    { id: 3, title: 'Diwali Celebration Schedule', date: 'Oct 05, 2026', type: 'Event' },
    { id: 4, title: 'Revised Maintenance Charges', date: 'Sep 28, 2026', type: 'Finance' },
    { id: 5, title: 'Pest Control Drive in Basement', date: 'Sep 20, 2026', type: 'Maintenance' },
  ];

  return (
    <div className="notices-page">
      <div className="page-header">
        <h1>Notice Board & <span className="text-secondary">Circulars</span></h1>
        <p>Stay updated with the latest announcements and important information.</p>
      </div>

      <div className="page-container">
        <div className="notices-list">
          {notices.map(notice => (
            <div key={notice.id} className="glass-card notice-item">
              <div className="notice-icon">
                <FileText size={24} color="var(--primary)" />
              </div>
              <div className="notice-content">
                <span className={`notice-type type-${notice.type.toLowerCase()}`}>{notice.type}</span>
                <h3>{notice.title}</h3>
                <span className="notice-date">Published on: {notice.date}</span>
              </div>
              <button className="btn-secondary download-btn">
                <Download size={18} />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
