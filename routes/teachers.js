const express = require('express');

const {getTeachers,getTeacherDetails,postTeacher,updateTeacher,deleteTeachers,deleteOne} = require('../controllers/teachers')

const router = express.Router();

router.get('/getAll',getTeachers);
router.get('/getTeacherDetails/:id',getTeacherDetails);
router.post('/post',postTeacher);
router.patch('/update/:id',updateTeacher);
router.delete('/deleteAll',deleteTeachers);
router.delete('/delete/:id',deleteOne);


module.exports = router;