const mongoose=require("mongoose");

const divisionModel=new mongoose.Schema({
    sigle:{
        type:"String",
        require:true,
        unique:true,
    },
    nom:{
        type:"String",
        require:true,
        unique:true
    },
    id_chef_division:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        require:true,
    }
},
{
    timestamps:true,
});

const divisionSchema=mongoose.model("divisions",divisionModel);
module.exports=divisionSchema;