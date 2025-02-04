const matiereModel=require("../model/matiere.model")

module.exports.addMatiere=async(req,res)=>{
    const {nom,id_classe}=req.body;
    try{
       const newMatiere=await matiereModel.create({nom,id_classe})
       if(newMatiere){
        res.status(200).json({message:"Matiere ajoutée avec succes"})
        console.log("Matiere ajoutée avec succes");
        
       }
       else{
        res.status(400).json({message:"Un problème est surevnue lors de l'ajout de la classe"});
        console.log("Un problème est surevnue lors de l'ajout de la classe");
        
       }
    }
    catch(err){
        res.status(400).json({message:err})
        console.log(err);
        
    }
}