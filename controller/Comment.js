const CommentSchema = require("../models/Comment")

exports.CreateComment = async (req,res)=>{
    try{
        const NewComment = new CommentSchema(req.body)
        await NewComment.save()
        res.status(201).json({comment:NewComment})
    }catch(err){
        res.status(500).json(err)
    }
}

exports.UpdateComment = async (req,res)=>{
    try{
        const Update = await CommentSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({Update})
    }catch(err){
        res.status(500).json(err)
    }
}

exports.DeleteComment = async (req,res)=>{
    try{
        await CommentSchema.findByIdAndDelete(req.params.id)
        res.status(200).json("Comment has been deleted!")
    }catch(err){
        res.status(500).json(err)
    }
}

exports.GetPost = async (req,res)=>{
    try{
        const getPost = await CommentSchema.find({postId:req.params.postId})
        res.status(200).json({post:getPost})
    }catch(err){
        res.status(500).json(err)
    }
}

