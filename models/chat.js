const mongoose= require("mongoose")

const chatSchema=new mongoose.Schema({
        From:{
                type:String,
                required:true
               
        },
        to:{
                type:String,
                required:true
        },
        msg:{
                type:String,
                maxLength: 50
        },
        created_at:{
                type:Date,
                required:true
        }
})

//model

const Chat=mongoose.model("Chat",chatSchema)

//export chat model

module.exports=Chat;