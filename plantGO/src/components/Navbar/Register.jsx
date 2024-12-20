import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css';


const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButtonClick = () => {
    navigate('/sign'); // Navigate to the Sign page
  };

  return (
    <div className='navbar'>
      <div className="navbar-ri">
        <div><p className="textdec">plantGO</p></div>
        <div><p className="description">Discover the joy of greenery with plantGO, your go-to app for ordering fresh, vibrant plants delivered right to your door.</p></div>
        <div className="button-container">
          <button className="get-started-button" onClick={handleButtonClick}>
            Let's Get Started
          </button>
        </div>
      </div>
    
    </div>
  );
}

export default Navbar;
