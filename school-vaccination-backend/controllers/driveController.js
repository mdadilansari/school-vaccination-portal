const Drive = require('../models/Drive');
const Student = require('../models/Student');

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
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) return res.status(404).json({ message: 'Drive not found' });

    const student = await Student.findOne({ studentId: req.body.studentId });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const alreadyEnrolled = drive.studentsEnrolled.some(id => id.toString() === student._id.toString());
    if (alreadyEnrolled) return res.status(400).json({ message: 'Student already enrolled in this drive' });

    drive.studentsEnrolled.push(student._id);
    student.enrolledInDrive = true;

    await student.save();
    await drive.save();

    const updatedDrive = await Drive.findById(req.params.id).populate('studentsEnrolled');
    res.status(200).json(updatedDrive);
  } catch (error) {
    res.status(500).json({ message: 'Enrollment failed', error: error.message });
  }
};

exports.deleteDrive = async (req, res) => {
  await Drive.deleteMany({});
  res.json({ message: 'Drive deleted' });
};