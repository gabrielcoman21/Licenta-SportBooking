const { response } = require("express");
const express=require("express");
const { findOne, findOneAndUpdate } = require("../models/booking");
const router = express.Router();
const Booking=require("../models/booking")
const SportField=require('../models/sportfield')

router.get("/getallsportfields", async(req,res)=>{

    try {
        const sportfields=await SportField.find({})
        res.send(sportfields)
    } catch (error) {
        return res.status(400).json({message: error });      
    }
});


router.post("/getsportfieldbyid", async(req,res)=>{

    const sportfieldid = req.body.sportfieldid

    try {
        const sportfield = await SportField.findOne({_id: sportfieldid})
        res.send(sportfield)
    } catch (error) {
        return res.status(400).json({message: error });      
    }


});


router.post('/addsportfield', async(req,res)=>{
    try {
        const newsportfield= new SportField(req.body)
        await newsportfield.save()
        res.send('New Sportfield Added Successfuly!')
    } catch (error) {
        return res.status(400).json({error});
    }
});


router.post('/reviewsportfield', async(req,res)=>{


    const {value,sportfieldid}=req.body;
   
    
    try{
        const sportfield =await SportField.findOne({_id: sportfieldid});
        const updatedrewies=sportfield.reviews.push(value)
        await SportField.findOneAndUpdate({_id : sportfieldid},{...sportfield,reviews: updatedrewies})
        res.send('Review updated successfully!')
    }catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }

});

module.exports=router;

