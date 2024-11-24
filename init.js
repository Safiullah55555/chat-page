const mongoose= require("mongoose")
const Chat=require("./models/chat.js")//require chat model.


main()
.then(()=>{console.log("connection successful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats=[
        {
                From:"talha",
                to:"safi",
                msg:"singa yaa",
                created_at:new Date()
        },
        {
                From:"raheel",
                to:"safi",
                msg:"bahar rawoza",
                created_at:new Date()
        },
        {
                From:"jawad",
                to:"safi",
                msg:"daya nada khelas kro",
                created_at:new Date()
        },
        {
                From:"usman",
                to:"safi",
                msg:"stadium ta rasha",
                created_at:new Date()
        },
        {
                From:"fahad",
                to:"safi",
                msg:"z n shem tla korka karr da",
                created_at:new Date()
        },
];

Chat.insertMany(allchats)
