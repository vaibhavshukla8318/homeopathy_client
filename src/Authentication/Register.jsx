import { useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { useNavigate, Link   } from 'react-router-dom';
import './css/Register.css';

const Register = () => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');

  const { storeTokenInLS, API, theme } = useAuth(); 

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    const { username, email, password, passwordConfirm } = formData;

    if (!username || !email || !password || !passwordConfirm) {
      return 'All fields are required.';
    }

    if (password !== passwordConfirm) {
      return 'Passwords do not match.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        //stored the token in local storage
        storeTokenInLS(data.token)

        setFormData({
          username: '',
          email: '',
          password: '',
          passwordConfirm: '',
        });
        toast.success('Registration successful! You are now logged in.');
        navigate("/auth/verify-otp")
      } else {
        toast.error(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='register' style={{backgroundColor: theme.background}}>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          {error && <p className="error-message">{error}</p>}

        <div className='form-group'>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        
        <div className='form-group'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email" 
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          
          </div>

          <div className='form-group'>
          
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>


          <div className='form-group'>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              id="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          
          </div>


          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <p>Already have an account? <Link to="/auth/login" >Login here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
