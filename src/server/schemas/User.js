import mongoose from 'mongoose';

const User = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  type: String,
});

export default User;
