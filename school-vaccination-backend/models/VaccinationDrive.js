const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
  vaccineName: String,
  date: Date,
  availableDoses: Number,
  applicableClasses: [String],
  isEditable: Boolean
});

module.exports = mongoose.model('VaccinationDrive', driveSchema);