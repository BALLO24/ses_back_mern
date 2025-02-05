const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  nom: {
    type: "String",
    required: true,
    unique: true,
  },
  annee_debut: {
    type: "String",
    required: true,
  },
  annee_fin: {
    type: "String",
    default:null
  },
  classe:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"classes",
    required:true,
    //enum:["tsEI","ingEI","tM","tsM","ingM","tNA","tsNA","ingNA"],
    default:null,
  },
  chef_promo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true,
  },
  division:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"divisions",
    required:true,
  },
  is_actif:{
    type:"Boolean",
    required:true,
    default:true,
  }
  // D'autres champs comme la description ou les modules peuvent être ajoutés
}, {
  timestamps: true
});

module.exports = mongoose.model('promotions', promotionSchema);
