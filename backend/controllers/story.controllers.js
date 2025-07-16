import uploadOnCloudinary from "../config/cloudinary.js";
import Story from "../models/story.model.js";
import User from "../models/user.model.js"

export const uploadStory=async(req,res)=>{
    try{
        const user=await User.findById(req.userId);
        if(user.story){
            await Story.findByIdAndDelete(user.story);
            user.story=null
        }

        const {mediaType}=req.body

        let media;
        if(req.file){
            media=await uploadOnCloudinary(req.file.path)
        }else{
            res.status(400).json({message:"Media file is required"});
        }
        
        const story=await Story.create({media,mediaType,author:req.userId});
        user.story=story._id;
        await user.save();
        const populatedStory=await Story.findById(story._id).populate("author","name userName profileImage")
        .populate("viewers","name userName profileImage")
        return res.status(201).json(populatedStory);


    }catch(error){
        res.status(500).json({message:`Error uploading story: ${error}`});
    }
}


export const viewStory=async(req,res)=>{
    try{
        const storyId=req.params.storyId;

        const story=await Story.findById(storyId)
        if(!story){
            return res.status(404).json({message:"Story not found"});
        }

        const viewersIds=story.viewers.map(id=>id.toString())

        if(!viewersIds.includes(req.userId.toString())){
            story.viewers.push(req.userId);
            await story.save();
           
        }
         const populatedStory=await Story.findById(story._id).populate("author","name userName profileImage")
        .populate("viewers","name userName profileImage")
        return res.status(200).json(populatedStory);

    }catch(error){
        res.status(500).json({message:`story view error: ${error}`});
    }
}


export const getStoryByUserName=async(req,res)=>{
    try{
        const userName=req.params.userName
        const user=await User.findOne({userName})
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const story=await Story.findOne({
            author:user._id
        }).populate("viewers author")

        return res.status(200).json(story)
    }catch(error){
        res.status(500).json({message:`story get by userName error: ${error}`});
    }
}