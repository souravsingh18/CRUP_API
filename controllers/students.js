const Students = require('../models/students');

exports.getStudents = async (req,res)=>{
    try{
        const result = await Students.find();
        res.status(200).json({
            result
        })
    }catch(err){
        console.log(err);
    }
}

exports.postStudentData = async (req,res)=>{
    try {
        console.log(req.body);
        const result = await Students.create(req.body)
    
        res.status(200).json({
            data: result
        })
    } catch (error) {
        console.log(error);
    }
}

// exports.deleteStudent = async (req,res)=>{
//     try {
//         console.log(req.body);
//         const result = await Students.deleteOne({_id:})
    
//         res.status(200).json({
//             data: result
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// exports.postStudentData = async (req,res)=>{
//     try {
//         console.log(req.body);
//         const result = await Students.create(req.body)
    
//         res.status(200).json({
//             data: result
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
