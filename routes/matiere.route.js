const express=require("express");
const matiereController=require("../controller/matiere.controller")
const router=express.Router();
router.post("/",matiereController.addMatiere)

module.exports=router