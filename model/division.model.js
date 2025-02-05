const mongoose=require("mongoose");

const divisionSchema=new mongoose.Schema({
    sigle:{
        type:"String",
        required:true,
        unique:true,
    },
    nom:{
        type:"String",
        required:true,
        unique:true
    },
    chef_division:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    }
},
{
    timestamps:true,
});

const division=mongoose.model("divisions",divisionSchema);
module.exports=division;