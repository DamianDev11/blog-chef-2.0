import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sidebar.css";
import { Link } from "react-router-dom";


const Sidebar = () => {
  const [cats,setCat] = useState([])

  useEffect(()=>{
    const getCats = async ()=>{
      const res = await axios.get("/api/categories")
      setCat(res.data)
    }
    getCats()
  },[])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">About me</span>
        <img
          src="https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1918&q=80"
          alt="nature"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error minus
          officiis aperiam iste cumque perferendis. Consectetur quos a corporis
          tempore!
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
        {cats.map((cat)=>(
          <Link to={`/?cat=${cat.name}`} className="link">
          <li className="sidebarListItem">{cat.name}</li>
          </Link>

        ))}
          
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Follow Us</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-x-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
