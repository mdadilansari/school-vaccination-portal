const express = require('express');
const router = express.Router();
const driveController = require('../controllers/driveController');

router.get('/', driveController.getDrive);
router.post('/', driveController.createDrive);
router.put('/:id/enroll', driveController.enrollStudent);
router.delete('/', driveController.deleteDrive);

module.exports = router;