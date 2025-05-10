const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
  date: Date,
  vaccine: String,
  dosesAvailable: Number,
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

module.exports = mongoose.model('Drive', driveSchema);