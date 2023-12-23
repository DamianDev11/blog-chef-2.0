import React from 'react'
import "./posts.css"
import Post from '../Post/Post'


const Posts = ({posts}) => {
  return (
    <div className='posts'>
    {posts.map((post)=>(
      <Post post={post} key={post._id}/>
    ))}
    </div>
  )
}

export default Posts