const Courses = require('../models/courses');

exports.getAll = (req,res)=>{
    const result = Courses.find();
    res.status(200).json({
        msg: "getCourses"
    })
}

exports.postCourse = (req,res)=>{
    const result = Courses.create(req.body)

    res.status(200).json({
        data: result
    })
}
