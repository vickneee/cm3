# Self-Assessment of Frontend Add Job Form 

## Issues & Fixes

1. Token Authentication Issue – The request may be blocked due to an invalid or missing token.

2. Missing await in addJob(newJob); – The function is asynchronous, but you do not wait for it.

3. Backend Not Receiving Correct Data – Some fields might be improperly formatted.

✅ Fixes & Improvements

### 1. Fix Token Authentication

Your token retrieval is not reliable because localStorage.getItem('user') may be null.

Change this:

```javascript
const user = JSON.parse(localStorage.getItem('user'));
const token = user ? user.token : null;
```

To this:

```javascript
const user = JSON.parse(localStorage.getItem('user') || "{}");
const token = user?.token || "";
```

This ensures that token is never undefined.

### 2. Fix await in submitForm

You need to wait for the job to be added before showing success and navigating.

Modify this:
```javascript
addJob(newJob);
toast.success('Job added successfully');
navigate('/');
```

To this:
```javascript
const success = await addJob(newJob);
if (success) {
toast.success("Job added successfully!");
navigate("/");
} else {
toast.error("Failed to add job. Try again.");
}
```

Now, the user gets feedback if adding the job fails.

### 3. Fix applicationDeadline and postedDate

You are using hardcoded dates ("2023-04-03T21:00:00.000Z"), which is incorrect.

```javascript
postedDate: new Date("2023-04-03T21:00:00.000Z").toLocaleString(), 
applicationDeadline: new Date("2023-04-03T21:00:00.000Z").toLocaleString()
```
Fix this:

```javascript
postedDate: new Date(postedDate).toISOString(),
applicationDeadline: new Date(applicationDeadline).toISOString()
```

This converts the date input correctly.

---

### Final Code

Here is the updated code:

```javascript
const addJob = async (newJob) => {
  try {
    const res = await fetch(`api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newJob),
    });
    
    if (!res.ok) {
      throw new Error("Failed to add job");
    }
    
    return true;
    
  } catch (error) {
    console.error(error);
    return false;
  }
};

const submitForm = async (e) => {
  e.preventDefault();
  
  const requirementsArray = requirements.split(",").map(item => item.trim()).filter(item => item !== "");
  
  const newJob = {
    title,
    type,
    description,
    company: { name: companyName, contactEmail, contactPhone, website, size },
    location,
    salary,
    experienceLevel,
    postedDate: new Date(postedDate).toISOString(),
    status,
    applicationDeadline: new Date(applicationDeadline).toISOString(),
    requirements: requirementsArray,
  };
  
  const success = await addJob(newJob); // Wait for job to be added
  if (success) {
    toast.success("Job added successfully!");
    navigate("/");
  } else {
    toast.error("Failed to add job. Try again.");
  }
};
```
