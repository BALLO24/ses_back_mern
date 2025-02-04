const mongoose=require("mongoose");
const classeSchema=new mongoose.Schema({
    nom:{
        type:"String",
        required:true,
        unique:true
    }
})

const classeModel=mongoose.model("classes",classeSchema);
module.exports=classeModel;