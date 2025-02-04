const mongoose=require("mongoose");
const matiereSchema=new mongoose.Schema({
    nom:{
        type:"String",
        required:true
    },
    id_classe:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"classes",
        required:true
    }},
{
    timestamps:true
})

const matiereModel=mongoose.model("matieres",matiereSchema);
module.exports=matiereModel;