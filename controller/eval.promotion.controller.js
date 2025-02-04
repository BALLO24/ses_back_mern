const evalPromoModel=require("../model/eval.promotion.model");
module.exports.addEvaluation=async(req,res)=>{
    const {id_matiere,id_enseignant,id_promotion}=req.body;
    try{
        const newEval=await evalPromoModel.create({id_matiere,id_enseignant,id_promotion});
        if(newEval){
            res.status(200).json({message:"Une nouvelle evaluation est mise en ligne"});
            console.log("if");
            
        }
        else{
            res.status(400).json({message:"Une erreur est survenue lors de la mise en ligne d'une nouvelle evaluation"});
            console.log("else");
            
        }
    }
    catch(err){
        res.status(400).json({erreur:err});
        console.log(err);
        
    }
}