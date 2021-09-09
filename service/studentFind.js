const mongoose = require('mongoose');
const Students = require('../models/students');

const find = async (payload,id)=>{

    const filter = [
        {
            $match: {_id: mongoose.Types.ObjectId(id)} 
        },
        // {$group:{_id: "$courseId"}},
        {
            $lookup:{
                from: "courses",
                localField: "courseId",
                foreignField: "_id",
                as: "courseDetails"
            }
        },
        {
            $project:{
                StudentName: "$name",
                courses: "$courseDetails.name",
                teachers: "$courseDetails.teacherId"
            }
        },
        {
            $lookup:{
                from: "teachers",
                localField: "teachers",
                foreignField: "_id",
                as: "teacherDetails"
            }
        },
        {
            $project:{
                StudentName: "$StudentName",
                courses: "$courses",
                teachers: "$teacherDetails.teacher"
            }
        }
    ]
    // if(payload.body.gender) {
    //     filter['$match'] = {
    //         email : payload.body.email
    //     }
    // }

    return await Students.aggregate(filter);
}

module.exports = find;