import { useState, useEffect, useMemo } from 'react';
import { Users, Bell, AlertTriangle, Trash2, CheckCircle, Search, LayoutDashboard, Clock, CheckCircle2, UserPlus, Inbox } from 'lucide-react';
import { apiFetch } from '../utils/api';
import './MemberPortal.css'; 

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [notices, setNotices] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });
  
  // Search and Filter States
  const [userSearch, setUserSearch] = useState('');
  const [complaintFilter, setComplaintFilter] = useState('all');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [fetchedUsers, fetchedNotices, fetchedComplaints] = await Promise.all([
        apiFetch('/users').catch(() => []),
        apiFetch('/notices').catch(() => []),
        apiFetch('/complaints').catch(() => [])
      ]);
      setUsers(fetchedUsers);
      setNotices(fetchedNotices);
      setComplaints(fetchedComplaints);
    } catch (err) {
      console.error("Failed to load dashboard data.", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if(!window.confirm('Are you sure you want to remove this resident?')) return;
    try {
      await apiFetch(`/users/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) { alert(err.message); }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await apiFetch(`/users/${id}/role`, { method: 'PUT', body: JSON.stringify({ role: newRole }) });
      fetchAllData();
    } catch (err) { alert(err.message); }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/notices', { method: 'POST', body: JSON.stringify(newNotice) });
      setNewNotice({ title: '', content: '' });
      fetchAllData();
    } catch (err) { alert(err.message); }
  };

  const handleDeleteNotice = async (id) => {
    if(!window.confirm('Delete this broadcast?')) return;
    try {
      await apiFetch(`/notices/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) { alert(err.message); }
  };

  const handleResolveComplaint = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'resolved' ? 'pending' : 'resolved';
      await apiFetch(`/complaints/${id}/status`, { method: 'PUT', body: JSON.stringify({ status: newStatus }) });
      fetchAllData();
    } catch (err) { alert(err.message); }
  };

  // Derived Values for Analytics
  const pendingComplaints = useMemo(() => complaints.filter(c => c.status !== 'resolved').length, [complaints]);
  const resolvedComplaints = useMemo(() => complaints.filter(c => c.status === 'resolved').length, [complaints]);

  // Derived Value for Member Search
  const filteredUsers = useMemo(() => {
    if (!userSearch) return users;
    const lowerSearch = userSearch.toLowerCase();
    return users.filter(u => 
      u.name?.toLowerCase().includes(lowerSearch) || 
      u.email?.toLowerCase().includes(lowerSearch) || 
      u.flatNumber?.toLowerCase().includes(lowerSearch)
    );
  }, [users, userSearch]);

  // Derived Value for Complaint Filter
  const filteredComplaints = useMemo(() => {
    if (complaintFilter === 'all') return complaints;
    if (complaintFilter === 'pending') return complaints.filter(c => c.status !== 'resolved');
    if (complaintFilter === 'resolved') return complaints.filter(c => c.status === 'resolved');
    return complaints;
  }, [complaints, complaintFilter]);

  if (isLoading) {
    return (
      <div className="dashboard-page" style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center', color: '#6366f1' }}>
          <div className="custom-loader" style={{ width: '40px', height: '40px', border: '4px solid #e0e7ff', borderTop: '4px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <h2>Loading Administrator Data...</h2>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-page" style={{ padding: '2rem' }}>
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <LayoutDashboard size={28} color="#6366f1" /> Admin Control Center
        </h1>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <button className={`btn-${activeTab === 'overview' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('overview')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><LayoutDashboard size={18} /> Overview</button>
          <button className={`btn-${activeTab === 'members' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('members')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Users size={18} /> Directory</button>
          <button className={`btn-${activeTab === 'notices' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('notices')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Bell size={18} /> Broadcasts</button>
          <button className={`btn-${activeTab === 'complaints' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('complaints')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={18} /> Tickets</button>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '2rem', minHeight: '60vh' }}>
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="fade-in">
            <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Society Analytics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              
              {/* Stat Card 1 */}
              <div style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%)', padding: '1.5rem', borderRadius: '12px', border: '1px solid #c7d2fe', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#4f46e5', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Residents</p>
                  <h3 style={{ margin: 0, fontSize: '2.5rem', color: '#312e81' }}>{users.length}</h3>
                </div>
                <Users size={32} color="#4f46e5" opacity={0.8} />
              </div>

              {/* Stat Card 2 */}
              <div style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #ffedd5 100%)', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fecaca', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#b91c1c', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Action Required</p>
                  <h3 style={{ margin: 0, fontSize: '2.5rem', color: '#7f1d1d' }}>{pendingComplaints}</h3>
                </div>
                <AlertTriangle size={32} color="#b91c1c" opacity={0.8} />
              </div>

              {/* Stat Card 3 */}
              <div style={{ background: 'linear-gradient(135deg, #dcfce7 0%, #ecfdf5 100%)', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#15803d', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Resolved Tickets</p>
                  <h3 style={{ margin: 0, fontSize: '2.5rem', color: '#14532d' }}>{resolvedComplaints}</h3>
                </div>
                <CheckCircle2 size={32} color="#15803d" opacity={0.8} />
              </div>

              {/* Stat Card 4 */}
              <div style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#7e22ce', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Active Broadcasts</p>
                  <h3 style={{ margin: 0, fontSize: '2.5rem', color: '#581c87' }}>{notices.length}</h3>
                </div>
                <Bell size={32} color="#7e22ce" opacity={0.8} />
              </div>

            </div>
          </div>
        )}

        {/* MEMBERS TAB */}
        {activeTab === 'members' && (
          <div className="fade-in" style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ margin: 0 }}>Society Directory</h2>
              <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
                <Search size={18} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Search by name, flat, or email..." 
                  value={userSearch} 
                  onChange={(e) => setUserSearch(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                />
              </div>
            </div>

            {filteredUsers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b', border: '2px dashed #cbd5e1', borderRadius: '12px' }}>
                <UserPlus size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                <h3>No residents found</h3>
                <p>No user matches your current search criteria.</p>
              </div>
            ) : (
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '600px', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <thead style={{ backgroundColor: '#f8fafc' }}>
                  <tr>
                    <th style={{ padding: '1.25rem 1rem', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>Resident</th>
                    <th style={{ padding: '1.25rem 1rem', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>Flat No.</th>
                    <th style={{ padding: '1.25rem 1rem', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>Permission Level</th>
                    <th style={{ padding: '1.25rem 1rem', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u._id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '500', color: '#0f172a' }}>{u.name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{u.email}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ backgroundColor: '#e2e8f0', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
                          {u.flatNumber}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <select 
                          value={u.role} 
                          onChange={(e) => handleRoleChange(u._id, e.target.value)} 
                          style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: u.role === 'admin' ? '#f8fafc' : 'white', fontWeight: u.role === 'admin' ? 'bold' : 'normal' }}
                        >
                          <option value="resident">Resident</option>
                          <option value="admin">Administrator</option>
                        </select>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {u.role !== 'admin' && (
                          <button onClick={() => handleDeleteUser(u._id)} style={{ color: '#ef4444', background: '#fef2f2', border: '1px solid #fecaca', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }} title="Remove Resident">
                            <Trash2 size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* NOTICES TAB */}
        {activeTab === 'notices' && (
          <div className="fade-in">
            <h2>Live Broadcasts</h2>
            <form onSubmit={handleCreateNotice} style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ flex: '1', minWidth: '200px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#64748b', marginBottom: '0.5rem' }}>Announcement Title</label>
                <input type="text" placeholder="e.g. Pool Maintenance Schedule" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} required style={{ padding: '0.75rem', width: '100%', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ flex: '2', minWidth: '300px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#64748b', marginBottom: '0.5rem' }}>Detailed Message</label>
                <input type="text" placeholder="e.g. The main pool will be closed on Friday from 8AM to 12PM..." value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} required style={{ padding: '0.75rem', width: '100%', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', minWidth: '150px' }}>
                <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.5rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  <Bell size={18} /> Publish
                </button>
              </div>
            </form>
            
            {notices.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b', border: '2px dashed #cbd5e1', borderRadius: '12px' }}>
                <Bell size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                <h3>No Active Broadcasts</h3>
                <p>There are currently no announcements visible to residents.</p>
              </div>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {notices.map(n => (
                  <li key={n._id} style={{ padding: '1.5rem', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ margin: '0 0 0.75rem 0', color: '#0f172a', fontSize: '1.1rem' }}>{n.title}</h3>
                        <button onClick={() => handleDeleteNotice(n._id)} style={{ color: '#ef4444', background: '#fef2f2', border: 'none', cursor: 'pointer', padding: '0.4rem', borderRadius: '6px' }} title="Delete Broadcast"><Trash2 size={16} /></button>
                      </div>
                      <p style={{ margin: '0', color: '#475569', lineHeight: '1.5', fontSize: '0.95rem' }}>{n.content}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.8rem', marginTop: '1.5rem', fontWeight: '500' }}>
                      <Clock size={14} /> Posted {new Date(n.date).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* COMPLAINTS TAB */}
        {activeTab === 'complaints' && (
          <div className="fade-in" style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
               <h2 style={{ margin: 0 }}>Support Tickets</h2>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.3rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                 <button onClick={() => setComplaintFilter('all')} style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer', background: complaintFilter === 'all' ? 'white' : 'transparent', fontWeight: complaintFilter === 'all' ? 'bold' : 'normal', color: complaintFilter === 'all' ? '#0f172a' : '#64748b', boxShadow: complaintFilter === 'all' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}>All</button>
                 <button onClick={() => setComplaintFilter('pending')} style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer', background: complaintFilter === 'pending' ? 'white' : 'transparent', fontWeight: complaintFilter === 'pending' ? 'bold' : 'normal', color: complaintFilter === 'pending' ? '#b91c1c' : '#64748b', boxShadow: complaintFilter === 'pending' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}>Pending</button>
                 <button onClick={() => setComplaintFilter('resolved')} style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer', background: complaintFilter === 'resolved' ? 'white' : 'transparent', fontWeight: complaintFilter === 'resolved' ? 'bold' : 'normal', color: complaintFilter === 'resolved' ? '#15803d' : '#64748b', boxShadow: complaintFilter === 'resolved' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}>Resolved</button>
               </div>
            </div>

            {filteredComplaints.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b', border: '2px dashed #cbd5e1', borderRadius: '12px' }}>
                <Inbox size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                <h3>No Tickets Found</h3>
                <p>There are no {complaintFilter !== 'all' ? complaintFilter : ''} complaints in the system right now.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(1, 1fr)' }}>
                {filteredComplaints.map(c => (
                  <div key={c._id} style={{ border: '1px solid #e2e8f0', backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                    
                    <div style={{ flex: '1', minWidth: '300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <span style={{ backgroundColor: c.status === 'resolved' ? '#dcfce7' : '#fef2f2', color: c.status === 'resolved' ? '#166534' : '#991b1b', padding: '0.3rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', border: `1px solid ${c.status === 'resolved' ? '#bbf7d0' : '#fecaca'}` }}>
                          {c.status}
                        </span>
                        <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>{c.title}</h3>
                      </div>
                      <p style={{ margin: '0 0 1rem 0', color: '#475569', lineHeight: '1.6', fontSize: '0.95rem' }}>{c.description}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={14} /> Reported by Flat: <strong>{c.user?.flatNumber || 'Unknown'}</strong></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {new Date(c.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {c.status === 'pending' ? (
                        <button onClick={() => handleResolveComplaint(c._id, 'pending')} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', transition: 'background 0.2s', boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)' }}>
                          <CheckCircle size={18} /> Mark Resolved
                        </button>
                      ) : (
                        <button onClick={() => handleResolveComplaint(c._id, 'resolved')} style={{ backgroundColor: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', transition: 'all 0.2s' }}>
                          <AlertTriangle size={18} /> Re-open Ticket
                        </button>
                      )}
                    </div>
                    
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
