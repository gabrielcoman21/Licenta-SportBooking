const mongoose=require("mongoose");

const sportfieldSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    maxcount:{
        type: Number,
        required: true
    },
    phonenumber:{
        type: Number,
        required: true
    },
    rentperhour:{
        type: Number,
        required: true
    },
    imageurls: [],
    currentbookings: [],
    type: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    reviews: []
} , {
    timestamps: true,
})

const sportfieldModel = mongoose.model('sportfields', sportfieldSchema)

module.exports=sportfieldModel