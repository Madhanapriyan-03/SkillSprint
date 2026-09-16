import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../store/slices/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="login-page">
      <div className="login-layout">
        {/* ================= LEFT BRAND PANEL ================= */}
        <div className="login-brand-panel">
          <div>
            <div className="brand-icon">
              S
            </div>
            <h1>SkillSprint</h1>
            <p className="brand-tagline">
              Accelerate your engineering journey.<br />
              Master in-demand skills.<br />
              Build real-world proof of competence.
            </p>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.3)', color: '#60a5fa', fontWeight: 'bold' }}>✓</span>
                Structured Learning Roadmaps
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.3)', color: '#60a5fa', fontWeight: 'bold' }}>✓</span>
                Hands-on Milestone Submissions
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.3)', color: '#60a5fa', fontWeight: 'bold' }}>✓</span>
                Expert Mentor Evaluations & Feedback
              </div>
            </div>
          </div>

          <div className="brand-quote">
            <span className="quote-mark">“</span>
            Progress is a series of small wins. Master one skill at a time.
          </div>
        </div>

        {/* ================= RIGHT FORM PANEL ================= */}
        <div className="login-form-panel">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your SkillSprint learning workspace</p>
          </div>

          {isError && message && (
            <div className="login-error">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {/* Email */}
            <div className="login-field">
              <label htmlFor="email">Work / Academic Email</label>
              <div className="login-input-wrapper">
                <span className="input-icon">✉</span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrapper">
                <span className="input-icon lock-icon">🔒</span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="login-submit"
              disabled={isLoading}
            >
              <span>{isLoading ? 'Signing in...' : 'Login'}</span>
              {!isLoading && <span style={{ marginLeft: '4px' }}>→</span>}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          {/* Register Link */}
          <div className="login-register">
            <span>Don't have an account?</span>
            <button
              type="button"
              onClick={() => navigate('/register')}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;