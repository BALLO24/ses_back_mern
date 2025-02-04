const promotionModel=require("../model/promotion.model")
module.exports.addPromotion=async (req,res)=>{
    //const infosPromotion={...req.body};
    const {nom,annee_debut,annee_fin,id_chef_promo,id_division}=req.body;
    console.log(id_chef_promo);
    
    try{
        const newPromotion=await promotionModel.create({nom,annee_debut,annee_fin,id_chef_promo,id_division});
        if(newPromotion){
            res.status(200).json(infosPromotion);
        }
        else{
            res.status(400).json({erreur:"Un Problème est survenue lors de la création d'une nouvelle promotion"})
        }
    }
    catch(err){
            res.status(400).json({erreur2:err})
    }
}


module.exports.deletePromotion=async (req,res)=>{
    const {id}=req.params
    try{
      const user=await promotionModel.findOne({_id:id});
      if(user){
        const result=await promotionModel.deleteOne({_id:id});
        if(result){
            res.status(200).json({message:"Promotion supprimée avec succes"});
        }
        else{
            res.status(404).json({message:"Utilisateur non trouvé"})
        }
      }
    }
    catch(err){
            res.status(400).json({erreur2:err})
    }
}