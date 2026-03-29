import { useState, useEffect } from 'react';
import { Users, Bell, AlertTriangle, Trash2, CheckCircle } from 'lucide-react';
import { apiFetch } from '../utils/api';
import './MemberPortal.css'; 

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('members');
  const [users, setUsers] = useState([]);
  const [notices, setNotices] = useState([]);
  const [complaints, setComplaints] = useState([]);
  
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'members') setUsers(await apiFetch('/users'));
      if (activeTab === 'notices') setNotices(await apiFetch('/notices'));
      if (activeTab === 'complaints') setComplaints(await apiFetch('/complaints'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await apiFetch(`/users/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) { alert(err.message); }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await apiFetch(`/users/${id}/role`, { method: 'PUT', body: JSON.stringify({ role: newRole }) });
      fetchData();
    } catch (err) { alert(err.message); }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/notices', { method: 'POST', body: JSON.stringify(newNotice) });
      setNewNotice({ title: '', content: '' });
      fetchData();
    } catch (err) { alert(err.message); }
  };

  const handleDeleteNotice = async (id) => {
    try {
      await apiFetch(`/notices/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) { alert(err.message); }
  };

  const handleResolveComplaint = async (id) => {
    try {
      await apiFetch(`/complaints/${id}/status`, { method: 'PUT', body: JSON.stringify({ status: 'resolved' }) });
      fetchData();
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="dashboard-page" style={{ padding: '2rem' }}>
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button className={`btn-${activeTab === 'members' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('members')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={16} /> Members</button>
          <button className={`btn-${activeTab === 'notices' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('notices')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Bell size={16} /> Notices</button>
          <button className={`btn-${activeTab === 'complaints' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('complaints')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={16} /> Complaints</button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        {activeTab === 'members' && (
          <div style={{ overflowX: 'auto' }}>
            <h2>Manage Members</h2>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead><tr style={{ borderBottom: '2px solid #ddd' }}><th style={{ padding: '1rem 0' }}>Name</th><th>Flat</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '1rem 0' }}>{u.name}</td>
                    <td>{u.flatNumber}</td>
                    <td>{u.email}</td>
                    <td>
                      <select value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)} style={{ padding: '0.25rem' }}>
                        <option value="resident">Resident</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      {u.role !== 'admin' && <button onClick={() => handleDeleteUser(u._id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'notices' && (
          <div>
            <h2>Society Notices</h2>
            <form onSubmit={handleCreateNotice} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <input type="text" placeholder="Title" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} required style={{ padding: '0.75rem', flex: '1', minWidth: '200px' }} />
              <input type="text" placeholder="Content" value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} required style={{ padding: '0.75rem', flex: '2', minWidth: '300px' }} />
              <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Post Notice</button>
            </form>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {notices.map(n => (
                <li key={n._id} style={{ padding: '1.5rem', border: '1px solid #ddd', marginBottom: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0' }}>{n.title}</h3>
                    <p style={{ margin: '0', color: '#555' }}>{n.content}</p>
                    <small style={{ color: '#888', display: 'block', marginTop: '0.5rem' }}>Posted: {new Date(n.date).toLocaleDateString()}</small>
                  </div>
                  <button onClick={() => handleDeleteNotice(n._id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}><Trash2 size={20} /></button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'complaints' && (
          <div style={{ overflowX: 'auto' }}>
            <h2>Member Complaints</h2>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead><tr style={{ borderBottom: '2px solid #ddd' }}><th style={{ padding: '1rem 0' }}>Flat</th><th>Issue</th><th>Description</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {complaints.map(c => (
                  <tr key={c._id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '1rem 0' }}>{c.user?.flatNumber || 'Unknown'}</td>
                    <td><strong>{c.title}</strong><br /><small>{new Date(c.createdAt).toLocaleDateString()}</small></td>
                    <td>{c.description}</td>
                    <td>
                       <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: c.status === 'resolved' ? '#dcfce7' : '#fef08a', color: c.status === 'resolved' ? 'green' : '#854d0e', fontWeight: 'bold', fontSize: '0.85rem' }}>{c.status.toUpperCase()}</span>
                    </td>
                    <td>
                      {c.status !== 'resolved' && (
                        <button onClick={() => handleResolveComplaint(c._id)} style={{ color: 'green', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={16} /> Resolve</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
