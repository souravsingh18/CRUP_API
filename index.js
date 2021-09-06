const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json())
const students = require('./routes/students');
const courses = require('./routes/courses');
const teachers = require('./routes/teachers');

app.use('/students',students);
app.use('/courses',courses);
app.use('/teachers',teachers);

app.get('/',(req,res)=>{
    res.status(200).json({
        msg:"welcome to crud_API"
    })
});

mongoose.connect("mongodb://127.0.0.1:27017/DB");

const PORT = 3000;

app.listen(PORT,()=>{
    console.log("server is runnning on PORT "+PORT);
});