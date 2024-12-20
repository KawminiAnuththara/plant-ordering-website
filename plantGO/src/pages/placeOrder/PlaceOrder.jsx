import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, plant_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51Q050IP6eoox2wAhPyekiEIql7kFGPGX8FceaSZVnhzabBUSGGoDq2MDwYHvKr7FlRIOhM43UCxWlFE4dVOQ7CYx00muW4w2y8");

    // Create the order items
    const orderItems = plant_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        id: item._id,
        name: item.name,
        quantity: cartItems[item._id],
        price: item.price
      }));

    // Call the backend to create a Stripe checkout session
    try {
      const response = await axios.post(
        `${url}/api/checkout-session`,
        {
          address: data,
          items: orderItems,
          amount: getTotalCartAmount() + 2
        },
        { headers: { token } }
      );

      if (response.data.sessionId) {
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
        
        if (result.error) {
          alert(`Payment error: ${result.error.message}`);
        }
      } else {
        alert("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      if (error.response) {
        // Server responded with an error
        alert(`Payment failed: ${error.response.data}`);
      } else {
        // Network error or request was blocked
        alert("Network error. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>RS {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>RS {getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>RS {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="button" onClick={makePayment}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
