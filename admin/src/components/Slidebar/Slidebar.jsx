import React from 'react'
import './Slidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Slidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
         <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon_white} alt='' className='sidebar-img'/>
          <p>Add Items</p>
         </NavLink>
         <NavLink to='list' className="sidebar-option">
          <img src={assets.packages} alt='' className='sidebar-img'/>
          <p>List Items</p>
         </NavLink>
         <NavLink to='/orders' className="sidebar-option">
          <img src={assets.packages} alt='' className='sidebar-img'/>
          <p>Orders</p>
         </NavLink>
      </div>
    </div>
  )
}

export default Slidebar
