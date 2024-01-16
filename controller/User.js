const UserSchema = require("../models/User");

exports.UpdateUser = async (req,res)=>{
    try{
        const updateUser = await UserSchema.findByIdAndUpdate(req.params.id,req.body,{ new: true })
        if(!updateUser){
            return res.status(404).json({message:"User Not Found"})
        }
        res.status(201).json({message:"Success"})
    }catch(err){
        res.status(500).json(err)
    }
}

exports.DeleteUser = async (req,res)=>{
    try{
        const deleteUser = await UserSchema.findByIdAndDelete(req.params.id)
        if(deleteUser){
            res.status(200).json({ message: "User deleted successfully"});
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }catch(err){
        res.status(500).json(err)
    }
}

exports.GetUser = async (req,res)=>{
    try{
        const getUser = await UserSchema.findById(req.params.id)
            const {password,...info} = getUser._doc
            res.status(200).json({ info});
        
    }catch(err){
        res.status(500).json(err)
    }
}