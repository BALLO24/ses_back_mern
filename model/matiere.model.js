const mongoose=require("mongoose");
const matiereSchema=new mongoose.Schema({
    nom:{
        type:"String",
        required:true
    },
    classe:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"classes",
        required:true
    }},
{
    timestamps:true
})

const Matiere=mongoose.model("matieres",matiereSchema);
module.exports=Matiere;