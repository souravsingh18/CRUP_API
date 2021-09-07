const Courses = require('../models/courses');

exports.getAll = async (req,res)=>{
    try{
        const result = await Courses.find();
        res.status(200).json({
            result
        })
    }catch(err){
        console.log(err);
    }
}

exports.postCourse = async (req,res)=>{
    try{
        const result = await Courses.create(req.body);
        res.status(200).json({
            result
        })
    }catch(err){
        console.log(err);
    }
}

exports.updateCourse = async (req,res)=>{
    const { id } = req.params
    try {
        const course = await Courses.findById(id);
        const tId = await Courses.findOne({
            _id: id,
            "teacherId": req.body.teacherId
        })
        if(tId) {
            res.status(200).json({
                msg: `teacher with ${tId._id} id is already teaching this course`
            });
        } else {
            course.teacherId = req.body.teacherId;
            const result = await Courses.findOneAndUpdate({_id:id},course,{new: true});
            res.status(200).json({
                result
        })
        }
    } catch (error) {
        res.status(500).json({
            error: "Internal server error --> updateCourse"
        });
    }
}

exports.deleteCourse = async (req,res)=>{
    try {
        console.log(req.body);
        await Courses.deleteMany()
    
        res.status(200).json({
            data: "All Courses are deleted successfully"
        })
    } catch (error) {
        console.log(error);
    }
}
