import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AfterNavbar from '../components/AfterLoginNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCalendar, faChevronDown, faChevronUp, faBars, faTrophy, faShoppingCart, faQuestionCircle, faCreditCard, faHeart, faBell, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

const API_BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});

const Settings = () => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Always default to 'account' since this is the Settings/Account page
  const [activeItem, setActiveItem] = useState('account');

  const [accountForm, setAccountForm] = useState({ full_name: '', email: '', time_zone: '', language: '' });
  const [accountSaving, setAccountSaving] = useState(false);
  const [accountMessage, setAccountMessage] = useState('');

  const [passwordForm, setPasswordForm] = useState({ old_password: '', new_password: '', confirm_new_password: '' });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorSaving, setTwoFactorSaving] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios.get(`${API_BASE}/settings/account/`, authHeaders())
      .then((res) => setAccountForm({
        full_name: res.data.full_name || '',
        email: res.data.email || '',
        time_zone: res.data.time_zone || '',
        language: res.data.language || '',
      }))
      .catch(() => {});

    axios.get(`${API_BASE}/settings/2fa/`, authHeaders())
      .then((res) => setTwoFactorEnabled(!!res.data.is_enabled))
      .catch(() => {});
  }, []);

  const handleSaveAccount = async () => {
    setAccountSaving(true);
    setAccountMessage('');
    try {
      await axios.patch(`${API_BASE}/settings/account/`, {
        full_name: accountForm.full_name,
        time_zone: accountForm.time_zone,
        language: accountForm.language,
      }, authHeaders());
      setAccountMessage('Saved successfully.');
    } catch (err) {
      setAccountMessage('Failed to save. Please try again.');
    } finally {
      setAccountSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    setPasswordMessage('');
    if (passwordForm.new_password !== passwordForm.confirm_new_password) {
      setPasswordMessage('New passwords do not match.');
      return;
    }
    setPasswordSaving(true);
    try {
      await axios.post(`${API_BASE}/change-password/`, passwordForm, authHeaders());
      setPasswordMessage('Password updated successfully.');
      setPasswordForm({ old_password: '', new_password: '', confirm_new_password: '' });
    } catch (err) {
      const data = err.response?.data;
      setPasswordMessage(
        (data && Object.values(data).flat().join(' ')) || 'Failed to update password.'
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleToggleTwoFactor = async () => {
    const next = !twoFactorEnabled;
    setTwoFactorSaving(true);
    try {
      await axios.patch(`${API_BASE}/settings/2fa/`, { is_enabled: next }, authHeaders());
      setTwoFactorEnabled(next);
    } catch (err) {
      // revert on failure
    } finally {
      setTwoFactorSaving(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const settingsSections = [
    { id: 'account', title: 'Account' },
    { id: 'nameVerification', title: 'Name Verification' },
    { id: 'password', title: 'Password' },
    { id: 'twoFactor', title: 'Two Factor Authentication' },
    { id: 'connectedDevices', title: 'Connected devices' },
    { id: 'organization', title: 'Organization account' },
    { id: 'deleteAccount', title: 'Delete account' },
    { id: 'learnerData', title: 'Learner Data Report' },
  ];

  const sidebarItems = [
    { id: 'account', label: 'Account', icon: faUser, path: '/settings' },
    { id: 'communication', label: 'Communication Preferences', icon: faEnvelope, path: '/communication-preferences' },
    { id: 'calendar', label: 'Calendar Sync', icon: faCalendar, path: '/calendar-sync' },
    { id: 'accomplishments', label: 'My Accomplishments', icon: faTrophy, path: '/my-accomplishments' },
    { id: 'purchases', label: 'My Purchases', icon: faShoppingCart, path: '/my-purchases' },
    { id: 'payment', label: 'Payment', icon: faCreditCard, path: '/payment' },
    { id: 'thankInstructor', label: 'Thank Instructor', icon: faHeart, path: '/thank-instructor/1' },
    { id: 'ticketRequest', label: 'Ticket Request', icon: faTicketAlt, path: '/ticket-request' },
    { id: 'help', label: 'Help Center', icon: faQuestionCircle, path: '/help-center' },
  ];

  return (
    <div style={styles.pageWrapper}>
      <AfterNavbar />
      
      <div style={{
        ...styles.mainContainer,
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        {/* Mobile Menu Button */}
        {isMobile && (
          <button 
            style={styles.mobileMenuBtn} 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
            {sidebarOpen ? 'Hide Menu' : 'Show Menu'}
          </button>
        )}

        {/* Sidebar */}
        <aside style={{
          ...styles.sidebar,
          display: isMobile ? (sidebarOpen ? 'block' : 'none') : 'block',
          width: isMobile ? '100%' : '240px',
          borderRight: isMobile ? 'none' : '1px solid #e5e7eb',
          borderBottom: isMobile ? '1px solid #e5e7eb' : 'none',
          padding: isMobile ? '16px 0' : '32px 0',
        }}>
          <h2 style={{
            ...styles.sidebarTitle,
            fontSize: isMobile ? '18px' : '20px',
            margin: isMobile ? '0 0 16px' : '0 0 24px',
          }}>Settings</h2>
          
          <nav style={styles.sidebarNav}>
            {sidebarItems.map((item) => {
              const isActive = activeItem === item.id;
              return (
              <Link
                key={item.id}
                to={item.path}
                style={{
                  ...styles.sidebarItem,
                  ...(isActive ? styles.sidebarItemActive : {}),
                  textDecoration: 'none',
                }}
                onClick={() => setActiveItem(item.id)}
              >
                <FontAwesomeIcon 
                  icon={item.icon} 
                  style={{
                    ...styles.sidebarIcon,
                    color: isActive ? '#3b82f6' : '#6b7280',
                  }}
                />
                <span style={{
                  ...styles.sidebarLabel,
                  color: isActive ? '#3b82f6' : '#374151',
                  fontWeight: isActive ? '600' : '400',
                }}>
                  {item.label}
                </span>
              </Link>
            )})}
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{
          ...styles.content,
          padding: isMobile ? '24px 16px' : '40px 60px',
          maxWidth: isMobile ? '100%' : '800px',
        }}>
          <div style={styles.settingsContainer}>
            {settingsSections.map((section) => (
              <div key={section.id} style={styles.settingsCard}>
                <div 
                  style={styles.settingsHeader}
                  onClick={() => toggleSection(section.id)}
                >
                  <span style={styles.settingsTitle}>{section.title}</span>
                  <FontAwesomeIcon 
                    icon={expandedSection === section.id ? faChevronUp : faChevronDown} 
                    style={styles.chevronIcon}
                  />
                </div>
                
                {expandedSection === section.id && (
                  <div style={styles.settingsContent}>
                    {section.id === 'account' && (
                      <div style={styles.sectionContent}>
                        <div style={styles.formRow}>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>Full Name</label>
                            <input
                              type="text"
                              placeholder="Enter your full name"
                              style={styles.input}
                              value={accountForm.full_name}
                              onChange={(e) => setAccountForm({ ...accountForm, full_name: e.target.value })}
                            />
                          </div>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input
                              type="email"
                              placeholder="Enter your email address"
                              style={styles.input}
                              value={accountForm.email}
                              disabled
                            />
                          </div>
                        </div>
                        <div style={styles.formRow}>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>Time zone</label>
                            <div style={styles.selectWrapper}>
                              <select
                                style={styles.select}
                                value={accountForm.time_zone}
                                onChange={(e) => setAccountForm({ ...accountForm, time_zone: e.target.value })}
                              >
                                <option value="">Select your time zone</option>
                                <option value="UTC-12:00">(UTC-12:00) International Date Line West</option>
                                <option value="UTC-11:00">(UTC-11:00) Coordinated Universal Time-11</option>
                                <option value="UTC-10:00">(UTC-10:00) Hawaii</option>
                                <option value="UTC-09:00">(UTC-09:00) Alaska</option>
                                <option value="UTC-08:00">(UTC-08:00) Pacific Time (US & Canada)</option>
                                <option value="UTC-07:00">(UTC-07:00) Mountain Time (US & Canada)</option>
                                <option value="UTC-06:00">(UTC-06:00) Central Time (US & Canada)</option>
                                <option value="UTC-05:00">(UTC-05:00) Eastern Time (US & Canada)</option>
                                <option value="UTC-04:00">(UTC-04:00) Atlantic Time (Canada)</option>
                                <option value="UTC+00:00">(UTC+00:00) London, Dublin, Lisbon</option>
                                <option value="UTC+01:00">(UTC+01:00) Berlin, Paris, Rome</option>
                                <option value="UTC+02:00">(UTC+02:00) Cairo, Athens, Istanbul</option>
                                <option value="UTC+03:00">(UTC+03:00) Moscow, Kuwait, Riyadh</option>
                                <option value="UTC+04:00">(UTC+04:00) Dubai, Baku</option>
                                <option value="UTC+05:00">(UTC+05:00) Karachi, Tashkent</option>
                                <option value="UTC+05:30">(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                                <option value="UTC+06:00">(UTC+06:00) Dhaka, Almaty</option>
                                <option value="UTC+07:00">(UTC+07:00) Bangkok, Hanoi, Jakarta</option>
                                <option value="UTC+08:00">(UTC+08:00) Beijing, Singapore, Hong Kong</option>
                                <option value="UTC+09:00">(UTC+09:00) Tokyo, Seoul</option>
                                <option value="UTC+10:00">(UTC+10:00) Sydney, Melbourne</option>
                                <option value="UTC+12:00">(UTC+12:00) Auckland, Fiji</option>
                              </select>
                              <FontAwesomeIcon icon={faChevronDown} style={styles.selectIcon} />
                            </div>
                          </div>
                          <div style={styles.formGroup}>
                            <label style={styles.label}>Language</label>
                            <div style={styles.selectWrapper}>
                              <select
                                style={styles.select}
                                value={accountForm.language}
                                onChange={(e) => setAccountForm({ ...accountForm, language: e.target.value })}
                              >
                                <option value="">Select your preferred language</option>
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                                <option value="it">Italian</option>
                                <option value="pt">Portuguese</option>
                                <option value="ru">Russian</option>
                                <option value="zh">Chinese</option>
                                <option value="ja">Japanese</option>
                                <option value="ko">Korean</option>
                                <option value="ar">Arabic</option>
                                <option value="hi">Hindi</option>
                              </select>
                              <FontAwesomeIcon icon={faChevronDown} style={styles.selectIcon} />
                            </div>
                          </div>
                        </div>
                        {accountMessage && <p style={{ fontSize: '13px', color: accountMessage.startsWith('Saved') ? '#16a34a' : '#dc2626' }}>{accountMessage}</p>}
                        <button style={styles.saveDetailsButton} onClick={handleSaveAccount} disabled={accountSaving}>
                          {accountSaving ? 'Saving...' : 'Save details'}
                        </button>
                      </div>
                    )}
                    
                    {section.id === 'nameVerification' && (
                      <div style={styles.sectionContent}>
                        <p style={styles.verificationText}>Your name, Adam R, is verified. This is the name that will appear on your certificates.</p>
                        <button style={styles.requestChangeButton}>Request name change</button>
                      </div>
                    )}
                    
                    {section.id === 'password' && (
                      <div style={styles.sectionContent}>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Current Password</label>
                          <input
                            type="password"
                            placeholder="Enter current password"
                            style={styles.input}
                            value={passwordForm.old_password}
                            onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })}
                          />
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>New Password</label>
                          <input
                            type="password"
                            placeholder="Enter new password"
                            style={styles.input}
                            value={passwordForm.new_password}
                            onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                          />
                        </div>
                        <div style={styles.formGroup}>
                          <label style={styles.label}>Confirm New Password</label>
                          <input
                            type="password"
                            placeholder="Confirm new password"
                            style={styles.input}
                            value={passwordForm.confirm_new_password}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirm_new_password: e.target.value })}
                          />
                        </div>
                        {passwordMessage && <p style={{ fontSize: '13px', color: passwordMessage.startsWith('Password updated') ? '#16a34a' : '#dc2626' }}>{passwordMessage}</p>}
                        <button style={styles.saveButton} onClick={handleUpdatePassword} disabled={passwordSaving}>
                          {passwordSaving ? 'Updating...' : 'Update Password'}
                        </button>
                      </div>
                    )}
                    
                    {section.id === 'twoFactor' && (
                      <div style={styles.sectionContent}>
                        <p style={styles.description}>Add an extra layer of security to your account by enabling two-factor authentication.</p>
                        <div style={styles.toggleRow}>
                          <span>Enable Two-Factor Authentication</span>
                          <label style={styles.toggle}>
                            <input
                              type="checkbox"
                              style={styles.toggleInput}
                              checked={twoFactorEnabled}
                              disabled={twoFactorSaving}
                              onChange={handleToggleTwoFactor}
                            />
                            <span style={styles.toggleSlider}></span>
                          </label>
                        </div>
                      </div>
                    )}
                    
                    {section.id === 'connectedDevices' && (
                      <div style={styles.sectionContent}>
                        <p style={styles.description}>Manage devices that are currently logged into your account.</p>
                        <div style={styles.deviceItem}>
                          <div>
                            <p style={styles.deviceName}>Windows PC - Chrome</p>
                            <p style={styles.deviceInfo}>Last active: Today at 2:30 PM</p>
                          </div>
                          <button style={styles.removeButton}>Remove</button>
                        </div>
                        <div style={styles.deviceItem}>
                          <div>
                            <p style={styles.deviceName}>iPhone - Safari</p>
                            <p style={styles.deviceInfo}>Last active: Yesterday at 10:15 AM</p>
                          </div>
                          <button style={styles.removeButton}>Remove</button>
                        </div>
                      </div>
                    )}
                    
                    {section.id === 'organization' && (
                      <div style={styles.sectionContent}>
                        <p style={styles.description}>Link your account to an organization for enterprise features.</p>
                        <button style={styles.verifyButton}>Join Organization</button>
                      </div>
                    )}
                    
                    {section.id === 'deleteAccount' && (
                      <div style={styles.sectionContent}>
                        <p style={styles.warningText}>Warning: This action is permanent and cannot be undone. All your data will be deleted.</p>
                        <button style={styles.deleteButton}>Delete My Account</button>
                      </div>
                    )}
                    
                    {section.id === 'learnerData' && (
                      <div style={styles.sectionContent}>
                        <p style={styles.description}>Download a report of all your learning data and progress.</p>
                        <button style={styles.downloadButton}>Download Report</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
  mainContainer: {
    display: 'flex',
    marginTop: '72px',
    minHeight: 'calc(100vh - 72px)',
  },
  mobileMenuBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    background: 'white',
    border: 'none',
    borderBottom: '1px solid #e5e7eb',
    width: '100%',
    fontSize: '14px',
    fontWeight: '500',
    color: '#3b82f6',
    cursor: 'pointer',
  },
  sidebar: {
    width: '240px',
    background: 'white',
    borderRight: '1px solid #e5e7eb',
    padding: '32px 0',
    flexShrink: 0,
  },
  sidebarTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 24px',
    padding: '0 24px',
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 24px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  sidebarItemActive: {
    background: '#eff6ff',
    borderLeft: '3px solid #3b82f6',
    paddingLeft: '21px',
  },
  sidebarIcon: {
    fontSize: '16px',
    width: '20px',
  },
  sidebarLabel: {
    fontSize: '14px',
  },
  content: {
    flex: 1,
    padding: '40px 60px',
    maxWidth: '800px',
  },
  settingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  settingsCard: {
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  settingsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  settingsTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#111827',
  },
  chevronIcon: {
    color: '#6b7280',
    fontSize: '14px',
  },
  settingsContent: {
    borderTop: '1px solid #e5e7eb',
    padding: '24px',
    background: '#fff',
  },
  sectionContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
  },
  input: {
    padding: '14px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#6b7280',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: '#fff',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
  },
  selectWrapper: {
    position: 'relative',
  },
  select: {
    width: '100%',
    padding: '14px 40px 14px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#6b7280',
    outline: 'none',
    appearance: 'none',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  selectIcon: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    fontSize: '12px',
    pointerEvents: 'none',
  },
  saveDetailsButton: {
    alignSelf: 'flex-start',
    padding: '12px 24px',
    background: '#fff',
    color: '#3b82f6',
    border: '1px solid #3b82f6',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '8px',
  },
  verificationText: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5',
    margin: 0,
  },
  requestChangeButton: {
    alignSelf: 'flex-start',
    padding: '12px 24px',
    background: '#fff',
    color: '#3b82f6',
    border: '1px solid #3b82f6',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  description: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5',
  },
  warningText: {
    fontSize: '14px',
    color: '#dc2626',
    lineHeight: '1.5',
  },
  saveButton: {
    alignSelf: 'flex-start',
    padding: '10px 24px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  verifyButton: {
    alignSelf: 'flex-start',
    padding: '10px 24px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  deleteButton: {
    alignSelf: 'flex-start',
    padding: '10px 24px',
    background: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  downloadButton: {
    alignSelf: 'flex-start',
    padding: '10px 24px',
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  removeButton: {
    padding: '6px 16px',
    background: 'white',
    color: '#dc2626',
    border: '1px solid #dc2626',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  toggleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
  },
  toggle: {
    position: 'relative',
    display: 'inline-block',
    width: '48px',
    height: '24px',
  },
  toggleInput: {
    opacity: 0,
    width: 0,
    height: 0,
  },
  toggleSlider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#d1d5db',
    transition: '0.3s',
    borderRadius: '24px',
  },
  deviceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    background: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
  },
  deviceName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#111827',
    margin: 0,
  },
  deviceInfo: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '4px 0 0',
  },
};

export default Settings;
