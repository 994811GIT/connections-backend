const express = require("express")
const Post = require('../db/model/postModel')
const router = express.Router()

router.use(express.json())

router.post('/post',async (req,res)=>{
    try{
        const post = new Post({...req.body})
        post.save()
        res.status(201).send(req.body);
    }catch(e){
        res.status(404).send({error : e})
    }
})

router.get('/post/:id',async(req,res)=>{
    try {
        const post = await Post.find({ user : req.params.id}).sort( { createdAt : -1})
        res.status(200).send(post)
    } catch (e) {
        console.log(req.body)
        res.status(404).send({ error: e })
    }
})
router.get('/post',async(req,res)=>{
    try{
        const post = await Post.find().populate("user").sort( { createdAt : -1})
        res.status(201).send(post)
    }catch(e){
        res.status(404).send( { error : e})
    }
})

module.exports = router;