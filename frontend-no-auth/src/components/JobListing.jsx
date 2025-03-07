/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const JobListing = ({ job }) => {
  return (
    <div className="job-preview">
      <h3>{job.title}</h3>
      <p>Company: {job.company.name}</p>
      <p>Location: {job.location}</p>
      <p>Salary: ${job.salary}</p>
      <p>Status: {job.status}</p>
      <Link to={`/jobs/${job._id}`}>View Details</Link>
    </div>
  );
};

export default JobListing;
