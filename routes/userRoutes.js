const express = require("express")
const User = require("../db/model/userModel")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

router.use(express.json())

router.get('/user', async (req, res) => {
    res.send("Hi user")
})
router.get('/welcome', async (req, res) => {
    res.send("Social media")
})
router.post('/signup', async (req, res) => {
    try {
        const userData = { ...req.body }
        if (userData.password != userData.confirmPassword) {
            return res.status(401).send({ error: "Password doesn't match" })
        }
        const saltRounds = 2
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds)
        const user = new User({ ...req.body, password: hashedPassword });
        await user.save()
        return res.status(201).send(`New user create succesfuly. Here is the details of the user ${user}`);
    } catch (e) {
        return res.status(404).send({ error: e })
    }
}
)
router.post('/login', async (req, res) => {
    try {
        const { username, password } = { ...req.body }
        const user = await User.findOne({ username: username })
        if (!user) {
            res.status(401).send({ message: "User not found" })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(401).send({ message: "Username or password does not match" })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY)
        console.log(user)
        return res.status(200).send({ message: " in succesfulyLogged", userData: user, token: token, userId: user._id })
    } catch (e) {
        res.status(404).send({ error: e, message: "Cannot login" })
    }
})

router.patch('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
        res.status(200).send(user)
    } catch (e) {
        res.status(404).send({ error: e })
    }
})
router.post('/user/unfollow/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (user.followers) {
            const followers = user.followers.filter(item => item != req.body.currentUser)
            user.followers = followers
            user.save()
        }
        const loggedUser = await User.findOne({ _id: req.body.currentUser })
        if (loggedUser.following) {
            const following = loggedUser.following.filter(item => item != req.params.id)
            loggedUser.following = following
            loggedUser.save()
        }
        res.status(200).send(user)
    } catch (e) {
        console.log(e)
    }
})

router.post('/user/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        const loggedUser = await User.findOne({ _id: req.body.currentUser })
        if (user.followers) {
            user.followers.push(req.body.currentUser)
            user.save()
        } else {
            const user = await User.followers({ followers: [req.body.currentUser] })
            user.save()
        }
        loggedUser.following.push(req.params.id)
        loggedUser.save()

        res.status(200).send(user)
    } catch (e) {
        res.status(404).send({ message: "error occuring", error: e })
    }
})

router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        res.status(200).send(user)
    } catch (e) {
        res.status(404).send({ error: e })
    }
})

module.exports = router;