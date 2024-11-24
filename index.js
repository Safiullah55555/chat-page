const express= require ("express")
const app = express()
const mongoose= require("mongoose")
const path = require("path")
const Chat=require("./models/chat.js")//require chat model.
const methodOverride= require("method-override")


app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))//for styling
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))

main()
.then(()=>{console.log("connection successful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//index rout

app.get("/chats",async(req,res)=>{
        let chats=await Chat.find();
        //console.log(chats)
        res.render("index.ejs",{chats})
})

//new rout

app.get("/chats/new", (req,res)=>{
        res.render("new.ejs")
})

//create rout.

app.post("/chats",(req,res)=>{
        let {From,to,msg}=req.body
        let newChat=new Chat({
                From:From,
                to:to,
                msg:msg,
                created_at:new Date()
        })
        newChat.save().then(res=>{console.log("chat sended")}).catch(err=>{console.log(err)})
        res.redirect("/chats")
})

//edit route

app.get("/chats/:id/edit",async (req,res)=>{
        let {id}=req.params
        const chat = await Chat.findById(id);
        res.render("edit.ejs",{chat})
})  

//put rout. update route.

app.put("/chats/:id",async (req,res)=>{
        let {id}=req.params
        let {msg:newMsg}=req.body;

        let updatedChat= await Chat.findByIdAndUpdate(id,{msg:newMsg}, {runValidators:true, new:true})
        console.log(updatedChat)
        res.redirect("/chats")
})

//Delete route.

app.delete("/chats/:id",async (req,res)=>{
        let {id}=req.params
        let chatDeleted = await Chat.findByIdAndDelete(id);
        console.log(chatDeleted)
        res.redirect("/chats")
})

app.get("/",(req,res)=>{
        res.send("stara mashai")
})

app.listen(8080,()=>{
        console.log("server is running on port 8080")
})