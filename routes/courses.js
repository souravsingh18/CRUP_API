const express = require('express');

const coursesController = require('../controllers/courses');

const router = express.Router();

router.get('/getAll',coursesController.getAll);
router.post('/post',coursesController.postCourse);
router.patch('/update/:id',coursesController.updateCourse);
router.delete('/deleteAll',coursesController.deleteCourse);



module.exports = router;