const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const Controle = new mongoose.Schema({
  name: String,
  etablissement: ObjectId,
  type: {
    type: String,
    enum: ['Coffee', 'Tea'],
  },
});

export default Controle;
