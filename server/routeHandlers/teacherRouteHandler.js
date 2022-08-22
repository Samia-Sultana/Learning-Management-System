const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ObjectId } = require('mongodb');
var fs = require('fs');
var path = require('path');
const multer = require('multer');
const teacherSchema = require("../schemas/teacherSchema");
const Teacher = new mongoose.model("Teacher", teacherSchema); //singular name model
const videoSchema = require("../schemas/videoSchema");
const Video = new mongoose.model("Video", videoSchema);
const courseSchema = require("../schemas/courseSchema");
const Course = new mongoose.model("Course", courseSchema);


/**************video handling using multer ********************** */

const UPLOADS_FOLDER = "./routeHandlers/uploads/videos";
// define the diskStorage->diskStorage has access over disk. to manipulate disk files
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

//file upload with multer-multer() returns a middleware to upload
const upload = multer({
	storage: storage,
  limits: {
    fileSize: 50000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "link") {
      if (file.mimetype === "video/mp4" || file.mimetype === "video/mkv") 
        { cb(null, true);  } 
      else {
        cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
      }
    }
  }
});


/*router.post("/", (req, res) => {
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
*/
router.post("/upload/video", upload.single("link"),async(req,res)=>{
  let newVideo = {
    title: req.body.title,
    link:  fs.readFileSync(path.join(__dirname + '/uploads/videos/' + req.file.filename)),
    publishDate: req.body.date,
    teacher: ObjectId(req.body.teacher),
    course: ObjectId(req.body.course)
      
  };
  Video.create(newVideo, async(err, item) => {
    if (err) {
        console.log(err);
    }
    else {
      //updating course table
      
      await Course.updateOne({_id: ObjectId(req.body.course)},{
        $push:{
          videos: item._id
        }
      });
      res.send("successfully inserted into database");
    }
    
});
});

module.exports = router;
