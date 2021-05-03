var express = require("express");
const { Dossier } = require("../modules/dossier");
var router = express.Router();



router.get("/",async (req,res)=>{
    try{  
        const dossier = await Dossier.find().populate("facturation");
        res.status(200).send(dossier) ; 
    }catch(e){
        res.send(e) ; 
    }

})

module.exports = router ;