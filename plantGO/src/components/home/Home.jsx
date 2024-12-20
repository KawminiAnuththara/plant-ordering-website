import { UserButton } from '@clerk/clerk-react';
import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { StoreContext } from '../../context/StoreContext';

const Home = () => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const {getTotalCartAmount}=useContext(StoreContext);
  // Function to handle navigation to cart page
  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <div className='homebar'>
      <Link to='/home'><img src={assets.logo} alt='' className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/home' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Plant Catalog</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-App</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon" onClick={goToCart}> {/* Use onClick event to handle navigation */}
          <img src={assets.basket_icon} alt="Basket Icon" />
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Home;
