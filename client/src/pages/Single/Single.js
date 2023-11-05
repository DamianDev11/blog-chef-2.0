import "./single.css"
import Sidebar from "../../components/Sidebar/Sidebar"
import React from 'react'
import SinglePost from "../../components/SInglePost/SinglePost"

const Single = () => {
  return (
    <div className="single">
    <SinglePost/>
    <Sidebar/>
    </div>
  )
}

export default Single