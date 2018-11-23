const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const Etablissement = new mongoose.Schema({
  name: String,
  address: String,
  agents: [ObjectId],

});

export default Etablissement;
