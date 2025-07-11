# CM3

[CM3 V1 Link](https://cm3-gr2-v1.onrender.com/)

[CM3 V2 Link](https://cm3-gr2-v2.onrender.com/)

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
