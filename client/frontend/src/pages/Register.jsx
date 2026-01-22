import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const { showSuccess, showError } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Client-side validation checks
        const hasCapital = /^[A-Z]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasLength = password.length >= 6;

        if (!hasCapital || !hasSpecial || !hasLength) {
            setError('Please verify all password requirements.');
            return;
        }

        const result = await register(username, email, password);
        if (result.success) {
            showSuccess('Registration successful! Please login to continue.');
            navigate('/login');
        } else {
            showError(result.message);
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className='text-[25px] font-semibold'>Sign Up</div>
                    <p className='text-[15px] !text-gray-500'>Create an account to start shopping</p>
                </div>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {/* Password Requirements Checklist */}
                        <div className="!mt-3 space-y-2 text-sm">
                            <div className={`flex items-center gap-2 ${/^[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                                {/^[A-Z]/.test(password) ? <Check size={16} /> : <X size={16} />}
                                <span>Starts with a capital letter</span>
                            </div>
                            <div className={`flex items-center gap-2 ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                                {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? <Check size={16} /> : <X size={16} />}
                                <span>Contains a special character (!@#$...)</span>
                            </div>
                            <div className={`flex items-center gap-2 ${password.length >= 6 ? 'text-green-600' : 'text-gray-500'}`}>
                                {password.length >= 6 ? <Check size={16} /> : <X size={16} />}
                                <span>At least 6 characters long</span>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="auth-btn">Register</button>
                </form>
                <div className="auth-footer">
                    <Link to="/login">Already have an account? Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
