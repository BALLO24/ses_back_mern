const division=require("../model/division.model");
const {user,enseignant}=require("../model/user.model");
module.exports.addDivision=async (req,res)=>{
    //const infosDivision={...req.body};
    const {sigle,nom,chef_division}=req.body
try{
    
    if(!sigle || !nom || !chef_division){
        res.status(400).json({message:"Tous les champs doivent etre renseignés"})
    }
    //Verifier que le chef de division existe
    const isExistChefDivision=await enseignant.findById(chef_division);
    if(!isExistChefDivision){
        return res.status(404).json({message:"Le chef de division choisi n'existe pas"})
    }
    const upadateEnseinant=await enseignant.findByIdAndUpdate(chef_division,{$set:{enseignant_specifique_role:"chef_division"}},{new:true});
    if(upadateEnseinant){
        const newDivision=await division.create({sigle,nom,chef_division})
        if(newDivision){
            return res.status(201).json({message:"Division créée avec succes",newDivision,upadateEnseinant})
        }
        else{
            await enseignant.findByIdAndUpdate(chef_division,{$set:{enseignant_specifique_role:null}},{new:true});
            return res.status(400).json({message:"Une erreur est survenue lors de l'operation"})
        }
            
    }
    {
        return res.status(400).json({message:"Une erreur est survenue lors de l'operation"})
    }
    
   
}
catch(err){
    console.log(err);
    
    return res.status(500).json({erreur:err})
    }
}

module.exports.deleteDivision=async(req,res)=>{
    const {id}=req.params
    try{
        const division=await division.findOne({_id:id});
        if(division){
            const result=await division.deleteOne({_id:id})
            if(result){
                res.status(200).json({message:"Division supprimée avec succès"})
            }
            else{
                res.status(400).json({message:"Aucune division trouvée"})
            }
        }
    }
    catch(err){
        res.status(500).json({erreur:err})
    }
}
