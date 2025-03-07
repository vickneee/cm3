import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const Signup = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const name = useField("text");
  const username = useField("text");
  const password = useField("password");
  const phoneNumber = useField("text");
  const gender = useField("text");
  const dateOfBirth = useField("date");
  const membershipStatus = useField("text");
  const bio = useField("text");
  const address = useField('text');
  const profilePicture = useField('text');
  const [validationError, setValidationError] = useState(null); // Client side validation error state
  
  const { signup, error, validationError: signupValidationError } = useSignup("/api/users/signup");
  
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (signupValidationError) {
      setValidationError(signupValidationError);
    }
  }, [error, signupValidationError]);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.value || !username.value || !password.value || !phoneNumber.value || !gender.value || !dateOfBirth.value || !membershipStatus.value || !bio.value || !address.value) {
      setValidationError('Please provide all the required fields.');
      return;
    }
    
    setValidationError(null); // Clear validation error
    
    const user = await signup({
      name: name.value,
      username: username.value,
      password: password.value,
      phone_number: phoneNumber.value,
      gender: gender.value,
      date_of_birth: dateOfBirth.value,
      membership_status: membershipStatus.value,
      bio: bio.value,
      address: address.value,
      profile_picture: profilePicture.value
    });
    if (user) {
      console.log("Signup successful");
      toast.success("Signup successful!");
      setIsAuthenticated(true);
      navigate("/");
    }
  };
  
  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        {validationError && <p className="error">{validationError}</p>} {/* Display validation error */}
        <label>Name:</label>
        <input {...name} />
        <label>Username:</label>
        <input {...username} />
        <label>Password:</label>
        <input {...password} />
        <label>Phone Number:</label>
        <input {...phoneNumber} />
        <label>Gender:</label>
        <input {...gender} />
        <label>Date of Birth:</label>
        <input {...dateOfBirth} />
        <label>Membership Status:</label>
        <input {...membershipStatus} />
        <label>Bio:</label>
        <input {...bio} />
        <label>Address:</label>
        <input {...address} />
        <label>Profile picture:</label>
        <input {...profilePicture} />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
