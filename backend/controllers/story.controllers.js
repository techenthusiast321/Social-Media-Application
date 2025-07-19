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
    console.log("view story called in backend")
    try{
        const storyId=req.params.storyId;
        
        const story=await Story.findById(storyId)
        console.log("story in view story in backend",story)
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
        console.log("get story by userName called in backend")
        const userName=req.params.userName
        const user=await User.findOne({userName})
        
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const story=await Story.findOne({
            author:user._id
        }).populate("viewers author")
        console.log("story",story)
        return res.status(200).json(story)
    }catch(error){
        res.status(500).json({message:`story get by userName error: ${error}`});
    }
}

export const getAllStories=async(req,res)=>{
    try{
        const currentUser=await User.findById(req.userId);
        const followingIds=currentUser.following
        const stories=await Story.find({
            author:{$in:followingIds}
        }).populate("viewers author").sort({createdAt:-1});
        return res.status(200).json(stories);


        
    }catch(error){
        res.status(500).json({message:`All story get error: ${error}`});
    }

}