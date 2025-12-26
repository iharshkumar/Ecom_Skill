import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const { showSuccess, showError } = useToast();
    const navigate = useNavigate();

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [selectedLanguage, setSelectedLanguage] = useState(
        localStorage.getItem('language') || 'English'
    );

    // Redirect if not logged in
    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showError('New passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            showError('Password must be at least 6 characters');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://ecom-skill-2.onrender.com'}/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                showSuccess('Password changed successfully!');
                setShowPasswordForm(false);
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                showError(data.message || 'Failed to change password');
            }
        } catch (error) {
            showError('Error changing password. Please try again.');
        }
    };

    const handleLanguageChange = (lang) => {
        setSelectedLanguage(lang);
        localStorage.setItem('language', lang);
        showSuccess(`Language changed to ${lang}`);
    };

    const handleLogout = () => {
        logout();
        showSuccess('Logged out successfully!');
        navigate('/');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="profile-info">
                        <h3>Hello,</h3>
                        <h2>{user.username}</h2>
                    </div>
                </div>

                <div className="profile-menu">
                    <div className="menu-section">
                        <h4>MY ACCOUNT</h4>
                        <button className="menu-item active">
                            <span className="menu-icon">👤</span>
                            Profile Information
                        </button>
                        <button
                            className="menu-item"
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                        >
                            <span className="menu-icon">🔒</span>
                            Change Password
                        </button>
                    </div>

                    <div className="menu-section">
                        <h4>MY STUFF</h4>
                        <Link to="/cart" className="menu-item">
                            <span className="menu-icon">🛒</span>
                            My Cart
                        </Link>
                        <Link to="/orders" className="menu-item">
                            <span className="menu-icon">📦</span>
                            My Orders
                        </Link>
                        <Link to="/wishlist" className="menu-item">
                            <span className="menu-icon">❤️</span>
                            My Wishlist
                        </Link>
                    </div>

                    <div className="menu-section">
                        <button className="menu-item logout-btn" onClick={handleLogout}>
                            <span className="menu-icon">🚪</span>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="profile-content">
                {!showPasswordForm ? (
                    <div className="profile-details">
                        <h2>Personal Information</h2>
                        <div className="info-card">
                            <div className="info-row">
                                <label>Username</label>
                                <p>{user.username}</p>
                            </div>
                            <div className="info-row">
                                <label>Email</label>
                                <p>{user.email || 'Not available'}</p>
                            </div>
                        </div>

                        <h2>Settings</h2>
                        <div className="settings-card">
                            <div className="setting-item">
                                <div className="setting-header">
                                    <span className="setting-icon">🌐</span>
                                    <div>
                                        <h3>Language</h3>
                                        <p>Choose your preferred language</p>
                                    </div>
                                </div>
                                <div className="language-options">
                                    {['English', 'Hindi', 'Spanish', 'French'].map(lang => (
                                        <button
                                            key={lang}
                                            className={`language-btn ${selectedLanguage === lang ? 'active' : ''}`}
                                            onClick={() => handleLanguageChange(lang)}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="setting-item">
                                <div className="setting-header">
                                    <span className="setting-icon">🔔</span>
                                    <div>
                                        <h3>Notifications</h3>
                                        <p>Manage your notification preferences</p>
                                    </div>
                                </div>
                                <div className="notification-toggles">
                                    <label className="toggle-item">
                                        <input type="checkbox" defaultChecked />
                                        <span>Order updates</span>
                                    </label>
                                    <label className="toggle-item">
                                        <input type="checkbox" defaultChecked />
                                        <span>Promotional emails</span>
                                    </label>
                                    <label className="toggle-item">
                                        <input type="checkbox" />
                                        <span>SMS notifications</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="password-change-form">
                        <h2>Change Password</h2>
                        <form onSubmit={handlePasswordChange}>
                            <div className="form-group">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({
                                        ...passwordData,
                                        currentPassword: e.target.value
                                    })}
                                    required
                                    placeholder="Enter current password"
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({
                                        ...passwordData,
                                        newPassword: e.target.value
                                    })}
                                    required
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({
                                        ...passwordData,
                                        confirmPassword: e.target.value
                                    })}
                                    required
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-primary">
                                    Update Password
                                </button>
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => setShowPasswordForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
