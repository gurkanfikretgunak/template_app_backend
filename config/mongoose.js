// PACKAGES
const mongoose = require('mongoose');

// CONFIG
const config = require('./config');



const environment = process.env.NODE_ENV || 'development';

mongoose
  .connect(config[environment].database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((err) => console.log(err.message))

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db')
})

mongoose.connection.on('error', (err) => {
  console.log(err.message)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected.')
})

// shut down running connection if the server is terminated
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})
