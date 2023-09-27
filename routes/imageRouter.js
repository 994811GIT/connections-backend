require("dotenv").config()
const express = require("express")
const multer = require("multer")
const { s3Uploadv3 } = require("../s3Service")
const uuid = require("uuid").v5

const router = express.Router()

// const storage = multer.diskStorage(
//     {
//         destination : (req,file,cb)=>{
//             cb(null , "public/uploads")
//         },
//         filename : (req,file,cb)=>{
//             let name = file.originalname.split(".")[0]
//             let extention = file.mimetype.split("/")[1]
//             cb(null, `${name}.${extention}`)
//         }
//     }
// )

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === "image") {
      cb(null, true);
    } else {
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
  };

  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1000000000, files: 2 },
  });

// router.post('/upload',upload.single("file"),(req,res)=>{
//     const imgUrl = `http://localhost:3000/uploads/${req.file.filename}`
//     res.status(200).send({url : imgUrl})
// })

router.post("/upload", upload.array("file"), async (req, res) => {
    try {
      const results = await s3Uploadv3(req.files);
      res.status(200).send({url : results.map((key)=>key.Location)})
    } catch (err) {
      console.log(err);
    }
  });

  router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "file is too large",
        });
      }
  
      if (error.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({
          message: "File limit reached",
        });
      }
  
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          message: "File must be an image",
        });
      }
    }
  });
  
  

module.exports = router