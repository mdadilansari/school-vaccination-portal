const Student = require('../models/student.js');
const Drive = require('../models/Drive.js');

exports.getDashboardData = async (req, res) => {
  const totalStudents = await Student.countDocuments();
  const vaccinated = await Student.aggregate([
    { $match: { "vaccinations.0": { $exists: true } } },
    { $count: "count" }
  ]);
  const upcomingDrives = await Drive.find({
    date: { $gte: new Date(), $lte: new Date(Date.now() + 30*24*60*60*1000) }
  });

  res.json({
    totalStudents,
    vaccinated: vaccinated[0]?.count || 0,
    vaccinationRate: totalStudents ? (vaccinated[0]?.count || 0) / totalStudents * 100 : 0,
    upcomingDrives
  });
};