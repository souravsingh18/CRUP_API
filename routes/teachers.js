const express = require('express');

const teachersController = require('../controllers/teachers');

const router = express.Router();

router.get('/getTeachers',teachersController.teachers);

module.exports = router;