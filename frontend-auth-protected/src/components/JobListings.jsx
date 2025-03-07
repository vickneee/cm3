import { Link } from "react-router-dom";

const JobListings = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        
        <div className="job-preview" key={job.id}>
          <Link to={`/jobs/${job.id}`}>
            <h2>{job.title}</h2>
          </Link>
          <p>Type: {job.type}</p>
          <p>Company Description: {job.description}</p>
          <p>Company Name: {job.company.name}</p>
          <div className={"align-row"}>
            <Link to={`/jobs/${job.id}`} className="btn">Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobListings;
