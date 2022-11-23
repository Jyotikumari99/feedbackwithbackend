/*const express=require('express');
const app=express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/feedback",{
useNewUrlParser:true,
useUnifiedTopology:true,
// useCreateIndex:true
}).then(()=>{
    console.log("connection successful")
}).catch((e)=>{
    console.log(e);
    console.log("no connection");

})



const feedbackSchema={
  title:String
}
const Feedback=mongoose.model("feedback",feedbackSchema)
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
  let newfeedback=new  Feedback({
    title:req.body.title
  })
  newfeedback.save();
  res.redirect("/");
})

app.listen(3000) 
 */

const express =require('express');
const path=require("path");
const app = express();
const hbs=require("hbs");
const port=process.env.port || 3000;  //jo bhi avalable port ho vo allot ho jaaye
require('./db/conn');

const Feedback=require("./models/feedbacks")


const static_path = path.join("__dirname")

// app.use(express.static('C:\Users\Saksham\Documents\everything related to coding\HelpingAngels\LoginForm-main\public'));


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","hbs");
app.use(express.static(static_path))

app.get("/", (req, res) => {

res.render("index");
})

app.get("/feedback", (req, res)=>{
res.render("feedback");
})

app.post("/feedback",async(req,res) => {
try {
  const userfeedback=new Feedback({
    title:req.body.title
  })
  const feedbackdone=await userfeedback.save();
  res.status(201).render("index")
} catch (error) {
  res.status(400).send(error);
}
});




app.listen(port,()=>{
    console.log(`server is running at port no. ${port}`);
}
)
/*
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const collection = require("./product");
const app = express();

app.use(bodyParser.json()); //middlewares
//app.use(express.static("public"));//find all static html fies in public directory
app.use(bodyParser.urlencoded({
    extended: true,
  })
);

//mongoose.connect("mongodb://localhost:27017/e-comm");
mongoose.connect("mongodb://localhost:27017/feedback",{
     useNewUrlParser:true,
     useUnifiedTopology:true
});
var db = mongoose.connection;

db.on("error", () => console.log("error in connecting to database"));
db.once("open", () => console.log("connected to database"));

app.get("/", (req, res) => {
  /*res.send("hello from server")
  res.set({
    "Allow-access-Alllow-Origin": "*",
  });
  //return res.redirect("index.html");
});

app.post("/", (req, res) => {
  var title = req.body.name;
  

  var data = {
    "title": title,
  };
  
  db.collection("feedbacks").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("recorded successfully");
    
    
  });
  //return res.redirect("signup_success.html"); //to redirect to new page
  
});
app.listen(5000);
console.log("lstening on port 5000");
*/