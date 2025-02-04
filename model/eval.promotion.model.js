const mongoose=require("mongoose");

const evalPromoSchema=new mongoose.Schema({
    id_matiere:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"matieres",
        required:true
    },
    id_enseignant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    id_promotion:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"promotions",
        required:true
    },
    is_actif:{
        type:Boolean,
        default:true
    },
    evaluateurs:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"users",
        default:null
    },
      
},
{
    timestamps:true
});

const evalPromoModel=mongoose.model("evalPromotions",evalPromoSchema);
module.exports=evalPromoModel;