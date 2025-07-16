import uploadOnCloudinary from "../config/cloudinary.js";

import User from "../models/user.model.js";

export const getCurrentUser=async(req,res)=>{
    try{
        // console.log("get current user called at backend");
        const userId=req.userId;
        const user=await User.findById(userId).populate("posts")
        // console.log("hsdjfsdf",user)
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({message:`Get current user error ${error}`});
    }
}

export const suggestedUsers=async(req,res)=>{
    try{
        const users=await User.find({_id:{$ne:req.userId}}).select("-password")
        return res.status(200).json(users);
    }catch(error){
               return res.status(500).json({message:`Get suggested user error ${error}`});
    }
}


export const editProfile=async(req,res)=>{
    try{
        const {name,userName,bio,profession,gender}=req.body;
        console.log("kjdshkjfhjkdhgjdhjfkggf",req.body);
        const user=await User.findById(req.userId).select("-password");
        console.log("Uhsgdhf",user)

        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        const sameUserWithUserName=await User.findOne({userName}).select("-password");

        if(sameUserWithUserName && sameUserWithUserName._id!=req.userId){
            return res.status(400).json({message:"Username already exists"});
        }

        let profileImage;
        if(req.file){
            profileImage=await uploadOnCloudinary(req.file.path)
        }
        console.log("profileImage",profileImage)

        user.name=name
        user.userName=userName
        user.bio=bio
        user.profession=profession
        if(profileImage){
            user.profileImage=profileImage
        }
        
        user.gender=gender
        console.log("Gender",user.gender)
//         console.log("req.userId", req.userId);
// console.log("User before save", user);
// console.log("profileImage", profileImage);
        await user.save()
        console.log("user",user)
        
        return res.status(200).json({message:"Profile updated successfully",user});
    }catch(error){
         return res.status(500).json({message:`Edit Profile error ${error}`});
    }
}


export const getProfile=async(req,res)=>{
    try{
        const userName=req.params.userName
        const user=await User.findOne({userName}).select("-password")
        if(!user){
            return res.status(400).json({message:"User not found"});
        } 
        
        return res.status(200).json(user);
    }catch(error){
        return res.status(500).json({message:`Get Profile error ${error}`});
    }
}