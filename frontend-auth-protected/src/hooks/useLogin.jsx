import {useState} from 'react';
import {toast} from 'react-toastify';

export default function useLogin(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [validationError, setValidationError] = useState(null);
  
  const login = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    if (!userData.username || !userData.password) {
      setValidationError('Please provide both username and password.');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
      });
      
      const user = await response.json();
      
      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        setIsLoading(false);
        return user; // Return user data
      } else {
        // Get an error message from response
        setError(user.error || "Login failed!");
        toast.error('Login failed!');
        setIsLoading(false);
        return null; // Return null if login failed
      }
      
    } catch (error) {
      setError('Network error, please try again later.');
      toast.error('Network error, please try again later.');
      setIsLoading(false);
      return null; // Return null to indicate an error
      
    } finally {
      setIsLoading(false);
    }
  };
  
  return {login, isLoading, error, validationError};
}
