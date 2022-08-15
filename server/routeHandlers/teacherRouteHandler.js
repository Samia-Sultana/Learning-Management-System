const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const teacherSchema = require("../schemas/teacherSchema");
const Teacher = new mongoose.model("Teacher", teacherSchema); //singular name model

router.post("/", (req, res) => {
  const newTeacher = new Teacher(req.body);
  newTeacher.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully!",
      });
    }
  });
});

module.exports = router;
