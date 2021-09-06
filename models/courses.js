const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = mongoose.Schema({
    name:{
        type: String
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'teachers',
    },
    studentId: [{
        type: Schema.Types.ObjectId,
        ref: 'students',
    }]
})

const Courses = mongoose.model('Courses',courseSchema);

module.exports = Courses;