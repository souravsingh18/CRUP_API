const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teachersSchema = mongoose.Schema({
    name:{
        type: String
    },
    courseId: [{ 
            type: Schema.Types.ObjectId,
            ref: 'courses' 
    }]

})

const Teachers = mongoose.model('Teachers',teachersSchema);

module.exports = Teachers;