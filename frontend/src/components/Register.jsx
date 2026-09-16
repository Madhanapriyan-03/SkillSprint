import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../store/slices/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    if (isSuccess) {
      navigate('/login');
    }
    return () => {
      dispatch(reset());
    };
  }, [user, isSuccess, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const result = await dispatch(
      register({
        email: formData.email,
        password: formData.password,
        role: formData.role
      })
    );

    if (register.fulfilled.match(result)) {
      navigate('/login');
    }
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
            <h1>Start Your Journey</h1>
            <p className="brand-tagline">
              Join thousands of developers leveling up with SkillSprint.<br />
              Master in-demand skills on structured tracks.
            </p>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.3)', color: '#60a5fa', fontWeight: 'bold' }}>✓</span>
                Targeted technical curriculum
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.3)', color: '#60a5fa', fontWeight: 'bold' }}>✓</span>
                Real portfolio milestones
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.3)', color: '#60a5fa', fontWeight: 'bold' }}>✓</span>
                Verified mentor evaluations
              </div>
            </div>
          </div>

          <div className="brand-quote">
            <span className="quote-mark">“</span>
            Small steps today, big career breakthroughs tomorrow.
          </div>
        </div>

        {/* ================= RIGHT FORM PANEL ================= */}
        <div className="login-form-panel">
          <div className="login-header">
            <h2>Create Account</h2>
            <p>Join SkillSprint and accelerate your skill growth</p>
          </div>

          {isError && message && (
            <div className="login-error">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {/* EMAIL */}
            <div className="login-field">
              <label htmlFor="email">Email</label>
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

            {/* PASSWORD */}
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

            {/* CONFIRM PASSWORD */}
            <div className="login-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="login-input-wrapper">
                <span className="input-icon lock-icon">🔒</span>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* ACCOUNT TYPE / ROLE */}
            <div className="login-field">
              <label htmlFor="role">Account Type</label>
              <div className="login-input-wrapper">
                <span className="input-icon">👤</span>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="STUDENT">Student</option>
                  <option value="MENTOR">Mentor</option>
                  <option value="LEARNING_MANAGER">Learning Manager</option>
                </select>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="login-submit"
              disabled={isLoading}
            >
              <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
              {!isLoading && <span style={{ marginLeft: '4px' }}>→</span>}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          {/* Login link */}
          <div className="login-register">
            <span>Already have an account?</span>
            <button
              type="button"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;