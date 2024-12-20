import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from '../src/components/Navbar/Register'; 
import Sign from '../src/components/signin/Sign'; 
import Home from '../src/components/home/Home';
import HomeNew from './components/home/HomeNew/HomeNew';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Header from './components/Header/Header';
import ExploreMenu from './components/exploreMenu/ExploreMenu';
import FoodDisplay from './components/foodDisplay/FoodDisplay';
import Footer from './components/footer/Footer';
import AppDownload from './components/appDownload/AppDownload';

function App() {
  const [category, setCategory] = useState("All");

  return (
    <Router>
      <div style={{ width: '100%', margin: '0 auto' }}>
        {/* Routes definition */}
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                {/* Render Register page without Header and Footer */}
                <Register />
              </>
            } 
          />
          <Route path="/sign" element={<Sign />} />
          
          <Route 
            path="/home" 
            element={
              <>
                {/* Render Home without Header and Footer */}
                <Home />
  
                <Header />
                <ExploreMenu category={category} setCategory={setCategory} />
                <FoodDisplay category={category} />
                <AppDownload />
                
              </>
            }
          />
          
          <Route 
            path="/Cart" 
            element={
              <>
                <Home/>
                <Cart />
                <Footer/>
              </>
            }
          />
          <Route 
            path="/order" 
            element={
              <>
                <Home/>
                <PlaceOrder />
                <Footer/>
              </>
            }
          />
          
        </Routes>
      </div>

      {/* Only render Footer on specific pages */}
      <Routes>
        <Route path="/home" element={<Footer />} />
        <Route path="/HomeNew" element={<Footer />} />
        <Route path="/PlaceOrder" element={<Footer />} />
      </Routes>
    </Router>
  );
}

export default App;
