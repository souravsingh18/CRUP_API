const express = require("express");

const {
  getStudents,
  getCounts,
  getStudentDetails,
  postStudentData,
  updateStudent,
  deleteAll,
  deleteOne,
} = require("../controllers/students");

const router = express.Router();

//GETS
router.get("/getAll", getStudents);
router.get("/getCounts", getCounts);
router.get("/getDetails/:id", getStudentDetails);

//POSTS
router.post("/post", postStudentData);

//PATCH
router.patch("/update/:id", updateStudent);

//DELETE
router.delete("/deleteAll", deleteAll);
router.delete("/deleteOne/:id", deleteOne);

module.exports = router;
