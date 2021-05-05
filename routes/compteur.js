var express = require("express");
const { Signature } = require("../modules/signature");
const { route } = require("./embededSignature");
var router = express.Router();



router.get("/", async (req , res)=>{


    const beginDate = req.body["beginDate"];
    const endDate = req.body["endDate"];
  
    try {
      // get all the folders created in  that periode
      const results = await Signature.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(beginDate), $lte: new Date(endDate) },
          },
        },
      ]);
  
      res.send("consommation signature  : " + results.length);
    }catch(e){


    }


}); 

module.exports = router;