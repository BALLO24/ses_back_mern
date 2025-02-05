const {eleve,enseignant}=require("../model/user.model")
const {createToken}=require("../utils/auth.utils");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const maxAge=3*24*3600*1000;
 module.exports.signUp=async (req,res)=>{
   
   try{
    const {firstname,lastname,email,password,role,...details}=req.body

    //console.log(firstname,lastname,email,password,details);
    let user;
    switch(role){
        case "eleve":
            user=new eleve({firstname,lastname,email,password,role,...details});
            break;
        case "enseignant":
            user=new enseignant({firstname,lastname,email,password,role,...details});
            break;
        default :
            return res.status(400).json({ message: "Rôle invalide" });
        }   
    
        await user.save();
        res.status(201).json({ message: "Utilisateur créé avec succes" });
  
    }
   catch(err){
    console.log(err);
    res.status(400).json({err})}
}