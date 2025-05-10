const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
  name: String,
  date: Date,
});

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  class: Number,
  vaccinations: [vaccinationSchema],
});

module.exports = mongoose.model('Student', studentSchema);