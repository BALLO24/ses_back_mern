const notesEvalEleveModel=require("../model/notes.eval.eleve.model");
module.exports.addNoteEvalEleve=async(req,res)=>{
    const {o1,o2,p1,p2}=req.body;
    try {
        const newNote=await notesEvalEleveModel.create({o1,o2,o3,o4});
        if(newNote){
            res.status(200).json({result})
        }
        else{
            res.status(400).json({message:"Une erreur est survenue lors de l'operation"})
        }
    } 
    catch (err) {
        res.status(400).json({err})
    }

}