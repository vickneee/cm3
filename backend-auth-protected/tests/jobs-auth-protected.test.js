const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const Job = require("../models/jobModel");
const User = require("../models/userModel");

// Create a new instance of the supertest agent
const api = supertest(app);

const jobs = [
  {
    title: "Software Engineer",
    type: "Full-Time",
    description: "Develop and maintain web applications using modern technologies.",
    company: {
      name: "Tech Solutions Inc.",
      contactEmail: "hr@techsolutions.com",
      contactPhone: "+1234567890",
      website: "https://techsolutions.com"
    },
    location: "Remote",
    salary: 120000,
    postedDate: "2021-01-01",
    status: "open",
    applicationDeadline: "2021-02-01",
    requirements: ["JavaScript", "React", "Node.js"],
  },
  {
    title: "Marketing Manager",
    type: "Part-Time",
    description: "Lead the marketing strategy and social media campaigns.",
    company: {
      name: "Creative Agency",
      contactEmail: "jobs@creativeagency.com",
      contactPhone: "+1987654321",
      website: "https://creativeagency.com"
    },
    location: "New York, NY",
    salary: 80000,
    postedDate: "2021-01-01",
    status: "open",
    applicationDeadline: "2021-02-01",
    requirements: ["Marketing", "Social Media", "SEO"],
  },
  {
    title: "Data Analyst",
    type: "Contract",
    description: "Analyze business data and generate reports for decision-making.",
    company: {
      name: "DataCorp Ltd.",
      contactEmail: "careers@datacorp.com",
      contactPhone: "+1122334455",
      website: "https://datacorp.com"
    },
    location: "San Francisco, CA",
    salary: 90000,
    postedDate: "2021-01-01",
    status: "open",
    applicationDeadline: "2021-02-01",
    requirements: ["Data Analysis", "SQL", "Excel"]
  },
  {
    title: "Customer Support Representative",
    type: "Remote",
    description: "Assist customers with product inquiries and troubleshooting.",
    company: {
      name: "Support Hub",
      contactEmail: "support@supporthub.com",
      contactPhone: "+4455667788",
      website: "https://supporthub.com"
    },
    location: "Remote",
    salary: 60000,
    postedDate: "2021-01-01",
    status: "open",
    applicationDeadline: "2021-02-01",
    requirements: ["Customer Service", "Communication", "Problem-solving"]
  },
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/users/signup").send({
    name: "Sara Smith",
    username: "sara_smith89",
    password: "myp@ssword123",
    phone_number: "987-654-3210",
    gender: "Female",
    date_of_birth: "1989-11-22",
    membership_status: "Silver",
    bio: "Passionate about design and photography.",
    address: "456 Oak Avenue, Springfield",
    profile_picture: "https://example.com/sara-profile.png"
  });
  token = result.body.token;
});

describe("Given there are initially some jobs saved", () => {
  beforeEach(async () => {
    await Job.deleteMany({});
    await Promise.all([
      api
        .post("/api/jobs")
        .set("Authorization", "bearer " + token)
        .send(jobs[0]),
      api
        .post("/api/jobs")
        .set("Authorization", "bearer " + token)
        .send(jobs[1]),
    ]);
  });

  it("should return all jobs as JSON when GET /api/jobs is called", async () => {
    await api
      .get("/api/jobs")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create one job when POST /api/jobs is called", async () => {
    const newJob = {
      title: "Graphic Designer",
      type: "Freelance",
      description: "Create visual content for digital and print media.",
      company: {
        name: "Design Studio",
        contactEmail: "hello@designstudio.com",
        contactPhone: "+6677889900",
        website: "https://designstudio.com"
      },
      location: "Los Angeles, CA",
      salary: 70000,
      postedDate: "2021-01-01",
      status: "open",
      applicationDeadline: "2021-02-01",
      requirements: ["Graphic Design", "Adobe Creative Suite"]
    }
    await api
      .post("/api/jobs")
      .set("Authorization", "Bearer ", token)
      .send(newJob)
      .expect(201);
  });

  it("should return one job by ID when GET /api/jobs/:id is called", async () => {
    const job = await Job.findOne();

    await api
      .get("/api/jobs/" + job._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should update one job by ID when PUT /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    const updatedJob = {
      title: "Updated job information.",
      type: "Remote",
    };
    const response = await api
      .put(`/api/jobs/${job._id}`)
      .set("Authorization", "bearer " + token)
      .send(updatedJob)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    console.log("Response body:", response.body);

    const updatedJobCheck = await Job.findById(job._id);
    console.log("Updated job:", updatedJobCheck);

    expect(updatedJobCheck.title).toBe(updatedJob.title);
    expect(updatedJobCheck.type).toBe(updatedJob.type);
  });

  it("should delete one job by ID when DELETE /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    await api
      .delete("/api/jobs/" + job._id)
      .set("Authorization", "bearer " + token)
      .expect(204);
    const jobCheck = await Job.findById(job._id);
    expect(jobCheck).toBeNull();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
