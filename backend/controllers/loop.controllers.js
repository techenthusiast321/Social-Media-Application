import Loop from "../models/loop.model.js";
import User from "../models/user.model.js";
import uploadOnCloudinary from '../config/cloudinary.js';
export const uploadLoop=async(req,res)=>{
    try{
        const {caption}=req.body;
        let media;
        if(req.file){
            media=await uploadOnCloudinary(req.file.path);
        }else{
            return res.status(400).json({message:"Media file is required"});
        }

        const loop=await Loop.create({
            caption,media,author:req.userId
        })
        const user=await User.findById(req.userId);
        user.loops.push(loop._id);
        await user.save();
        const populatedLoop=await Loop.findById(loop._id).populate("author","name userName profileImage")
        return res.status(201).json(populatedLoop);

    }catch(error){
        return res.status(500).json({message:`Error uploading loop: ${error}`});
    }
}




export const like=async(req,res)=>{
    try{
        const loopId=req.params.loopId
        const loop =await Loop.findById(loopId);
        if(!loop){
            return res.status(404).json({message:"Loop not found"});
        }

        const alreadyLiked=loop.likes.some(id=>id.toString()===req.userId.toString());
        if(alreadyLiked){
            loop.likes=loop.likes.filter(id=>id.toString()!==req.userId.toString())
        }

        else{
            loop.likes.push(req.userId)
        }

        await loop.save()

        await loop.populate("author","name userName profileImage")
        return res.status(200).json(loop);
    }catch(error){
          return res.status(500).json({message:`likeLoop error: ${error}`});
    }
}


export const comment=async(req,res)=>{
    try{
        const {message}=req.body;
        const loopId=req.params.loopId;
        const loop =await Loop.findById(loopId);
        if(!loop){
             return res.status(404).json({message:"Loop not found"});
        }

        loop.comments.push({
            author:req.userId,
            message
        })

        await loop.save()
        await loop.populate("author","name userName profileImage"),
        await loop.populate("comments.author") 
        
        return res.status(200).json(loop);
    }catch(error){
         return res.status(500).json({message:`Comments Loop Controller error: ${error}`});
    }
}


export const getAllLoops=async(req,res)=>{
    try{
        const loops=await Loop.find({}).populate("author","name userName profileImage").populate("comments.author") //Doubt h isme;
        return res.status(200).json(loops);
    }catch(error){
         return res.status(500).json({message:`get all loop error: ${error}`});
    }
}