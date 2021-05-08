var express = require("express");
const { Dossier } = require("../modules/dossier");
const auth = require("../middleware/auth");
var router = express.Router();



router.get("/",auth,async (req,res)=>{
    try{  
        const dossier = await Dossier.find().populate("facturation")
                                            .populate("client")
                                            .populate("vendeur")
                                            .populate("provenance");
        res.status(200).send(dossier) ; 
    }catch(e){
        res.send(e) ; 
    }

})

module.exports = router ;