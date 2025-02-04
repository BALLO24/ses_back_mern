const { logout } = require("./auth.controller");
const userModel=require("../model/user.model");
const evalPromoModel=require("../model/eval.promotion.model");

module.exports.deleteUser=async(req,res)=>{
    const {id}=req.params
  try{
    //Verifier si le user existe
    const user=await userModel.findOne({_id:id})
    if(user){
        const result=await userModel.deleteOne({_id:id});
        if(result){
            res.status(200).json({message:"User supprimé avec succes"})
        }
        else{
            res.status(400).json({message:"Une erreur est surevenue lors de la suppresion"})
        }
    }
    else{
        res.status(404).json({message:"User non trouvé"})
    }   
    
  }
  catch(err){
    console.log(err);
  }
}

module.exports.getAllEvalStudent=async(req,res)=>{
  const {id}=req.params;
  try {
    const user=await userModel.findOne({_id:id}).select("-password")
    if(user){
      // res.status(200).json({user})
      const evals_de_ma_promo=await evalPromoModel.find({id_promotion:user.id_promotion})
      .populate("id_matiere","nom")
      .populate("id_enseignant","firstname lastname")
      .populate("id_promotion","nom")
      .exec();
      //res.status(200).json({evaluations:evals_de_ma_promo[0]});
      res.status(200).send(evals_de_ma_promo);
    }
    else{
      res.status(400).json({message:"ID incorrect"})
    }
  } catch (err) {
    res.status(400).json(err)
  }
}