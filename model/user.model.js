const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minlength:3,
        maxlength:25
    },
    lastname:{
        type:String,
        required:true,
        minlength:3,
        maxlength:25
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:5,
        maxlength:1024,
        required:true
    },
    role:{
        type:String,
        enum:["eleve","stagiaire","enseignant"],
        required:true,

    },
    droit:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
});

userSchema.pre("save",async function(next){
    try{
        const saltRound=10;
        const salt=await bcrypt.genSalt(saltRound);
        this.password=await bcrypt.hash(this.password,salt);
        next()
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

const user=mongoose.model("users",userSchema);

//champs sepécifiques aux eleves
const eleve=user.discriminator("eleves", new mongoose.Schema({
    promotion:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Promotion",
        required:function(){
            return this.role==="eleve"
        },
        default:null,
    },
    evaluations_eleve:{
        type:[String],
        default:[],
        //default:null,
    },
}));

//Champs Specifiques aux stagiaires
//const stagiaireModel=mongoose.model("stagiaires",{})

//Champs spécifiques aux enseignants
const enseignant=user.discriminator("enseignants", new mongoose.Schema({
    enseignant_type:{
        type:String,
        enum:["interne","vacataire","intervenant"],
        default:null,
    },
    enseignant_specifique_role:{
        type:String,
        enum:["chef_promo","chef_division"],
        default:null
    },
}));

module.exports= {user,eleve,enseignant}