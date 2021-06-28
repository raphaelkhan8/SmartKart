const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true, 
      useNewUrlParser: true,
      useCreateIndex: true
    })

    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (e) {
    console.error(`Error: ${e.message}`)
    process.exit(1)
  }
}

module.exports = dbConnection;