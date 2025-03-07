import { useEffect, useState } from "react";
import axios from "axios";
import JobListing from "./JobListing";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("https://cm3-v3-4.onrender.com/api/jobs")
      .then(response => setJobs(response.data))
      .catch(error => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <div className="job-list">
      <h2>Available Jobs</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => <JobListing key={job._id} job={job} />)
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

export default JobListings;
