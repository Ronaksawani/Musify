import React from 'react'
import { AiFillHome } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { NavLink } from "react-router-dom";
import '../../App.css'
import pic from './logo.png'

const Sidebar = () => {
  return (
    <div className="side_bar">
    <div className="sb_1">
      <img src={pic} height={'150px'} width={'200px'}></img>
      <div className="side_bar_home_box">
        <NavLink className="sb_1_text" to={"/"} activeclassname="active">
          <AiFillHome size={20}/>
          <span>Home</span> 
           </NavLink>
        
      </div>
      <div className="side_bar_home_box">
      <NavLink className="sb_1_text" to={"/search"} activeclassname="active">
          <BiSearchAlt size={25}/>
          <span>Search</span> 
           </NavLink>
      </div>
      
    </div>
  </div>
  )
}

export default Sidebar
