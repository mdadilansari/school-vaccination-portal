const Student = require('../models/Student');
const XLSX = require('xlsx');

async function generateUniqueStudentId() {
  for (let i = 0; i < 5; i++) {
    const tempId = Math.floor(100000 + Math.random() * 900000).toString();
    const existing = await Student.findOne({ studentId: tempId });
    if (!existing) {
      return tempId;
    }
  }
  throw new Error('Failed to generate a unique student ID.');
}

function determineVaccinationStatus(vaccineNames) {
  const count = vaccineNames.length;
  if (count >= 2) return 'Fully Vaccinated';
  if (count === 1) return 'Partially Vaccinated';
  return 'Not Vaccinated';
}

// POST /api/students - Create new student
exports.createStudent = async (req, res) => {
  try {
    const studentId = await generateUniqueStudentId();
    const vaccineNames = req.body.vaccinations || [];
    const vaccinationStatus = determineVaccinationStatus(vaccineNames);

    const today = new Date();
    const dob = new Date(req.body.dateOfBirth);
    const age = today.getFullYear() - dob.getFullYear();

    const vaccinations = vaccineNames.map(name => ({
      vaccineName: name,
      dateAdministered: new Date()
    }));

    const newStudent = new Student({
      studentId,
      name: req.body.name,
      age,
      class: req.body.class,
      vaccinationStatus,
      dateOfBirth: dob,
      vaccinations
    });

    const savedStudent = await newStudent.save();
    res.status(201).json({
      studentId: savedStudent.studentId,
      name: savedStudent.name,
      age: savedStudent.age,
      class: savedStudent.class,
      dateOfBirth: savedStudent.dateOfBirth,
      vaccinations: savedStudent.vaccinations.map(v => v.vaccineName),
      vaccinationStatus: savedStudent.vaccinationStatus
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating student', error: error.message });
  }
};

// PUT /api/students/:studentId - Update student details
exports.updateStudent = async (req, res) => {
  const studentId = req.params.studentId;
  const updatedData = req.body;

  try {
    if (updatedData.studentId && updatedData.studentId !== studentId) {
      const existing = await Student.findOne({ studentId: updatedData.studentId });
      if (existing) {
        return res.status(400).json({ message: 'Student ID already in use.' });
      }
    }

    const student = await Student.findOneAndUpdate(
      { studentId },
      updatedData,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: 'Error updating student', error: error.message });
  }
};

// DELETE /api/students/:studentId - Delete student
exports.deleteStudent = async (req, res) => {
  const studentId = req.params.studentId;

  if (!studentId) {
    return res.status(400).json({ message: 'Missing studentId in request params' });
  }

  try {
    const deletedStudent = await Student.findOneAndDelete({ studentId: studentId.toString() });

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting student', error: error.message });
  }
};

// GET /api/students - Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ name: 1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};

// GET /api/students/:studentId - Get a single student by studentId
exports.getStudentById = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error: error.message });
  }
};

exports.importStudentsFromExcel = async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const studentData = XLSX.utils.sheet_to_json(sheet);

    const importedStudents = [];

    for (const data of studentData) {
      const studentId = await generateUniqueStudentId();
      const dob = new Date(data.dateOfBirth);
      const age = new Date().getFullYear() - dob.getFullYear();
      const vaccinations = (data.vaccinations || '').split(',').map(v => ({
        vaccineName: v.trim(),
        dateAdministered: new Date()
      }));

      const newStudent = new Student({
        studentId,
        name: data.name,
        age,
        class: data.class,
        dateOfBirth: dob,
        vaccinationStatus: determineVaccinationStatus(vaccinations.map(v => v.vaccineName)),
        vaccinations
      });

      const saved = await newStudent.save();
      importedStudents.push(saved);
    }

    res.status(201).json({ message: 'Import successful', count: importedStudents.length });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Import failed', error: err.message });
  }
};