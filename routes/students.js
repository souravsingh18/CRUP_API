const express = require('express');

const {
    getStudents,
    getCounts,
    getStudentDetails,
    postStudentData,
    updateStudent,
    deleteAll,
    deleteOne
} = require('../controllers/students');

const router = express.Router();

router.get('/getAll',getStudents);
router.get('/getCounts',getCounts);
router.get('/getDetails/:id',getStudentDetails);
router.post('/post',postStudentData);
router.patch('/update/:id',updateStudent);
router.delete('/deleteAll',deleteAll);
router.delete('/deleteOne/:id',deleteOne);

module.exports = router;
