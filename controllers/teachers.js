const Teachers = require('../models/teachers');

exports.getTeachers = async (req,res)=>{
    try{
        const result = await Teachers.find();
        res.status(200).json({
            data: result
        })
    }catch(err){
        console.log(err);
    }
}

exports.postTeacher = async (req,res)=>{
    try{
        const result = await Teachers.post(req.body);
        res.status(200).json({
            data: result
        })
    }catch(err){
        console.log(err);
    }
}

exports.updateTeacher = async (req,res)=>{
    const {id} = req.parmas;
    try{
        const result = await Teachers.findOneAndUpdate({_id: id},req.body,{new: true});
        res.status(200).json({
            data: result
        })
    }catch(err){
        console.log(err);
    }
}


exports.deleteTeachers = async (req,res)=>{
    try{
        await Teachers.deleteMany();
        res.status(200).json({
            msg:"successfully deleted"
        })
    }catch(err){
        console.log(err);
    }
}
