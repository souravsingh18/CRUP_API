const express = require('express');

const {getAll,postCourse,updateCourse,deleteAll,deleteOne,getDetails} = require('../controllers/courses');

const router = express.Router();

router.get('/getAll',getAll);
router.get('/getDetails/:id',getDetails);
router.post('/post',postCourse);
router.patch('/update/:id',updateCourse);
router.delete('/deleteAll',deleteAll);
router.delete('/delete/:id',deleteOne);

module.exports = router;
