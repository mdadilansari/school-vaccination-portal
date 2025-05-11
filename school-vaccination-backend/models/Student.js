const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema({
  vaccineName: { type: String, required: true },
  dateAdministered: { type: Date, required: true },
});

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    length: 6,
  },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const num = parseInt(value, 10);
        return /^[0-9]+$/.test(value) && num >= 1 && num <= 12;
      },
      message:
        "Class must be a number between 1 and 12, without any characters.",
    },
  },
  vaccinationStatus: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  vaccinations: {
    type: [vaccinationSchema],
    default: [],
  },
  enrolledInDrive: { type: Boolean, default: false },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
