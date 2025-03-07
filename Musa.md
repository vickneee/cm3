
# Self-Assessment Backend

### Example 1: Improving Code Quality

 

```javascript

 useEffect(() => {
  fetch("/api/jobs")
    .then((res) => res.json())
    .then((data) => setJobs(data))
    .catch(() => console.error("Error fetching jobs"));
}, []);

 
```

 

   

To address these issues, we refactored the code to handle edge cases effectively:  

```javascript

import { useState, useEffect } from "react";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/jobs")
      .then((res) => setJobs(res.data))
      .catch(() => setError("Failed to load jobs"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Job Listings</h2>
      {jobs.length > 0 ? jobs.map(job => (
        <div key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.company.name} - {job.location}</p>
        </div>
      )) : <p>No jobs found.</p>}
    </div>
  );
};

export default JobList;

  

 
```

### Key Improvements:
 
---
Key Improvements:
Added Loading State
Handled API Errors
Improved Readability
 

```javascript
axios.get("/api/jobs")
  .then((res) => setJobs(res.data))
  .catch(() => setError("Failed to load jobs"))
  .finally(() => setLoading(false));

 
```

**Lessons Learned:**
Always handle errors to improve UX
Use axios for cleaner API calls
Add loading states for better UI feedback