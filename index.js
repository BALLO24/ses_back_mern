const express=require("express");
const mongoose =require('./config/db');
const bodyParser = require("body-parser");
const cookieParser=require("cookie-parser")
const dotenv=require("dotenv");
const cors=require("cors");
//import route
const userRoutes=require("./routes/user.route");
const promotionRoutes=require("./routes/promotion.route");
const divisionRoutes=require("./routes/division.route");
const evalPromotionRoutes=require("./routes/eval.promotion.route");
const classeRoutes=require("./routes/classe.route");
const matiereRoutes=require("./routes/matiere.route");

const { checkUser } = require("./controller/auth.controller");

const app=express();
const router=express.Router()
dotenv.config({path:".env"});
const PORT=process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());

//routes
app.use("/user",userRoutes);
app.use("/promotion",promotionRoutes);
app.use("/division",divisionRoutes);
app.use("/evaluation",evalPromotionRoutes);
app.use("/classe",classeRoutes);
app.use("/matiere",matiereRoutes);

//
// app.get("*",checkUser,(req,res,next)=>{
//     next();
// })


app.listen(PORT,()=>console.log(`Serveur running on port ${PORT}`));