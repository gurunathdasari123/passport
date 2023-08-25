const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:{
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String,
    },
    password:{
        required:true,
        type:String,
    },
    phoneNumber:{
        required:true,
        type:String,
    },
    date:{
        required:true,
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('user',userSchema)