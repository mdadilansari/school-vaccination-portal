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
  const driveId = req.params.id;
  const studentId = req.body.studentId;

  try {
    if (!studentId) {
      return res.status(400).json({ message: 'studentId is required in the request body' });
    }

    const drive = await Drive.findById(driveId);
    if (!drive) {
      return res.status(404).json({ message: 'Drive not found' });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const alreadyEnrolled = drive.studentsEnrolled.some(
      (enrolledId) => enrolledId.toString() === studentId
    );

    if (alreadyEnrolled) {
      return res.status(409).json({ message: 'Student is already enrolled in the drive' });
    }

    drive.studentsEnrolled.push(studentId);
    await drive.save();

    res.status(200).json({ message: 'Student enrolled successfully', drive });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling student', error: error.message });
  }
};

exports.deleteDrive = async (req, res) => {
  await Drive.deleteMany({});
  res.json({ message: 'Drive deleted' });
};