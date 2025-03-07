import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

// eslint-disable-next-line react/prop-types
const AddJobPage = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Full-Time');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [size, setSize] = useState();
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Entry');
  const [postedDate, setPostedDate] = useState('');
  const [status, setStatus] = useState('open');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [requirements, setRequirements] = useState(['']);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;
  
  const navigate = useNavigate();
  
  const addJob = async (newJob) => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) {
        throw new Error('Failed to add job');
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };
  
  const submitForm = (e) => {
    e.preventDefault();
    
    // Convert comma-separated string to an array
    const requirementsArray = requirements.split(',').
      map((item) => item.trim()).
      filter((item) => item !== ''); // Remove empty items
    
    const newJob = {
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
        website,
        size,
      },
      location,
      salary,
      experienceLevel,
      postedDate: new Date("2023-04-03T21:00:00.000Z").toLocaleString(), // Readable date format
      status,
      applicationDeadline: new Date("2023-04-03T21:00:00.000Z").toLocaleString(), // Readable date format
      requirements: requirementsArray, // Convert requirements to array
    };
    
    addJob(newJob);
    toast.success('Job added successfully');
    navigate('/');
  };
  
  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input type="text" required value={title}
               onChange={(e) => setTitle(e.target.value)}/>
        <label>Job type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>
        
        <label>Job Description:</label>
        <textarea required value={description}
                  onChange={(e) => setDescription(e.target.value)}></textarea>
        <label>Company Name:</label>
        <input type="text" required value={companyName}
               onChange={(e) => setCompanyName(e.target.value)}/>
        <label>Contact Email:</label>
        <input type="text" required value={contactEmail}
               onChange={(e) => setContactEmail(e.target.value)}/>
        <label>Contact Phone:</label>
        <input type="text" required value={contactPhone}
               onChange={(e) => setContactPhone(e.target.value)}/>
        <label>Website:</label>
        <input type="text" required value={website}
               onChange={(e) => setWebsite(e.target.value)}/>
        <label>Company Size:</label>
        <input type="number" value={size}
               onChange={(e) => setSize(e.target.value)}/>
        <label>Location:</label>
        <input type="text" required value={location}
               onChange={(e) => setLocation(e.target.value)}/>
        <label>Salary:</label>
        <input type="text" required value={salary}
               onChange={(e) => setSalary(e.target.value)}/>
        <label>Experience Level:</label>
        <select value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}>
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
        <label>Posted Date:</label>
        <input type="date" required value={postedDate}
               onChange={(e) => setPostedDate(e.target.value)}/>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <label>Application Deadline:</label>
        <input type="date" value={applicationDeadline}
               onChange={(e) => setApplicationDeadline(e.target.value)}/>
        <label>Requirements (comma-separated):</label>
        <input type="text" value={requirements}
               onChange={(e) => setRequirements(e.target.value)}/>
        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
