const Drive = require('../models/Drive');

exports.getDrive = async (req, res) => {
  const drive = await Drive.findOne().populate('studentsEnrolled');
  res.json(drive);
};

exports.createDrive = async (req, res) => {
  await Drive.deleteMany({});
  const { date, vaccine, dosesAvailable } = req.body;

  if (!vaccine || typeof dosesAvailable !== 'number') {
    return res.status(400).json({ message: 'vaccine and dosesAvailable are required' });
  }

  const drive = new Drive({ date, vaccine, dosesAvailable });
  await drive.save();
  res.status(201).json(drive);
};

exports.enrollStudent = async (req, res) => {
  const drive = await Drive.findById(req.params.id);
  if (!drive.studentsEnrolled.includes(req.body.studentId)) {
    drive.studentsEnrolled.push(req.body.studentId);
    await drive.save();
  }
  res.json(drive);
};

exports.deleteDrive = async (req, res) => {
  await Drive.deleteMany({});
  res.json({ message: 'Drive deleted' });
};