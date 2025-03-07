const dotenv = require('dotenv')
const colors = require('colors')
const jobs = require('./data/jobs-long.js')
// const users = require('./data/users-email-short.json')
const Job = require('./models/jobModel')
// const User = require('./models/userModel')
const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Job.deleteMany()
    // await User.deleteMany()

    await Job.insertMany(jobs)
    // await User.insertMany(users)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Job.deleteMany();
    // await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
