import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const deleteJob = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`/api/jobs/${id}`);
      alert("Job deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div style={{
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      margin: "20px auto",
      textAlign: "left"
    }}>
      <h2 style={{ color: "#e91e63", fontWeight: "bold" }}>{job.title}</h2>
      <p><strong>Company:</strong> {job.company?.name || "N/A"}</p>
      <p><strong>Email:</strong> {job.company?.contactEmail || "N/A"}</p>
      <p><strong>Phone:</strong> {job.company?.contactPhone || "N/A"}</p>
      <p><strong>Website:</strong> {job.company?.website || "N/A"}</p>
      <p><strong>Size:</strong> {job.company?.size || "N/A"}</p>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> ${job.salary}</p>
      <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
      <p><strong>Posted Date:</strong> {formatDate(job.postedDate)}</p>
      <p><strong>Status:</strong> {job.status}</p>
      <p><strong>Application Deadline:</strong> {formatDate(job.applicationDeadline)}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Requirements:</strong> {job.requirements?.join(", ") || "N/A"}</p>

      <div style={{ marginTop: "15px" }}>
        <button 
          onClick={() => navigate(`/edit-job/${id}`)} 
          style={{ backgroundColor: "#e91e63", color: "white", padding: "8px 12px", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>
          Edit
        </button>
        <button 
          onClick={deleteJob} 
          style={{ backgroundColor: "#e91e63", color: "white", padding: "8px 12px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobDetailsPage;
