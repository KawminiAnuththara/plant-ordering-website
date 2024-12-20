import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Categories</h1>
      <p className='explore-menu-text'>
        Explore our plant categories to find the perfect greenery for your space. From lush indoor plants to hardy outdoor varieties, our app makes it easy to order and care for your favorite plants. Discover your new favorite plant today with plantGO!
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className={`explore-menu-list-item ${category === item.menu_name ? 'active' : ''}`}
            onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={category === item.menu_name ? 'selected-image' : ''}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
