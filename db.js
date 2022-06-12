const mongoose=require("mongoose");

var mongoURL='mongodb+srv://gabrielcoman:p3r4manc3@cluster0.zq6oc.mongodb.net/sport-booking'

mongoose.connect(mongoURL, {useUnifiedTopology:true, useNewUrlParser:true})

var connection=mongoose.connection

connection.on('error', ()=>{
    console.log('MongoDB connection Failed')
})

connection.on('connected', ()=>{
    console.log('MongoDB Connection Successfuly')
})

module.exports=mongoose