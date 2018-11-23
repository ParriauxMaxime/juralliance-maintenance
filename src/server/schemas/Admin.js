import { UserBase } from './utils';

const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
  ...UserBase,
});

export default Admin;
