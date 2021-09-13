const mongoose  = require('mongoose');
const {Teachers} = require('../models/index');

exports.getTeachers = async (req,res)=>{
    try{
        const result = await Teachers.find();
        if(result.length) {
            res.status(200).json({
                data: result || {}
            })
        } else {
            res.status(500).json({
                msg: "data not found"
            })
        }

    }catch(err){
        console.log(err);
    }
}

exports.getTeacherDetails = async (req,res)=>{
    const {id} = req.params;
    console.log(id,mongoose.Types.ObjectId(id));
    try{
        const result = await Teachers.aggregate([
            {$match: {
                _id: mongoose.Types.ObjectId(id)

            }}
        ]);
        if(result.length) {
            res.status(200).json({
                data: result || {}
            })
        } else {
            res.status(500).json({
                msg: "data not found"
            })
        }

    }catch(err){
        console.log(err);
    }
}

exports.getCounts = async (req,res)=>{
    try{
        const result = await Teachers.aggregate([
            {
                $count: "totalTeachers"
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

exports.postTeacher = async (req,res)=>{
    try{
        const result = await Teachers.create(req.body);
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
            msg:"successfully deletion"
        })
    }catch(err){
        console.log(err);
    }
}

exports.deleteOne = async (req,res)=>{
    const {id} = req.params;
    try{
        await Teachers.deleteOne({_id: id});
        res.status(200).json({
            msg: `Id ${id} has been deleted successfully`
        })
    }catch(err){
        console.log(err);
    }
}
