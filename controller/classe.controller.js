const classeModel=require("../model/classe.model")

module.exports.addClasse=async(req,res)=>{
    const {nom}=req.body;
    try{
        const newClasse=await classeModel.create({nom});
        if(newClasse){
            res.status(200).json({message:"Classe ajoutée avec succes"})
        }
        else{
            res.status(400).json({message:"Un problème est surevnue lors de l'ajout de la classe"})
        }
    }
    catch(err){
        res.status(400).json({message:err})
    }
}