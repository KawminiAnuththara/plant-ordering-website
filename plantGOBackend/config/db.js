import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://anuththarakawmini:123KDka@cluster0.pl5wj.mongodb.net/plant_orderingapp').then(()=>console.log("DB Connected"));
}