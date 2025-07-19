import React from 'react'
import { FaRegHeart } from 'react-icons/fa';
import logo from '../assets/logo.png';
import StoryDp from './StoryDp';
import { useSelector } from 'react-redux';
import Nav from './Nav';

import Post from './Post';

const Feed = () => {
    const {postData}=useSelector(state=>state.post)
    const {userData}=useSelector(state=>state.user)
    const {storyList={},currentUserStory}=useSelector(state=>state.story)
  return (

    <div className='lg:w-[50%] min-h-[100vh] bg-[black] w-full lg:h-[100vh] relative lg:overflow-y-auto'>
        <div className='w-full h-[100px] flex items-center justify-between p-[20px]
        lg:hidden'>
            <img src={logo} alt=''  className='w-[80px]'/>
            <div>
                <FaRegHeart className='text-white w-[25px] h-[25px]' />
            </div>
        </div>

        <div className='flex w-full overflow-auto gap-[20px] items-center p-[20px]'>
            <StoryDp userName={"Your Story"} ProfileImage={userData.profileImage} story={currentUserStory}/>

            {storyList?.map((story,index)=>(
                 <StoryDp userName={story.author.userName} ProfileImage={story.author.profileImage} story={story} key={index}/>
            ))}
        </div>

        <div className='w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]'>
            <Nav />
        
        

        {postData?.map((post,index)=>(
            <Post post={post} key={index}/>
        ))}
        </div>
    </div>

  )
}

export default Feed