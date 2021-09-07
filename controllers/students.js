const Students = require('../models/students');

exports.getStudents = async (req,res)=>{
    try{
        const result = await Students.find()
        // const result = await Students.aggregate([
        //     {
        //         $unwind: "$courseId"
        //     },
        //     // {$group:{_id: "$courseId"}},

        // ])
        res.status(200).json({
            result
        })
    }catch(err){
        res.status(500).json({
            error: err
        });
    }
}

exports.postStudentData = async (req,res)=>{
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
    }
}

exports.updateStudent = async (req,res)=>{
    const { id } = req.params
    try {
        const student = await Students.findOne({
            _id: id,
            "courseId": req.body.courseId
        })
        console.log(student);
        if(student) {
            res.status(200).json({
                msg: "you already enrolled for this course"
            });
        } else {
            //student does not exist 
            console.log("updateone");
            student.courseId.push(req.body.courseId);
            const result = await Students.findOneAndUpdate({_id:id},student,{new: true});
            res.status(200).json({
                result
        })
        }
    } catch (error) {
        res.status(500).json({
            error: "Internal server error update"
        });
    }
}

exports.deleteStudent = async (req,res)=>{
    try {
        console.log(req.body);
        await Students.deleteMany()
    
        res.status(200).json({
            data: "All Students are deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        });
    }
}

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
