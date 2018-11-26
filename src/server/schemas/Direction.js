const { UserBase } = require('./utils');

const mongoose = require('mongoose');

const Direction = new mongoose.Schema({
  ...UserBase,
});

export default Direction;
