import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  // Validate request data
  if (!req.body.userId || !req.body.items || !req.body.amount || !req.body.address) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    // Create a new order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // Clear user's cart after placing the order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Prepare line items for Stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Convert price to smallest currency unit (paise)
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100, // Example delivery charge
      },
      quantity: 1,
    });

    // Create Stripe payment session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Return session URL to frontend
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || "Error occurred" });
  }
};

export { placeOrder };
