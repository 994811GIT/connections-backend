const express = require("express")

const router = express.Router();

const userRouter = require("./userRoutes")
const postRouter = require("./postRoutes")
const imageRouter = require("./imageRouter")

router.use(userRouter, postRouter, imageRouter)

module.exports = router;