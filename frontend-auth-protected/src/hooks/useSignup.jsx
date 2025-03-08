import { useState } from "react";
import {toast} from 'react-toastify';

export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [validationError, setValidationError] = useState(null);
  
  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    if (!userData.name || !userData.username || !userData.password || !userData.phone_number || !userData.gender || !userData.date_of_birth || !userData.membership_status || !userData.bio || !userData.address) {
      setValidationError('Please provide all the required fields!');
      toast.error('Please provide all the required fields!');
      setIsLoading(false);
      return;
    }
    
    setValidationError(null); // Clear validation error
    
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
        // Clear any previous errors
        setError(null);
        return user; // Return user data on success
      } else {
        // Check if the response is an error
        setError(user.error || 'Signup failed!');
        toast.error('Signup failed!');
        return null; // Return null if signup fails
      }
    } catch (error) {
      setError('Network error, please try again later.');
      toast.error('Network error, please try again later.');
      return null; // Return null if network error occurs
    } finally {
      setIsLoading(false);
    }
  };
  
  return { signup, isLoading, error, validationError };
}
