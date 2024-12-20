import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";  // Assuming you have a database connection setup
import plantRouter from "./routes/plantRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";  // Ensure this is imported

// App Config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use("/api/plant", plantRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);  // This will handle the order-related routes

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
