const { Courses, Students } = require("../models/index");

const mongoose = require("mongoose");

exports.getAll = async (req, res) => {
  try {
    const result = await Courses.find();
    res.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Courses.aggregate([
      {
        $match: {
          // In aggregation pipeline we use objectId, string id does not work here
          _id: mongoose.Types.ObjectId(id),
        },
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

exports.getCounts = async (req, res) => {
  try {
    const result = await Courses.aggregate([
      {
        $count: "totalCourses",
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

exports.postCourse = async (req, res) => {
  try {
    const result = await Courses.create(req.body);
    res.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teachers.findById(req.body.teacherId);
    const course = await Courses.findById(id);
    const tId = await Courses.findOne({
      _id: id,
      teacherId: req.body.teacherId,
    });
    if (tId) {
      res.status(200).json({
        msg: `teacher with Id ${tId._id} already teaching this course`,
      });
    } else {
      course.teacherId = req.body.teacherId;
      const result = await Courses.findOneAndUpdate({ _id: id }, course, {
        new: true,
      });

      teacher.courseId.push(course._id);
      // {...teacher,[...teacher.courseId,course._id]}
      await Teachers.findOneAndUpdate({ _id: req.body.teacherId }, teachers, {
        new: true,
      });
      res.status(200).json({
        result,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    console.log(req.body);
    await Courses.deleteMany();

    res.status(200).json({
      data: "All Courses are deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    // const student = await Courses.findOne(_id: courseId);
    await Courses.deleteOne({ _id: id });

    res.status(200).json({
      data: `${id} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
  }
};
