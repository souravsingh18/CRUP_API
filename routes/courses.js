const express = require('express');

const {getAll,postCourse,updateCourse,deleteAll,deleteOne,getDetails,getCounts} = require('../controllers/courses');

const router = express.Router();

router.get('/getAll',getAll);
router.get('/getCounts',getCounts);
router.get('/getDetails/:id',getDetails);
router.post('/post',postCourse);
router.patch('/update/:id',updateCourse);
router.delete('/deleteAll',deleteAll);
router.delete('/delete/:id',deleteOne);

module.exports = router;
