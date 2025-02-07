const {user,eleve,enseignant}=require("../model/user.model")
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
        return res.status(201).json({ message: "Utilisateur créé avec succes" });
  
    }
   catch(err){
    console.log(err);
    return res.status(400).json({err})}
}



module.exports.signIn=async (req,res)=>{
   
    try{
     const {email,password}={...req.body}
     console.log(email);
     
    //Gestion de l'identification
     const user1=await user.findOne({email});
     if(!user1){
        console.log("no user");
        return res.status(404).json({message:"Utilisateur non trouvé"})
        
        
     }

     const isMatch=await bcrypt.compare(password,user1.password);
     if(!isMatch){
        console.log("no good mdp");
        return res.status(401).json({message:"Mot de passe incorrect"})
     }
     //Generer un token
     const token=createToken(user._id);
    //Sauvegarder le token dans les cookies
     res.cookie("jwt",token,{httpOnly:true,maxAge})
     return res.status(200).json({username:user1.firstname})
    }
    catch(err){
     console.log(err);
     return res.status(400).json(err)}
 }


 module.exports.logout=(req,res,next)=>{
    res.cookie('jwt','',{maxAge:1});
    //res.redirect("/")
    res.send("deleted ok");
}