const express = require('express');
const mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
const multer = require('multer');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const adminSchema = require("../schemas/adminSchema");
const Admin = new mongoose.model("Admin", adminSchema); //singular name model

/************************ this is for later use of image handling
const UPLOADS_FOLDER = "./routeHandlers/uploads";
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
    fileSize: 1000000, // 1MB
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
router.get("/", (req, res) => {
  Admin.find({}, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
          res.render('imagesPage', { items: items });
      }
  });
});
router.post("/", upload.single("photo"), async (req, res) => {
  let newAdmin = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    photo: {
      data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: 'image/png'
    }
  };
  Admin.create(newAdmin, (err, item) => {
    if (err) {
        console.log(err);
    }
    else {
        
        res.send("successfully inserted into database");
    }
});
});

********************* */



router.get("/login", (req,res)=>{
  res.send("show admin login panel");
});

// LOGIN
router.post("/login", /*validation middleware goes here*/ async(req, res) => {
    
      const admin = await Admin.find({ email: req.body.email });
      if(admin.length > 0) {
          const isValidPassword = await bcrypt.compare(req.body.password, admin[0].password);
          if(isValidPassword) {
              // generate token
              const token = jwt.sign({
                  username: admin[0].email,
                  userId: admin[0]._id,
              }, process.env.JWT_SECRET, {
                  expiresIn: '1h'
              });

              res.status(200).json({
                  "access_token": token,
                  "message": "Login successful!"
              });
          } else {
              res.send("error 1");
          }
      } else {
          res.send("error 2");
      }
});

module.exports = router;