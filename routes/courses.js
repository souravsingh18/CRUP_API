const express = require("express");

const {
  getAll,
  postCourse,
  updateCourse,
  deleteAll,
  deleteOne,
  getDetails,
  getCounts,
} = require("../controllers/courses");

const router = express.Router();
//GETS
router.get("/getAll", getAll);
router.get("/getCounts", getCounts);
router.get("/getDetails/:id", getDetails);

//POSTS
router.post("/post", postCourse);

//PATCH
router.patch("/update/:id", updateCourse);

//DELETE
router.delete("/deleteAll", deleteAll);
router.delete("/delete/:id", deleteOne);

module.exports = router;
