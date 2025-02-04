const mongoose=require("mongoose");
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    firstname:{
        type:"String",
        required:true,
        minlength:3,
        maxlength:25
    },
    lastname:{
        type:"String",
        required:true,
        minlength:3,
        maxlength:25
    },
    email:{
        type:"String",
        required:true,
        unique:true
    },
    password:{
        type:"String",
        minlength:5,
        maxlength:1024,
        required:true
    },
    role:{
        type:"String",
        enum:["eleve","stagiaire","enseignant"],
        required:true,

    },
    droit:{
        type:"String",
        enum:["user","admin"],
        default:"user",
    },

    //Début Champ spécifique aux élèves
    id_promotion:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Promotion",
        require:function(){
            return this.role==="eleve"
        },
        default:null,
    },
    
    //deja defini dans promotion
    // annee_debut:{
    //     type:"String",
    //     require:function(){
    //         return this.role==="eleve"
    //     },
    //     default:null,
    // },

    evaluations_eleve:{
        type:["String"],
        //default:[],
        default:null,
    },


    //Fin champ spécifique aux élèves

    //Debut champ spécifique à tous les enseignants
    evaluations_enseignant:{
        type:["String"],
        //default:[],
        default:null
    },
    enseignantType:{
        type:"String",
        enum:["interne","vacataire","intervenant"],
        default:null,
    },
    enseignantSpecifiqueRole:{
        type:"String",
        enum:["chefPromo","chefDivision"],
        default:null
    },
    //Fin champ spécifiques à tous les enseignants

    //Debut champs spécifiques à tous les Chefs Promo
    listePromos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Promotion",
            required:function(){
                return(this.enseignantSpecifiqueRole==="chefPromo")
            },
            default:null,
        }
    ]
})

userSchema.pre("save",async function(){
    const saltRound=10;
    const salt=await bcrypt.genSalt(saltRound);
    this.password=await bcrypt.hash(this.password,salt);
});


//Gestion du login
/*userSchema.statics.login=async function(email,password){
    const user=await this.findOne({email});
    if(user){
        const auth=await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error("Mot de passe incorrect")
    }
    throw Error("Utilisateur non trouvé");

}*/

const userModel=mongoose.model("users",userSchema);
module.exports=userModel;

