import { useState } from "react";
import axios from "axios";

const AddJobPage = () => {
  const [job, setJob] = useState({
    title: "",
    type: "Full-Time",
    description: "",
    companyName: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    size: "",
    location: "",
    salary: "",
    experienceLevel: "Entry",
    status: "open",
    applicationDeadline: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/jobs", {
        title: job.title,
        type: job.type,
        description: job.description,
        location: job.location,
        salary: parseInt(job.salary, 10),
        experienceLevel: job.experienceLevel,
        status: job.status,
        applicationDeadline: job.applicationDeadline,
        requirements: job.requirements.split(",").map(r => r.trim()),
        company: {
          name: job.companyName,
          contactEmail: job.contactEmail,
          contactPhone: job.contactPhone,
          website: job.website,
          size: parseInt(job.size, 10),
        },
      });

      alert("Job added successfully!");
      window.location.href = "/";
    } catch (error) {
      alert("Failed to add job. Please check all fields.");
      console.error(error);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job Title:</label>
        <input type="text" name="title" required value={job.title} onChange={handleChange} />

        <label>Job Type:</label>
        <select name="type" required value={job.type} onChange={handleChange}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
        </select>

        <label>Job Description:</label>
        <textarea name="description" required value={job.description} onChange={handleChange}></textarea>

        <label>Company Name:</label>
        <input type="text" name="companyName" required value={job.companyName} onChange={handleChange} />

        <label>Contact Email:</label>
        <input type="email" name="contactEmail" required value={job.contactEmail} onChange={handleChange} />

        <label>Contact Phone:</label>
        <input type="text" name="contactPhone" required value={job.contactPhone} onChange={handleChange} />

        <label>Company Website:</label>
        <input type="text" name="website" value={job.website} onChange={handleChange} />

        <label>Company Size:</label>
        <input type="number" name="size" value={job.size} onChange={handleChange} />

        <label>Location:</label>
        <input type="text" name="location" required value={job.location} onChange={handleChange} />

        <label>Salary:</label>
        <input type="number" name="salary" required value={job.salary} onChange={handleChange} />

        <label>Experience Level:</label>
        <select name="experienceLevel" required value={job.experienceLevel} onChange={handleChange}>
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>

        <label>Status:</label>
        <select name="status" required value={job.status} onChange={handleChange}>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        <label>Application Deadline:</label>
        <input type="date" name="applicationDeadline" value={job.applicationDeadline} onChange={handleChange} />

        <label>Requirements (comma separated):</label>
        <input type="text" name="requirements" value={job.requirements} onChange={handleChange} />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
