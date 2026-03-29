import { useState, useEffect } from 'react';
import { User, Lock, CreditCard, AlertCircle, CheckCircle, Mail, Home } from 'lucide-react';
import './MemberPortal.css';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../utils/api';

export default function MemberPortal() {
  const { user, login, logout } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', flatNumber: '' });
  const [error, setError] = useState(null);
  
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (user) {
      fetchComplaints();
    }
  }, [user]);

  const fetchComplaints = async () => {
    try {
      const data = await apiFetch('/complaints');
      setComplaints(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLoginTab) {
        const data = await apiFetch('/users/login', {
          method: 'POST',
          body: JSON.stringify({ email: formData.email, password: formData.password })
        });
        login(data);
      } else {
        const data = await apiFetch('/users', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
        login(data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    const title = e.target.category.value;
    const description = e.target.description.value;
    try {
      await apiFetch('/complaints', {
        method: 'POST',
        body: JSON.stringify({ title, description })
      });
      alert('Ticket raised successfully');
      e.target.reset();
      fetchComplaints();
    } catch (err) {
      alert('Error creating ticket: ' + err.message);
    }
  };

  // Login View
  if (!user) {
    return (
      <div className="portal-login-page">
        <div className="login-box glass-card" style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
          <div className="login-header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <User size={48} color="var(--primary)" style={{ margin: '0 auto' }} />
            <h2>{isLoginTab ? 'Member Login' : 'Register Member'}</h2>
            <p>{isLoginTab ? 'Access your society dashboard' : 'Create an account for your flat'}</p>
          </div>
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
          <form onSubmit={handleAuthSubmit}>
            {!isLoginTab && (
              <>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Full Name</label>
                  <div className="input-with-icon" style={{ position: 'relative' }}>
                    <User size={18} className="input-icon" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                    <input type="text" placeholder="e.g. Rahul Sharma" required style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2rem' }} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label>Flat Number</label>
                  <div className="input-with-icon" style={{ position: 'relative' }}>
                    <Home size={18} className="input-icon" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                    <input type="text" placeholder="e.g. A-101" required style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2rem' }} value={formData.flatNumber} onChange={e => setFormData({...formData, flatNumber: e.target.value})} />
                  </div>
                </div>
              </>
            )}
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Email Address</label>
              <div className="input-with-icon" style={{ position: 'relative' }}>
                <Mail size={18} className="input-icon" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                <input type="email" placeholder="email@example.com" required style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2rem' }} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Password</label>
              <div className="input-with-icon" style={{ position: 'relative' }}>
                <Lock size={18} className="input-icon" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                <input type="password" placeholder="••••••••" required style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2rem' }} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem', border: 'none', background: 'var(--primary)', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
              {isLoginTab ? 'Sign In' : 'Register'}
            </button>
            <div className="login-footer" style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button type="button" onClick={() => setIsLoginTab(!isLoginTab)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}>
                {isLoginTab ? 'Need an account? Register' : 'Already have an account? Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="dashboard-page" style={{ padding: '2rem' }}>
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <div className="welcome-banner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--primary-light, #e0f2fe)', padding: '2rem', borderRadius: '8px' }}>
          <div>
            <h1 style={{ margin: 0, color: 'var(--text)' }}>Welcome back, <span className="text-secondary">{user.name}</span> ({user.flatNumber})</h1>
            <p style={{ margin: 0, marginTop: '0.5rem', color: 'var(--text-light)' }}>Here is your account overview.</p>
          </div>
          <button className="btn-secondary" onClick={logout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Tickets Widget */}
        <div className="glass-card widget tickets-widget" style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <div className="widget-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Your Recent Tickets</h3>
            <AlertCircle size={20} color="var(--warning, orange)" />
          </div>
          {complaints.length === 0 ? <p>No tickets raised yet.</p> : (
            <ul className="ticket-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {complaints.map(complaint => (
                <li key={complaint._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #eee' }}>
                  <div className="ticket-info">
                    <strong style={{ display: 'block' }}>{complaint.title}</strong>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#444' }}>{complaint.description}</p>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>Raised: {new Date(complaint.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className={`status ${complaint.status}`} style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: complaint.status === 'resolved' ? '#dcfce7' : '#fee2e2', color: complaint.status === 'resolved' ? 'green' : 'red', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    {complaint.status.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Raise Complaint Widget */}
        <div className="glass-card widget complaint-widget" style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <div className="widget-header" style={{ marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Raise Helpdesk Ticket</h3>
          </div>
          <form className="complaint-form" onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <select name="category" required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="">Select Category</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Security / Parking">Security / Parking</option>
              <option value="Other">Other</option>
            </select>
            <textarea name="description" placeholder="Describe your issue..." rows="3" required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
            <button type="submit" className="btn-secondary" style={{ padding: '0.75rem', background: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit Ticket</button>
          </form>
        </div>
      </div>
    </div>
  );
}
