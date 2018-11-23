import { UserBase } from './utils';

const mongoose = require('mongoose');

const Agent = new mongoose.Schema({
  ...UserBase,
});

export default Agent;
