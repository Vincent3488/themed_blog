// checkUsers.js
require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Define User Schema
    const UserSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true }
    });

    // Create User Model
    const User = mongoose.model('User', UserSchema);

    // Retrieve and log all users
    return User.find({});
  })
  .then(users => {
    console.log('Registered Users:');
    console.log(users); // Logs all users to the console
  })
  .catch(err => {
    console.error('Error:', err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
