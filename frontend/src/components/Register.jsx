import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

    setIsLoading(true);

    try {
      await authService.register({
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      alert('Registration successful!');

      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Registration failed'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="page-container"
      style={{
        maxWidth: '430px',
        marginTop: '70px'
      }}
    >
      <div className="card">
        <h2>Create SkillSprint Account</h2>

        <p
          style={{
            color: 'var(--text-muted)',
            marginTop: '5px'
          }}
        >
          Create your account to get started.
        </p>

        {error && (
          <div
            style={{
              color: 'var(--danger)',
              backgroundColor: '#fee2e2',
              padding: '10px',
              borderRadius: '6px',
              marginTop: '15px'
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginTop: '20px'
          }}
        >
          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '9px',
                marginTop: '5px'
              }}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              style={{
                width: '100%',
                padding: '9px',
                marginTop: '5px'
              }}
              placeholder="Minimum 6 characters"
            />
          </div>

          <div>
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '9px',
                marginTop: '5px'
              }}
              placeholder="Confirm your password"
            />
          </div>

          <div>
            <label>Register As</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '9px',
                marginTop: '5px'
              }}
            >
              <option value="STUDENT">
                Student
              </option>

              <option value="MENTOR">
                Mentor
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading
              ? 'Creating Account...'
              : 'Register'}
          </button>
        </form>

        <div
          style={{
            textAlign: 'center',
            marginTop: '20px',
            color: 'var(--text-muted)'
          }}
        >
          Already have an account?{' '}

          <Link to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;