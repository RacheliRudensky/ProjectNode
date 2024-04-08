const mongoose = require("mongoose")

const photoSchema = new mongoose.Schema({
    title:{
        type:String
    },
    imageUrl:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Photo", photoSchema)