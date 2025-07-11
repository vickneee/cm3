import useField from "../hooks/useField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from '../hooks/useLogin.jsx';
import {toast} from 'react-toastify';

// eslint-disable-next-line react/prop-types
const Login = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const username = useField("text");
  const password = useField("password");
  const [validationError, setValidationError] = useState(null); // Client side validation error state
  
  const { login } = useLogin("/api/users/login");
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!username.value || !password.value) {
      setValidationError('Please fill in all fields.');
      return;
    }
    
    setValidationError(null);
    
    try {
      const user = await login({
        username: username.value,
        password: password.value,
      });
      
      if (!user) {
        console.log('Login failed');
        // toast.error('Login failed, check your credentials.');
        return setIsAuthenticated(false);
      }
      console.log('Login successful!');
      toast.success('Login successful!');
      setIsAuthenticated(true);
      navigate('/');
      
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error('Login failed, check your credentials.');
    }
  }
  
  return (
    <div className="create">
      <h2>Log In</h2>
      <form onSubmit={handleFormSubmit}>
        {validationError && <p className="error">{validationError}</p>} {/* Display validation error */}
        <label>Username:</label>
        <input {...username} />
        <label>Password:</label>
        <input {...password} />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
