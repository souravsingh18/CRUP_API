const express = require('express');

const studentsController = require('../controllers/students');

const router = express.Router();

router.get('/getAll',studentsController.getStudents);
router.post('/post',studentsController.postStudentData);
router.patch('/update/:id',studentsController.updateStudent);
router.delete('/deleteAll',studentsController.deleteStudent);

module.exports = router;
