const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

describe('Job Routes', () => {
  let jobId;

  beforeAll(async () => {
    const newJob = {
      title: 'Software Engineer',
      type: 'Full-time',
      description: 'Job description here...',
      company: {
        name: 'Tech Corp',
        contactEmail: 'contact@techcorp.com',
        contactPhone: '123456789',
      },
      location: 'Remote',
      salary: 50000,
      experienceLevel: 'Entry',
      applicationDeadline: '2025-03-01',
      requirements: ['JavaScript', 'Node.js'],
    };

    const response = await request(app).post('/api/jobs').send(newJob);
    jobId = response.body._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/jobs', () => {
    it('should return a list of jobs', async () => {
      const response = await request(app).get('/api/jobs');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/jobs', () => {
    it('should create a new job', async () => {
      const newJob = {
        title: 'Software Engineer',
        type: 'Full-time',
        description: 'Job description here...',
        company: {
          name: 'Tech Corp',
          contactEmail: 'contact@techcorp.com',
          contactPhone: '123456789',
        },
        location: 'Remote',
        salary: 50000,
        experienceLevel: 'Entry',
        applicationDeadline: '2025-03-01',
        requirements: ['JavaScript', 'Node.js'],
      };

      const response = await request(app).post('/api/jobs').send(newJob);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Software Engineer');
      expect(response.body).toHaveProperty('salary', 50000);
    });

    it('should return an error if required fields are missing', async () => {
      const invalidJob = {
        title: 'Software Engineer',
        description: 'Job description here...',
      };

      const response = await request(app).post('/api/jobs').send(invalidJob);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'All fields are required');
    });
  });

  describe('PUT /api/jobs/:id', () => {
    it('should update an existing job', async () => {
      const updatedJob = {
        title: 'Senior Software Engineer',
        salary: 70000,
      };

      const response = await request(app).put(`/api/jobs/${jobId}`).send(updatedJob);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', 'Senior Software Engineer');
      expect(response.body).toHaveProperty('salary', 70000);
    });
  });

  describe('DELETE /api/jobs/:id', () => {
    it('should delete a job', async () => {
      const response = await request(app).delete(`/api/jobs/${jobId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Job deleted successfully');
    });
  });
});
