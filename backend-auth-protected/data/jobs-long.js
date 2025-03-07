const mongoose = require('mongoose');

// const jobSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   type: { type: String, required: true }, // e.g., Full-time, Part-time, Contract
//   description: { type: String, required: true },
//   company: {
//     name: { type: String, required: true },
//     contactEmail: { type: String, required: true },
//     contactPhone: { type: String, required: true },
//     website: { type: String }, // Optional: Company's website URL
//   },
//   location: { type: String, required: true }, // e.g., City, State, or Remote
//   salary: { type: Number, required: true }, // e.g., Annual or hourly salary
//   postedDate: { type: Date, default: Date.now }, // Date the job was posted
//   status: { type: String, enum: ['open', 'closed'], default: 'open' }, // Job status (open/closed)
//   applicationDeadline: { type: Date }, // Deadline for job applications
//   requirements: [String], // List of required skills or qualifications
// });

let id = new mongoose.Types.ObjectId("67c79917d1deded8666dcb3b"); // Ensure a correct id from the database

const jobs = [
  {
    title: 'Software Engineer',
    type: 'Full-time',
    description: 'Develop software applications',
    company: {
      name: 'Tech Co.',
      contactEmail: 'tech.co@example.com',
      contactPhone: '123-456-7890',
      website: 'https://tech.co',
      size: 400,
    },
    location: 'Remote',
    salary: 100000,
    experienceLevel: "Mid",
    postedDate: '2021-01-01',
    status: 'open',
    applicationDeadline: '2021-02-01',
    requirements: ['JavaScript', 'React', 'Node.js'],
    user_id: id,
  },
  {
    title: 'Product Manager',
    type: 'Full-time',
    description: 'Manage product development',
    company: {
      name: 'Tech Co.',
      contactEmail: 'tech.co@example.com',
      contactPhone: '123-456-7890',
      website: 'https://tech.co',
      size: 400,
    },
    location: 'Remote',
    salary: 120000,
    experienceLevel: "Senior",
    postedDate: '2021-01-01',
    status: 'open',
    applicationDeadline: '2021-02-01',
    requirements: ['Product management', 'Agile', 'Scrum'],
    user_id: id,
  },
  {
    title: "Software Engineer",
    type: "Full-Time",
    description: "Develop and maintain web applications using modern technologies.",
    company: {
      name: "Tech Solutions Inc.",
      contactEmail: "hr@techsolutions.com",
      contactPhone: "+1234567890",
      website: "https://techsolutions.com",
      size: 200
    },
    location: "Remote",
    salary: 120000,
    experienceLevel: "Senior",
    postedDate: "2021-01-01",
    status: "open",
    applicationDeadline: "2021-02-01",
    requirements: ["JavaScript", "React", "Node.js"],
    user_id: id,
  },
  {
    title: "Marketing Manager",
    type: "Part-Time",
    description: "Lead the marketing strategy and social media campaigns.",
    company: {
      name: "Creative Agency",
      contactEmail: "jobs@creativeagency.com",
      contactPhone: "+1987654321",
      website: "https://creativeagency.com",
      size: 20
    },
    location: "New York, NY",
    salary: 80000,
    experienceLevel: "Mid",
    postedDate: "2021-01-01",
    status: "open",
    applicationDeadline: "2021-02-01",
    requirements: ["Marketing", "Social Media", "SEO"],
    user_id: id,
  },
  {
    title: "Data Analyst",
    type: "Contract",
    description: "Analyze business data and generate reports for decision-making.",
    company: {
      name: "DataCorp Ltd.",
      contactEmail: "careers@datacorp.com",
      contactPhone: "+1122334455",
      website: "https://datacorp.com",
      size: 50
    },
    location: "San Francisco, CA",
    salary: 90000,
    experienceLevel: "Mid",
    postedDate: "2021-01-01",
    status: "open",
    applicationDeadline: "2021-02-01",
    requirements: ["Data Analysis", "SQL", "Excel"],
    user_id: id,
  },
  {
    title: "Customer Support Representative",
    type: "Remote",
    description: "Assist customers with product inquiries and troubleshooting.",
    company: {
      name: "Support Hub",
      contactEmail: "support@supporthub.com",
      contactPhone: "+4455667788",
      website: "https://supporthub.com",
      size: 100
    },
    location: "Remote",
    salary: 60000,
    experienceLevel: "Entry",
    postedDate: "2021-01-01",
    status: "open",
    applicationDeadline: "2021-02-01",
    requirements: ["Customer Service", "Communication", "Problem-solving"],
    user_id: id,
  },
];

module.exports = jobs;
