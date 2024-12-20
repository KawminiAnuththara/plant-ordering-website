import plantModel from "../models/plantModel.js";
import fs from 'fs'


//add plant item 

const addPlant = async (req,res) => {
     let image_filename=`${req.file.filename}`;

     const plant= new plantModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
     })

     try{
         await plant.save();
         res.json({success:true,message:"Plant Added"})
     }catch (error){
         console.log(error)
         res.json({success:false,message:"Error"})
     }
}

// all plant list

const listPlant = async (req,res) => {
    try{
       const plants = await plantModel.find({});
       res.json({success:true , data:plants})
    }catch(error){
       console.log(error);
       res.json({success:false,message:"Error"})
    }
}

// remove plant item

const removePlant = async (req,res) => {
    try{
        //find the plant model using id
        const plant = await plantModel.findById(req.body.id);
        //delete image from the uploads folder
        fs.unlink(`uploads/${plant.image}`,()=>{})

        await plantModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Plant Removed"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addPlant,listPlant,removePlant}