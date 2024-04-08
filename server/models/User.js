const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        lowercase:true,
        trim: true
    },
    address:{
        type:String,
    },
    phone:{
        type:String,
    }
},{
    timestamps:true
})

module.exports = mongoose.model("User", userSchema)