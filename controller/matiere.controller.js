const Matiere=require("../model/matiere.model");
const Classe=require("../model/classe.model");

module.exports.addMatiere=async(req,res)=>{
    const {nom,classe}=req.body;
    try{
        if(!nom || !classe){
            return res.status(400).json({message:"Tous les champs doivent etre renseignes"})
        }
        const isExistingClasse=Classe.findOne({_id:classe});
        if(!isExistingClasse){
            return res.status(400).json({message:"La classe choisie n'existe pas"});
        }
       const newMatiere=await Matiere.create({nom,classe})
       if(newMatiere){
        console.log("Matiere ajoutée avec succes");
        return res.status(200).json({message:"Matiere ajoutée avec succes"})
        
       }
       else{
        console.log("Un problème est surevnue lors de l'ajout de la classe");
        return res.status(400).json({message:"Un problème est surevnue lors de l'ajout de la classe"});
        
       }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:err})
    }
}