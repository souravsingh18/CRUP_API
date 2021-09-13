const {Students,Courses} = require('../models/index');
const find = require('../service/studentFind');

const mongoose = require('mongoose');

exports.getStudents = async (req,res)=>{
    try{
        const result = await Students.find()

        res.status(200).json({
            result
        })
    }catch(err){
        res.status(500).json({
            error: "Internal server error"
        });
        console.log(err.message);
    }
}

exports.getStudentDetails = async (req,res)=>{
    const {id} = req.params;
    try{
        const studentDetails = find(req.body,id);
        // const studentDetails = await Students.aggregate([
        //     {
        //         $match: {_id: mongoose.Types.ObjectId(id)} 
        //     },
        //     // {$group:{_id: "$courseId"}},
        //     {
        //         $lookup:{
        //             from: "courses",

        //             localField: "courseId",
        //             foreignField: "_id",
        //             as: "courseDetails"
        //         }
        //     },
        //     {
        //         $project:{
        //             StudentName: "$name",
        //             courses: "$courseDetails.name",
        //             teachers: "$courseDetails.teacherId"
        //         }
        //     },
        //     {
        //         $lookup:{
        //             from: "teachers",
        //             localField: "teachers",
        //             foreignField: "_id",
        //             as: "teacherDetails"
        //         }
        //     },
        //     {
        //         $project:{
        //             StudentName: "$StudentName",
        //             courses: "$courses",
        //             teachers: "$teacherDetails.teacher"
        //         }
        //     }
        // ])
        res.status(200).json({
            studentDetails
        })
    }catch(err){
        res.status(500).json({
            error: "Internal server error"
        });
        console.log(err.message);
    }
}

exports.getCounts = async (req,res)=>{
    try{
        const result = await Students.aggregate([
            {
                $count: "totalStudents"
            }
        ])
        res.status(200).json({
            result
        })
    }
    catch(err){
        res.status(200).json({
            Error: "Internal server error"
        })
    }
}

exports.postStudentData = async (req,res)=>{
    //email and password(Authentication) are not implemented yet
    try {
        console.log(req.body);
        const result = await Students.create(req.body)
    
        res.status(200).json({
            result
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });
        console.log(error.message);
    }
}

exports.updateStudent = async (req,res)=>{
    const { id } = req.params
    try {
        const student = await Students.findById(id);
        const course = await Courses.findById(req.body.courseId)

        const cId = await Students.findOne({
            _id: id,
            "courseId": req.body.courseId
        })
        if(cId) {
            res.status(200).json({
                msg: "you already enrolled for this course"
            });
        } else {
            student.courseId.push(req.body.courseId);
            const result = await Students.findOneAndUpdate({_id:id},student,{new: true});

            course.studentId.push(student._id); 
            await Courses.findOneAndUpdate({_id:req.body.courseId},course,{new: true});

            res.status(200).json({
                result
        })
        }
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });
        console.log(error.message);
    }
}

exports.deleteAll = async (req,res)=>{
    try {
        await Students.deleteMany()
    
        res.status(200).json({
            msg: "All Students are deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });
        console.log(error.message);
    }
}

exports.deleteOne = async (req,res)=>{
    const {id} = req.params;
    try {
        await Students.deleteOne({_id: id})
    
        res.status(200).json({
            msg: `Student Id ${id} deleted successfully`
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });
        console.log(error.message);
    }
}
