const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const User = require("../models/userModel");

// Create a new instance of the supertest agent
const api = supertest(app);

beforeAll(async () => {
  await User.deleteMany({});
});

describe('User Routes', () => {

  describe('POST /api/users/signup', () => {
    it('should signup a new user with valid credentials', async () => {
      // Arrange
      const userData = {
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
      };

      // Act
      const response = await api
        .post('/api/users/signup')
        .send(userData);

      console.log("Response status:", response.status);
      console.log("Response body:", response.body);


      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
    });

    it('should return an error with invalid credentials', async () => {
      // Arrange
      const userData = {
        username: 'sara_smith89',
        password: 'myp@ssword123'
      };

      // Act
      const response = await api
        .post('/api/users/signup')
        .send(userData);
      console.log("Response status:", response.status);
      console.log("Response body:", response.body);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');

    });
  });

  describe('POST /api/users/login', () => {
    it('should login a user with valid credentials', async () => {
      // Arrange
      const userData = {
        username: 'sara_smith89',
        password: 'myp@ssword123'
      };

      // Act
      const response = await api
        .post('/api/users/login')
        .send(userData);
      console.log("Response status:", response.status);
      console.log("Response body:", response.body);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should return an error with invalid credentials', async () => {
      // Arrange
      const userData = {
        username: 'sara_smith89',
        password: '@ssword123'
      };

      // Act
      const response = await api
        .post('/api/users/login')
        .send(userData);
      console.log("Response status:", response.status);
      console.log("Response body:", response.body);

      // Assert
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
