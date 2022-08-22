const express = require('express');
const mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
const multer = require('multer');
const router = express.Router();
const bcrypt = require("bcrypt");
const studentSchema = require("../schemas/studentSchema");
const Student = new mongoose.model("Student", studentSchema); //singular name model
const courseSchema = require("../schemas/courseSchema");
const Course = new mongoose.model("Course", courseSchema);


//student image file handling
const UPLOADS_FOLDER = "./routeHandlers/uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

const upload = multer({
	storage: storage,
  limits: {
    fileSize: 5000000, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "photo") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) { cb(null, true);  } 
      else {
        cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
      }
    }
  }
});


// SIGNUP
router.post("/signup", /*validation midddleware of student data goes here*/ upload.single("photo"), async(req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newStudent = new Student({
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          password: hashedPassword,
          photo: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
          }
      });

      await newStudent.save();
      res.status(200).json({
          message: "student Signup was successful!",
      });
  }
  catch {
      res.status(500).json({
          message: "student Signup failed!",
      });
  }
});

router.post("/enroll/course", upload.single("photo"), async(req,res)=>{
  console.log(req.body);
  //ad course to student table
  await Course.updateOne({_id: ObjectId(req.body.course)},{
    $push:{
      students: ObjectId(req.body.student)
    }
  });
  //add student to course table
  await Student.updateOne({_id: ObjectId(req.body.student)},{
    $push:{
      courses: ObjectId(req.body.course)
    }
  });
  //add purshase info in purchase table
});
router.post("/update/profile", async(req,res)=>{

});

module.exports = router;
