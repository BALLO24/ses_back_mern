const express=require("express");
const router=express.Router();
const promotionController=require("../controller/promotion.controller")

router.post("/ajouter",promotionController.addPromotion);
router.delete("/:id",promotionController.deletePromotion);

module.exports=router