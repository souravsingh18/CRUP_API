const express = require('express');

const teachersController = require('../controllers/teachers');

const router = express.Router();

router.get('/getAll',teachersController.getTeachers);
router.post('/post',teachersController.postTeacher);
router.patch('/update/:id',teachersController.updateTeacher);
router.delete('/deleteAll',teachersController.deleteTeachers);

module.exports = router;