const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({

    sportfield: {
        type: String, required:true
    },
    sportfieldid: {
        type: String, required:true
    },
    userid: {
        type: String, required:true
    },
    date: {
        type:String, required:true
    },
    fromhour: {
        type:String, required:true
    },
    tohour: {
        type:String, required:true
    },
    totalamount: {
        type:String, required:true
    },
    totaltime: {
        type:String, required:true
    },
    transactionId:{
        type:String, required:true
    },
    status:{
        type:String, required:true, default: 'booked'
    }

}, {
    timestamps: true,
})

const bookingmodel= mongoose.model('bookings', bookingSchema);

module.exports = bookingmodel
