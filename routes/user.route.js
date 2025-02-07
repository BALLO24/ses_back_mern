const express=require("express");
const authController=require("../controller/auth.controller")
const router=express.Router();
router.post("/register",authController.signUp);
router.post("/login",authController.signIn);
router.post("/logout",authController.logout);


module.exports=router;