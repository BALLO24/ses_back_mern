const pomotion=require("../model/promotion.model");
const Division=require("../model/division.model");
const { user,enseignant } = require("../model/user.model");
const classe=require("../model/classe.model");
module.exports.addPromotion=async (req,res)=>{
    const {nom,annee_debut,classe,chef_promo,division}=req.body;
   
    try{
        if(!nom || !annee_debut || !classe || !chef_promo || !division){
            return res.status(400).json({message:"Tous les champs doivent etre renseignés"});
        }
         //Verifier si la division existe
         const isExistDivision=await Division.findOne({_id:division});
         console.log(isExistDivision);
         if(!isExistDivision){
            return res.status(400).json({message:"La division choisie n'existe pas dans la BD"})
         }

         //Verifier si la classe existe
        const isExistClasse=await classe.findOne({_id:classe})
        if(!isExistClasse){
            return res.status(400).json({message:"La classe choisie n'est pas dans la BD"})
        }
         
         //Verifier si le chef promo existe
         const isExistChefPromo=await enseignant.findOne({_id:chef_promo});
         if(!isExistChefPromo){
            return res.status(400).json({message:"Le chef promo choisi n'existe pas dans la BD"})
         }
         const updateChefPromo=await enseignant.findByIdAndUpdate(chef_promo,{$set:{enseignant_specifique_role:"chef_promo"}},{new:true})
        if(updateChefPromo){
            const newPromotion=await pomotion.create({nom,annee_debut,classe,chef_promo,division});
            if(newPromotion){
                return res.status(201).json(newPromotion,isExistChefPromo);
            }
            else{
                return res.status(400).json({erreur:"Un Problème est survenue lors de la création d'une nouvelle promotion"})
            }
        }
        else{
            return res.status(400).json({erreur:"Un Problème est survenue lors de la création d'une nouvelle promotion"})
        }
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({erreur2:"Une erreur interne au serveur s'est produite"});
    }
}


module.exports.deletePromotion=async (req,res)=>{
    const {id}=req.params
    try{
      const user=await pomotion.findOne({_id:id});
      if(user){
        const result=await pomotion.deleteOne({_id:id});
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