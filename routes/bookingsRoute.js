const express = require("express");
const router=express.Router();
const Booking=require("../models/booking")
const moment=require("moment");
const Sportfield=require("../models/sportfield")
const stripe=require('stripe')('sk_test_51L4idhBpNvaK4t2YCIqD869xEQhLfzEXm29tMXP2x7YXqzAs6qUofNVdP6VbdSKPpn9jo6tpYqQ3sBAAaIIY5OiI00xDkkCxmr')
const { v4: uuidv4 } = require('uuid');

router.post("/booksportfield", async(req,res)=>{
    const{
        sportfield,
        userid,
        date,
        fromhour,
        tohour,
        totalamount, 
        totaltime,
        token}=req.body;

try {
    const customer = await stripe.customers.create({
        email: token.email,
        source : token.id
    })

    const payment = await stripe.charges.create({
      
        amount : totalamount * 100,
        customer: customer.id,
        currency: 'RON',
        receipt_email: token.email

        },{
            idempotencyKey:uuidv4()
        }
    )
    if(payment)
    {
    
            const newbooking=new Booking({
                sportfield: sportfield.name,
                sportfieldid: sportfield._id,
                userid,
                date,
                fromhour: moment(fromhour).format('HH-mm'),
                tohour: moment(tohour).format('HH-mm'),
                totalamount,
                totaltime,
                transactionId: '1234'
            })
    
            const booking=await newbooking.save()
    
            console.log(booking._id)
    
            
    
            const sportfieldtemp =await Sportfield.findOne({_id: sportfield._id});
            sportfieldtemp.currentbookings.push({
                bookingid: booking._id,
                date: date,
                fromhour: moment(fromhour).format('HH-mm'),
                tohour:moment(tohour).format('HH-mm'),
                userid: userid,
                status: booking.status
            });
    
        
    
            await sportfieldtemp.save()
    
        
    }
    res.send('Payment Successful! Your sportfield is booked.')


} catch (error) {
    return res.status(400).json({error});
}
    
});

router.post('/getbookingsbyuserid',async(req,res)=>{
    const userid=req.body.userid


    try {
        const bookings =await Booking.find({userid: userid})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({error})
        
    }
})


router.post('/cancelbooking', async(req,res)=>{
    const {bookingid,sportfieldid} =req.body
    try {
        const bookingitem = await Booking.findOne({_id: bookingid})
        bookingitem.status='cancelled'
        await bookingitem.save()
        const sportfield=await Sportfield.findOne({_id : sportfieldid})
        const bookings = sportfield.currentbookings
        const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)
        sportfield.currentbookings=temp
        await sportfield.save()
        res.send('Your booking cancelled successfully!')
    } catch (error) {
        return res.status(400).json({error});
    }
})

router.get('/getallbookings', async(req,res)=>{

    try {
        const bookings=await Booking.find()
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({error}); 
    }

})



module.exports=router