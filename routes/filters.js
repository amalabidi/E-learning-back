var express = require("express");
const { Dossier } = require("../modules/dossier");
var router = express.Router();


/**
 * Filters an array of objects using custom predicates.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria
 * @return {Array}
 */
 function filterArray(array, filters) {
     console.log("//////////////////////////") ;
     console.log(array) ; 
     console.log("//////////////////////////") ;
     console.log(filters) ;
     console.log("//////////////////////////") ;
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        // ignores non-function predicates
        if (typeof filters[key] !== 'function') return true;
        return filters[key](item[key]);
      });
    });
  }



router.get("/",async (req,res)=>{
    try{
        
        const dossiers = await Dossier.find({})
        .populate("facturation")
        .populate("idWorkshop")
        .populate("client");
      
        const { CreationDateMin , CreationDateMax , workshopBeginDateMin , workshopBeginDateMax,
             workshopEndDateMin, workshopEndDateMax
            , dateFacturationMax, dateFacturationMin}= req.body; 

       const filters = {
       //size: (size) => size === 50 || size === 70,
       //color: (color) => ['blue', 'black'].includes(color.toLowerCase()),
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
      }} , 
     workshopBeginDate: (workshopBeginDate) => {
        if((workshopBeginDateMin==null)){
            if((workshopBeginDateMax==null)){
                return true ;
            }
            if((workshopBeginDate < new Date(workshopBeginDateMax))){
                return true ;
            }
           return false ;
        } else {
            if((workshopBeginDateMax==null)){
                if((workshopBeginDate > new Date(workshopBeginDateMin))){
                    return true ;
                }
            }
            if ((workshopBeginDate > new Date(workshopBeginDateMin))&&(workshopBeginDate < new Date(workshopBeginDateMax)))
            return true; 
            return false; 
          }
      },
      
       workshopEndDate: (workshopEndDate) => {
        if((workshopEndDateMin==null)){
            if((workshopEndDateMax==null)){
                return true ;
            }
            if((workshopEndDate < new Date(workshopEndDateMax))){
                return true ;
            }
           return false ;
        } else {
            if((workshopEndDateMax==null)){
                if((workshopEndDate > new Date(workshopEndDateMin))){
                    return true ;
                }
            }
            if ((workshopEndDate > new Date(workshopEndDateMin))&&(workshopEndDate < new Date(workshopEndDateMax)))
            return true; 
            return false; 
          }
      },
      facturation: (facturation) => {
        
            if((dateFacturationMin==null)){
                if((dateFacturationMax==null)){
                    return true ;
                }
                if((facturation.DateFacturation < new Date(dateFacturationMax))){
                    return true ;
                }
               return false ;
            } else {
                if((dateFacturationMax==null)){
                    if((facturation.DateFacturation > new Date(dateFacturationMin))){
                        return true ;
                    }
                }
                if ((facturation.DateFacturation > new Date(dateFacturationMin))&&(facturation.DateFacturation < new Date(dateFacturationMax)))
                return true; // case sensitive
               
                return false; // case sensitive
             
              }
          },
    };

    try{
        const filterKeys = Object.keys(filters);
        const result= dossiers.filter(item => {
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


module.exports = router ; 