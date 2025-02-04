const express=require("express");
const noteEvalEleveController=require("../controller/notes.eval.eleve.controller")
const router=express.Router();
router.post("/evaluer_eleve",noteEvalEleveController.addNoteEvalEleve);

module.exports=router