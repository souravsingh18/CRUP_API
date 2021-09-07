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
    const {id} = req.parmas;
    try{
        const result = await Courses.findOneAndUpdate({_id: id},req.body,{new: true});
        res.status(200).json({
            result
        })
    }catch(err){
        console.log(err);
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