const userModel=require('../model/user.model');
const {createToken}=require("../utils/auth.utils");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const maxAge=3*24*3600*1000;
 module.exports.signUp=async (req,res)=>{
   
   try{
    const newUser={...req.body}
    const user=await userModel.create(newUser)
    console.log(user);
    res.status(200).send(`Add user successfully ${user}`)
   }
   catch(err){
    console.log(err);}
}

module.exports.signIn=async (req,res)=>{
   
    try{
     const {email,password}={...req.body}
    //Gestion de l'identification
     const user=await userModel.findOne({email});
     if(!user){
        res.status(404).json({message:"Utilisateur non trouvé"})
     }

     const isMatch=await bcrypt.compare(password,user.password);
     if(!isMatch){
        res.status(401).json({message:"Mot de passe incorrect"})
     }
     //Generer un token
     const token=createToken(user._id);
    //Sauvegarder le token dans les cookies
     res.cookie("jwt",token,{httpOnly:true,maxAge})
     res.status(200).json({username:user.firstname})
    }
    catch(err){
     console.log(err);
     res.status(400).json(err)}
 }

module.exports.logout=(req,res,next)=>{
    res.cookie('jwt','',{maxAge:1});
    //res.redirect("/")
    res.send("deleted ok");
}

module.exports.checkUser=(req,res,next)=>{
    const token=req.cookies.jwt
    if(token){
        jwt.verify(token,process.env.TOKEN_SECRET,async(err,decodedToken)=>{
            if(err){
                res.locals.user=null,
                res.cookie("jwt","",{maxAge:1});
                next()
            }
            else{
                let user=await userModel.findById(decodedToken.id).select("-password") ;
                console.log(decodedToken);
                res.locals.user=user;
                console.log(user);
                res.status(200).json({user});
                next();
            }
        })
    }
    else{
        res.locals.user=null;
        next();
    }    
}

//test
module.exports.getMe=(req,res)=>{
    
    console.log("getMe ok");
    res.status(200).json({user:res.locals.user});
    
}


//Première fois quand l'utilisateur va venir sur le site
module.exports.requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.TOKEN_SECRET,(err,decodedToken)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        console.log("Pas de token");
        
    }
}

