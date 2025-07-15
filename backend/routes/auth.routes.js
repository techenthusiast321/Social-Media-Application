import express from 'express';
import { resetPassword, signIn, signOut, signUp,verifyOtp,sendOtp } from '../controllers/auth.controllers.js';

const authRouter=express.Router();


authRouter.post('/signup',signUp);
authRouter.post('/signin',signIn);
authRouter.post('/sendOtp',sendOtp)
authRouter.post('/verifyOtp',verifyOtp)
authRouter.post('/resetPassword',resetPassword)
authRouter.get('/signout',signOut)



export default authRouter;