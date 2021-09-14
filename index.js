const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");
env.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const { studentsRoutes, teachersRoutes, coursesRoutes } = require("./routes");

app.use("/students", studentsRoutes);
app.use("/courses", coursesRoutes);
app.use("/teachers", teachersRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Home route",
  });
});

mongoose.connect(process.env.DB);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("server is runnning on PORT " + PORT);
});
