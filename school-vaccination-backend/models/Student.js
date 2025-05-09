const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    length: 6
  },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String, required: true },
  vaccinationStatus: { type: String, required: true },
  dateOfBirth: { type: Date, required: true }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
