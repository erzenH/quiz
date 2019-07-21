const express = require('express');
const app = express();
const path = require("path")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const createRoute = require("./routes/create")
const quizesRoute = require("./routes/quizes")
const quizRoute = require("./routes/quiz")

const PORT = process.env.PORT || 4000;


dotenv.config();

mongoose.connect(process.env.DB_CONNECT, 
   {useNewUrlParser: true}, 
   ()=>console.log("Connected to DB"));

// mongoose.connect("mongodb://erzen:gladio191@ds247330.mlab.com:47330/quiz", 
//    {useNewUrlParser: true}, 
//    ()=>console.log("Connected to DB"));


//middlewares
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parses urlencoded bodies

app.use(bodyParser.json()); // Send JSON responses
app.use(cors());


//route middlewares
app.use('/api', createRoute);
app.use('/api', quizesRoute);
app.use('/api', quizRoute);

if(process.env.NODE_ENV === 'production'){
   app.use(express.static('client/build'))

   app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname,'client','build','index.html'))
   })
}


app.listen(PORT, ()=> console.log("Server Started"));