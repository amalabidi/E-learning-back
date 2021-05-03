var express = require("express");
const { Modification } = require("../modules/modification");
var router = express.Router();
var { Client } = require("../modules/client");


router.get("/",async (req,res)=>{
    try{
         const result = await Modification.find({}) ; 
         if(result) {
            res.status(200).send(result) ; 
         }else{
            res.status(404).send("No modification found") ; 
         }
    }catch(err){
        res.status(400).send(err) ; 
    }
})



router.get("/filter",async (req,res)=>{
    try{        
        const modifs = await Modification.find({})
        .populate("user");
      
        const { CreationDateMin , CreationDateMax ,users,actions,ancienstatuts,nouveauxstatuts,payementVendeur,payementCoach,Tarifs}= req.body; 

       const filters = {

       createdAt: (createdAt) => {
        if((CreationDateMin==null)){
            if((CreationDateMax==null)){
                return true ;
            }
            if((createdAt < new Date(CreationDateMax))){
                return true ;
            }
           return false ;
        } else {
            if((CreationDateMax==null)){
                if((createdAt > new Date(CreationDateMin))){
                    return true ;
                }
            }
        if ((createdAt > new Date(CreationDateMin))&&(createdAt < new Date(CreationDateMax)))
         return true; 
         return false; 
      }},
      user: (user) => {
        if (users == null) {
          return true;
        } else {
          if (users.includes(user.lastname+" "+user.name )) {
            return true;
          }
        }
        return false;
      },
      operation: (operation) => {
        if (actions == null) {
          return true;
        } else {
          if (actions.includes(operation)) {
            return true;
          }
        }
        return false;
      },
      previousStatus: (previousStatus) => {
        if (ancienstatuts == null) {
          return true;
        } else {
          if (ancienstatuts.includes(previousStatus)) {
            return true;
          }
        }
        return false;
      },
      newStatus: (newStatus) => {
        if (nouveauxstatuts == null) {
          return true;
        } else {
          if (nouveauxstatuts.includes(newStatus)) {
            return true;
          }
        }
        return false;
      },
    };
    try{
        const filterKeys = Object.keys(filters);
        const result= modifs.filter(item => {
          // validates all filter criteria
          return filterKeys.every(key => {
            // ignores non-function predicates
            if (typeof filters[key] !== 'function') return true;
            return filters[key](item[key]);
          }); });

         res.send(result) ; 
 
          }  catch (e){
       res.status(200).send(filtered) ; }
    } catch(e) {
        res.status(404).send(e) ; 
    }
})

router.get("/search/:search", async (req, res) => {
  const { search } = req.params;
  var modifs = [];
  if (search) {
    const results =  await Client.aggregate([
      { $project: { name: { $concat: ["$lastName"," ","$firstName"] } } },
      { $match: { name: { $regex: search, $options: "i" } } },
    ]).exec(async function (err, results) {
        console.log(results);
      for (i = 0; i < results.length; i++) {
        const clientid = results[i]["_id"];
        const modification = await Modification.find({ client: clientid });
        for (k = 0; k < modification.length; k++) {
          modifs.push(modification[k]);
        }
      }
      res.send(modifs);
    });

  } else {
    res.send("no search");
  }
}); 

module.exports = router;