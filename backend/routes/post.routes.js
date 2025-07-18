import express from 'express';
import isAuth from '../middlewares/isAuth.js';

import { upload } from '../middlewares/multer.js';
import { comment, getAllPosts, like, saved, uploadPost } from '../controllers/post.controllers.js';

const postRouter=express.Router();



postRouter.post('/upload',isAuth,upload.single("media"),uploadPost)
postRouter.get("/getAll",isAuth,getAllPosts);
postRouter.get('/like/:postId',isAuth,like)
postRouter.post("/comment/:postId",isAuth,comment);   
postRouter.get("/saved/:postId",isAuth,saved);  



export default postRouter;