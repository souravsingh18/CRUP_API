const { Students, Courses } = require("../models/index");
const find = require("../service/studentFind");
var ObjectId = require("mongodb").ObjectID;

const mongoose = require("mongoose");
const { findOne } = require("../models/students");

exports.getStudents = async (req, res) => {
  try {
    const result = await Students.find();

    res.status(200).json({
      result,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log(err.message);
  }
};

exports.getStudentDetails = async (req, res) => {
  const { id } = req.params;
  try {
    // const studentDetails = find(req.body,id);
    const studentDetails = await Students.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      // {$group:{_id: "$courseId"}},
      {
        $lookup: {
          from: "courses",

          localField: "courseId",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      {
        $project: {
          StudentName: "$name",
          courses: "$courseDetails.name",
          teachers: "$courseDetails.teacherId",
        },
      },
      {
        $lookup: {
          from: "teachers",
          localField: "teachers",
          foreignField: "_id",
          as: "teacherDetails",
        },
      },
      {
        $project: {
          StudentName: "$StudentName",
          courses: "$courses",
          teachers: "$teacherDetails.teacher",
        },
      },
    ]);
    res.status(200).json({
      studentDetails,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log(err.message);
  }
};

exports.getCounts = async (req, res) => {
  try {
    const result = await Students.aggregate([
      {
        $count: "totalStudents",
      },
    ]);
    res.status(200).json({
      result,
    });
  } catch (err) {
    res.status(200).json({
      Error: "Internal server error",
    });
  }
};

exports.postStudentData = async (req, res) => {
  //email and password(Authentication) are not implemented yet
  try {
    const result = await Students.create(req.body);

    if (result.courseId.length > 0) {
      result.courseId.forEach(async (el) => {
        const course = await Courses.findById(el);

        course.studentId.push(result._id);
        await Courses.findOneAndUpdate({ _id: el }, course, { new: true });
      });
    }

    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log(error.message);
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Students.findById(id);
    let result;
    if (req.body.courseId) {
      student.courseId.forEach(async (cid) => {
        req.body.courseId.forEach(async (cnid) => {
          if (cid === cnid) {
            res.status(200).json({
              msg: `student with Id ${cnid} has already enrolled`,
            });
          } else {
            student.courseId.push(cnid);
            result = await Students.findOneAndUpdate({ _id: id }, student, {
              new: true,
            });

            const course = await Courses.findById(cnid);
            course.studentId.push(id);
            await Courses.findByIdAndUpdate({
              _id: id,
            });
          }
        });
      });
    }

    result = await Students.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log(error.message);
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await Students.deleteMany();

    res.status(200).json({
      msg: "All Students are deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log(error.message);
  }
};

exports.deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Students.findById(id);
    student.courseId.forEach(async (cid) => {
      const course = await Courses.findById(cid);
      const updatedCourse = course.studentId.filter(
        (stid) => stid.toString() !== id
      );
      console.log({ ...course, studentId: updatedCourse });

      //course is returing bunch of unnecessary data
      await Courses.findByIdAndUpdate(
        { _id: cid },
        { studentId: updatedCourse },
        {
          new: true,
        }
      );
    });
    await Students.deleteOne({ _id: id });

    res.status(200).json({
      msg: `Student with Id ${id} has been deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
    console.log(error);
  }
};
