const classeController=require("../controller/classe.controller")
const express=require("express");
const router=express.Router();

router.post("/ajouter",classeController.addClasse);
module.exports=router