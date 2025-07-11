import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

const JobPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user ? user.token : null;
  
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  }
  
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job!', error);
      toast.error('Error deleting job!');
    }
  };
  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        console.log('id: ', id);
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJob();
  }, [id]);
  
  const onDeleteClick = (jobId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this listing?' + jobId,
    );
    if (!confirm) return;
    
    if (!token) {
      toast.error('You must be logged in!');
      navigate('/login');
    }
    else {
      deleteJob(jobId);
      toast.success('Job Deleted Successfully!');
      navigate('/');
    }
  };
  
  return (
    <div className="job-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{job.title}</h2>
          <p>Job Type: {job.type}</p>
          <p>Job Description: {job.description}</p>
          <p>Company Name: {job.company.name}</p>
          <p>Company Email: {job.company.contactEmail}</p>
          <p>Company Phone: {job.company.contactPhone}</p>
          <p>Website: {job.company.website}</p>
          <p>Company Size: {job.company.size}</p>
          <p>Location: {job.location}</p>
          <p>Salary: {job.salary}</p>
          <p>Experience Level: {job.experienceLevel}</p>
          <p>Posted Date: {formatDate(job.postedDate)}</p>
          <p>Status: {job.status}</p>
          <p>Application Deadline: {formatDate(job.applicationDeadline)}</p>
          <p>Requirements: {job.requirements.join(', ')}</p>
          <div className="align-row">
            <Link to={`/edit-job/${id}`} className="btn"> Edit </Link>
            <Link to="/" onClick={() => onDeleteClick(job._id)}
                  className="btn">Delete</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default JobPage;
