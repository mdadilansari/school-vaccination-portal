const Drive = require('../models/Drive');
const Student = require('../models/Student');

// GET the current drive
exports.getDrive = async (req, res) => {
  try {
    const drive = await Drive.findOne().populate('studentsEnrolled');
    if (!drive) return res.status(404).json({ message: 'No drive found' });
    res.status(200).json(drive);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch drive', error: error.message });
  }
};

// POST /api/drive - Create or replace the drive
exports.createDrive = async (req, res) => {
  try {
    await Drive.deleteMany({}); // Remove existing drives (if single active drive is intended)
    const { date, vaccine, dosesAvailable } = req.body;

    if (!vaccine || typeof dosesAvailable !== 'number') {
      return res.status(400).json({ message: 'vaccine and dosesAvailable are required' });
    }

    const drive = new Drive({ date, vaccine, dosesAvailable });
    await drive.save();
    res.status(201).json(drive);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create drive', error: error.message });
  }
};

// PUT /api/drive/:id/enroll - Enroll a student to a drive using studentId
exports.enrollStudent = async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) return res.status(404).json({ message: 'Drive not found' });

    const student = await Student.findOne({ studentId: req.body.studentId });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const alreadyEnrolled = drive.studentsEnrolled.some(
      id => id.toString() === student._id.toString()
    );
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Student already enrolled in this drive' });
    }

    drive.studentsEnrolled.push(student._id);
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