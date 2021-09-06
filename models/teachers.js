const mongoose = require('mongoose');
// const students = require('../models/students');
const Schema = mongoose.Schema;

const teachersSchema = mongoose.Schema({
    name:{
        type: String
    },
    courseId: [{ 
            type: Schema.Types.ObjectId,
            ref: 'students' 
    }]

})

const Teachers = mongoose.model('Teachers',teachersSchema);

module.exports = Teachers;