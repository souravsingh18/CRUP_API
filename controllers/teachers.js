const Teachers = require('../models/teachers');

exports.teachers = (req,res)=>{
    res.status(200).json({
        msg: "getTeachers"
    })
}
