import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
           <h1 className='logo'>plantGO</h1>
           <p>Welcome to plantGO, your ultimate destination for all things green! Discover a wide variety of plants tailored to brighten up any space, from lush indoor greenery to hardy outdoor varieties. Explore our collections today and bring nature closer to home with plantGO!</p>
           <div className="footer-social-icons">
             <img src={assets.facebook_icon} alt="" />
             <img src={assets.twitter_icon} alt="" />
             <img src={assets.linkedin_icon} alt="" />
           </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7893</li>
                <li>contact@plango.com</li>
            </ul>
        </div>
        
      </div>
      <hr/>
      <p className="footer-copyright">
        Copyright 2024@ plantGO.com - All Right Reserver
      </p>
    </div>
  )
}

export default Footer
