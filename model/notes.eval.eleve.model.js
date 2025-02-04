const mongoose=require("mongoose");
const notesEvalEleveSchema=new mongoose.Schema({
    o1:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    o2:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    p1:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    p2:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    id_eleve:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true

    }
},{
    timestamps
});
const notesEvalEleveModel=mongoose.model("notesEvalEleves",notesEvalEleveSchema);
module.exports=notesEvalEleveModel;