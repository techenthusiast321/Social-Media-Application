import express from  'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import loopRouter from './routes/loop.routes.js';
import storyRouter from './routes/story.routes.js';
import messageRouter from './routes/message.routes.js';
dotenv.config()
const app=express()

const port=process.env.PORT || 8000
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRouter);
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.use('/api/loop',loopRouter)
app.use('/api/story',storyRouter)
app.use('/api/message',messageRouter)

app.listen(port,()=>{
    connectDb()
    console.log('Server started')
    console.log("first", port)
})


