const express=require("express");
const divisionController=require("../controller/division.controller")
const router=express.Router();
router.post("/",divisionController.addDivision);
router.delete("/:id",divisionController.deleteDivision);
module.exports=router