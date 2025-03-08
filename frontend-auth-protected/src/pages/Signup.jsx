import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const Signup = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const name = useField("text");
  const username = useField("text");
  const password = useField("password");
  const phoneNumber = useField("text");
  const [selectedGender, setSelectedGender] = useState('Male');
  const dateOfBirth = useField("date");
  const [selectedMembershipStatus, setSelectedMembershipStatus] = useState('Active');
  const bio = useField("textarea");
  const address = useField('text');
  const profilePicture = useField('text');
  const [validationError, setValidationError] = useState(null); // Client side validation error state
  
  const { signup } = useSignup("/api/users/signup");
  
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };
  
  const handleMembershipStatusChange = (e) => {
    setSelectedMembershipStatus(e.target.value);
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.value || !username.value || !password.value || !phoneNumber.value || !selectedGender || !dateOfBirth.value || !selectedMembershipStatus || !bio.value || !address.value) {
      setValidationError('Please provide all the required fields!!!');
      toast.error('Please provide all the required fields!!!');
      return;
    }
    
    setValidationError(null); // Clear validation error
    
    try {
      const user = await signup({
        name: name.value,
        username: username.value,
        password: password.value,
        phone_number: phoneNumber.value,
        gender: selectedGender,
        date_of_birth: dateOfBirth.value,
        membership_status: selectedMembershipStatus,
        bio: bio.value,
        address: address.value,
        profile_picture: profilePicture.value,
      });
      if (user) { // Check if user exists instead of error
        console.log('Signup successful!');
        toast.success('Signup successful!');
        setIsAuthenticated(true);
        navigate('/');
      }
    } catch (error) {
      console.error('Signup failed:', error.message);
      toast.error('Signup failed!');
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
        <select value={selectedGender} onChange={handleGenderChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label>Date of Birth:</label>
        <input {...dateOfBirth} />
        <label>Membership Status:</label>
        <select value={selectedMembershipStatus} onChange={handleMembershipStatusChange}>
          <option value="Active">Active</option>
          <option value="Not Active">Not Active</option>
          <option value="Pending">Pending</option>
        </select>
        <label>Bio:</label>
        <textarea {...bio} />
        <label>Address:</label>
        <input {...address} />
        <label>Profile picture (Optional):</label>
        <input {...profilePicture}/>
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
