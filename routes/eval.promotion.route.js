const express=require("express");
const evalPromotionController=require("../controller/eval.promotion.controller")

const router=express.Router();
router.post("/ajouter",evalPromotionController.addEvaluation);

module.exports=router