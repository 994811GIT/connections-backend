const express = require("express")
const multer = require("multer")

const router = express.Router()

const storage = multer.diskStorage(
    {
        destination : (req,file,cb)=>{
            cb(null , "public/uploads")
        },
        filename : (req,file,cb)=>{
            let name = file.originalname.split(".")[0]
            let extention = file.mimetype.split("/")[1]
            cb(null, `${name}.${extention}`)
        }
    }
)

const upload = multer({storage : storage})

router.post('/upload',upload.single("file"),(req,res)=>{
    const imgUrl = `http://localhost:3000/uploads/${req.file.filename}`
    res.status(200).send({url : imgUrl})
})

module.exports = router