const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = mongoose.Schema({
    name:{
        type: String
    },
    courseId: [{
        type: Schema.Types.ObjectId,
        ref: 'courses',
    }]
})

const Students = mongoose.model('Students',studentSchema);

module.exports = Students;
