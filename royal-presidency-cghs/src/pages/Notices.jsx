import { useState, useEffect } from 'react';
import { FileText, Download, Paperclip } from 'lucide-react';
import { apiFetch } from '../utils/api';
import './Notices.css';

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await apiFetch('/notices');
        setNotices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotices();
  }, []);

  return (
    <div className="notices-page">
      <div className="page-header">
        <h1>Notice Board & <span className="text-secondary">Circulars</span></h1>
        <p>Stay updated with the latest announcements and important information.</p>
      </div>

      <div className="page-container">
        <div className="notices-list">
          {isLoading ? (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '3rem', width: '100%' }}>Loading Notice Board...</div>
          ) : notices.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#64748b', padding: '3rem', border: '2px dashed #cbd5e1', borderRadius: '12px', width: '100%' }}>
              No active circulars or notices at this time.
            </div>
          ) : (
            notices.map((notice, index) => (
              <div key={notice._id || index} className="glass-card notice-item" style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s both` }}>
                <div className="notice-icon">
                  <FileText size={24} color="var(--primary)" />
                </div>
                <div className="notice-content">
                  <span className="notice-type type-notice">Official Circular</span>
                  <h3>{notice.title}</h3>
                  <p style={{ marginTop: '0.5rem', marginBottom: '0.5rem', color: '#475569', fontSize: '0.95rem', lineHeight: '1.5' }}>{notice.content}</p>
                  <span className="notice-date" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Published on: {new Date(notice.date).toLocaleDateString()}</span>
                </div>
                {notice.attachmentUrl && (
                  <a href={notice.attachmentUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary download-btn" title={notice.attachmentName} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Download size={18} />
                    <span>Download</span>
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
