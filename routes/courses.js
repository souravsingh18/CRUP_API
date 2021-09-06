const express = require('express');

const coursesController = require('../controllers/courses');

const router = express.Router();

router.get('/getCourses',coursesController.getAll);

module.exports = router;