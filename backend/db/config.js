const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/e-comm').then(() => {
    console.log('MongoDB connection successful');
    // Your code here, e.g., start your Express server
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });;