const mongoose=require("mongoose");
const classeSchema=new mongoose.Schema({
    nom:{
        type:"String",
        required:true,
        unique:true
    }
})

const Classe=mongoose.model("classes",classeSchema);
module.exports=Classe;