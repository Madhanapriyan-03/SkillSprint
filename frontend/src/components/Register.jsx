import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Registration failed'
      );
    }

    setLoading(false);
  };

  return (
    <div className="register-page">

      <div className="register-bg-circle register-circle-one"></div>
      <div className="register-bg-circle register-circle-two"></div>
      <div className="register-bg-circle register-circle-three"></div>

      <div className="register-top-brand">
        <span className="brand-skill">Skill</span>
        <span className="brand-sprint">Sprint</span>
        <small>LEARN · BUILD · ACHIEVE</small>
      </div>

      <div className="register-card">

        {/* LEFT */}
        <div className="register-brand-panel">

          <div className="register-brand-icon">
            S
          </div>

          <h1>Start Your Journey</h1>

          <p>
            Create your SkillSprint account and
            start building skills that move you forward.
          </p>

          <div className="register-feature-list">
            <div>
              <span>✓</span>
              <p>Personalized learning roadmaps</p>
            </div>

            <div>
              <span>✓</span>
              <p>Track your learning progress</p>
            </div>

            <div>
              <span>✓</span>
              <p>Build skills step by step</p>
            </div>
          </div>

          <div className="register-landscape"></div>

        </div>

        {/* RIGHT */}
        <div className="register-form-panel">

          <div className="register-header">
            <h2>Create Account</h2>
            <p>Join SkillSprint and start learning today</p>
          </div>

          {error && (
            <div className="register-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">

            <div className="register-field">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="register-field">
              <label>Password</label>

              <div className="register-password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="register-field">
              <label>Confirm Password</label>

              <div className="register-password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="register-field">
              <label>Account Type</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="STUDENT">Student</option>
                <option value="MENTOR">Mentor</option>
                <option value="LEARNING_MANAGER">
                  Learning Manager
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
              {!loading && <span>→</span>}
            </button>

          </form>

          <div className="register-divider">
            <span></span>
            <p>Already have an account?</p>
            <span></span>
          </div>

          <button
            className="register-login-link"
            onClick={() => navigate('/login')}
          >
            Back to Sign In
          </button>

        </div>
      </div>
    </div>
  );
};

export default Register;