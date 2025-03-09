 // https://cm3-v3-4.onrender.com/api/jobs/ // This is my link From Render

 const Job = require('../models/jobModel');

 const getAllJobs = async (req, res) => {
   try {
     const jobs = await Job.find();
     res.status(200).json(jobs);
   } catch (error) {
     res.status(500).json({ message: 'Server error' });
   }
 };
 
 const getJobById = async (req, res) => {
   try {
     const job = await Job.findById(req.params.id);
     if (!job) {
       return res.status(404).json({ message: 'Job not found' });
     }
     res.status(200).json(job);
   } catch (error) {
     res.status(500).json({ message: 'Server error' });
   }
 };
 
 const createJob = async (req, res) => {
   // const { title, type, description, company, location, salary, experienceLevel, applicationDeadline, requirements } = req.body;
   //
   // if (!title || !type || !description || !company || !location || !salary || !experienceLevel || !applicationDeadline) {
   //   return res.status(400).json({ error: 'All fields are required' });
   // }
   //
   try {
     const newJob = new Job({
       // title,
       // type,
       // description,
       // company: {
       //   name: company.name,
       //   contactEmail: company.contactEmail,
       //   contactPhone: company.contactPhone,
       //   website: company.website,
       //   size: company.size
       // },
       // location,
       // salary,
       // experienceLevel,
       // applicationDeadline,
       // requirements,
       
        ...req.body,
     });
 
     await newJob.save();
     res.status(201).json(newJob);
   } catch (error) {
     res.status(500).json({ message: 'Server error' });
   }
 };
 
 const updateJob = async (req, res) => {
   try {
     const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
     if (!updatedJob) {
       return res.status(404).json({ message: 'Job not found' });
     }
     res.status(200).json(updatedJob);
   } catch (error) {
     res.status(500).json({ message: 'Server error' });
   }
 };
 
  
 const deleteJob = async (req, res) => {
   try {
     const job = await Job.findByIdAndDelete(req.params.id);
     if (!job) {
       return res.status(404).json({ message: 'Job not found' });
     }
     res.status(200).json({ message: 'Job deleted successfully' });
   } catch (error) {
     res.status(500).json({ message: 'Server error' });
   }
 };
 
 module.exports = {
   getAllJobs,
   getJobById,
   createJob,
   updateJob,
   deleteJob,
 };
 //
