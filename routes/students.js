const express = require('express');

const studentsController = require('../controllers/students');

const router = express.Router();

router.get('/getAll',studentsController.getStudents);
router.post('/post',studentsController.postStudentData);

module.exports = router;