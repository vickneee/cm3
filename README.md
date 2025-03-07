# CM3

[CM3 V2](https://cm3-gr2-v2.onrender.com/)

## Deliverables

Please submit to *OMA* **`7 separate`** *links* to the following deliverables for this coding marathon:

1. **Code** for **API V1** (without authentication)
2. **Code** for **API V2** (with authentication and protection)
3. **Code** for the final **frontend**. Optionally, include the code for Frontend V1, which worked with API V1.
4. Backend **tests** for API V1
5. Backend **tests** for API V2
6. **URLs** for the deployed APIs and frontend(s)
7. **Self-assessment** and **self-grading** of your code. Use the [self-assessment template](./cm-template.md) for this purpose.

---

## Submission Checklist

Use this checklist to track your progress:

- [ ] API V1 Code (without authentication)
- [ ] API V2 Code (with authentication + protection)
- [ ] Frontend Code (with API V2 integration, Optional: Frontend API V1 code)
- [ ] Backend tests for API V1
- [ ] Backend tests for API V2
- [ ] Deployed URLs (APIs & Frontend)
- [ ] Self-assessment & grading

---

## Data Models

### Job Model

The schema for jobs is as follows:

```js
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Full-time, Part-time, Contract
  description: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    website: { type: String }, // Optional: Company's website URL
    size: { type: Number }, // Number of employees
  },
  location: { type: String, required: true }, // e.g., City, State, or Remote
  salary: { type: Number, required: true }, // e.g., Annual or hourly salary
  experienceLevel: { type: String, enum: ['Entry', 'Mid', 'Senior'], default: 'Entry' }, // Experience level
  postedDate: { type: Date, default: Date.now }, // Date the job was posted
  status: { type: String, enum: ['open', 'closed'], default: 'open' }, // Job status (open/closed)
  applicationDeadline: { type: Date }, // Deadline for job applications  
  requirements: [String], // List of required skills or qualifications
});

module.exports = mongoose.model('Job', jobSchema);
```

---

### User Model

For this application, we’re using **username** instead of email.

```js
const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  gender: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  membership_status: { type: String, required: true },
  bio: { type: String },
  address: { type: String, required: true },
  profile_picture: { type: String, required: false }
}, { timestamps: true, versionKey: false });
```

---

## Database Setup

### Local Testing
- Start by testing your application with a **local database** to ensure everything works smoothly.

### Cloud Integration
- Once fully functional, switch to using a **cloud database** from MongoDB Atlas.
- Test your APIs and frontend with the cloud setup.

---

## Deployment

Deploy the following components:

1. **Deploy API V1**  
   Deploy your backend API V1 (without authentication) to a platform like **Render**.

2. **Deploy Frontend V1**  
   Deploy the frontend that works with API V1 to a platform like **Render**.

3. **Deploy API V2**  
   Deploy your backend API V2 (with authentication) and ensure protected routes are working.

4. **Deploy Frontend V2**  
   Deploy the final frontend version integrated with API V2.

---

## Usage

### Part 1

1. **Install Backend Dependencies**  
   
   - Navigate to the `backend-no-auth` directory and install the necessary dependencies:
   - Rename the `.env.example` file to `.env` in the backend directory.   
   ```sh
   cd backend-no-auth 
   npm install
   npm run dev
   ```

2. **Install Frontend Dependencies & Start the App**  
   Navigate to the frontend directory, install dependencies, and start the application:
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the App**  
   Open your browser and visit: [http://localhost:3000](http://localhost:3000)
   

### Part 2

   - Stop the server if it is running.
   - Navigate to the `backend-auth` directory and install the necessary dependencies:
   - Rename the `.env.example` file to `.env` in the backend directory.
   ```sh
   cd backend-auth 
   npm install
   npm run dev
   ```

### Part 3

   - Stop the server if it is running.
   - Navigate to the `backend-protected` directory and install the necessary dependencies:
   - Rename the `.env.example` file to `.env` in the backend directory.
   ```sh
   cd backend-protected 
   npm install
   npm run dev
   ```
