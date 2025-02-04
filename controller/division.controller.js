const divisionModel=require("../model/division.model");
module.exports.addDivision=async (req,res)=>{
    //const infosDivision={...req.body};
    const {sigle,nom,id_chef_division}=req.body
try{
    const newDivision=await divisionModel.create({sigle,nom,id_chef_division})
    if(newDivision){
        res.status(200).json({message:"Division ajoutée avec success"})
    }
    else{
        res.status(400).json({erreur:"Une erreur est survenue lors de l'ajout de la division"})
    }
}
catch(err){
    res.status(400).json({erreur:err})
    }
}

module.exports.deleteDivision=async(req,res)=>{
    const {id}=req.params
    try{
        const division=await divisionModel.findOne({_id:id});
        if(division){
            const result=await divisionModel.deleteOne({_id:id})
            if(result){
                res.status(200).json({message:"Division supprimée avec succès"})
            }
            else{
                res.status(400).json({message:"Aucune division trouvée"})
            }
        }
    }
    catch(err){
        res.status(400).json({erreur:err})
    }
}
