const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    require:  true,
  },
  email: {
    type: String,
    require:  true,
  },
  password: {
    type: String,
    require:  true,
  },
  type: {
    type: String,
    require:  true,
    default: "student",
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
