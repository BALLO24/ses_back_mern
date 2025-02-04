const express=require("express")
const router=express.Router()

//users
const authController=require("../controller/auth.controller")
const userController=require("../controller/user.controller")

router.post("/register",authController.signUp);
router.post("/login",authController.signIn);
router.post("/logout",authController.logout);
router.delete("/:id",userController.deleteUser)

router.get("*",authController.checkUser,(req,res,next)=>{next();})
router.get("/evaluations_eleve/:id",userController.getAllEvalStudent);
//router.get("/eleve/:id/evaluations",userController.getAllEvalStudent);
router.post("/eleve_evaluer/:id",userController.getAllEvalStudent)
router.get("/me",authController.checkUser,authController.getMe);

//promotion
module.exports=router
