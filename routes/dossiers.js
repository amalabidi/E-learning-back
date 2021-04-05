var express = require('express');
var router = express.Router();
var {Dossier} = require('../modules/dossier') ; 
var {Client} = require ('../modules/client') ; 

/* créer un nouveau dossier  */ 

router.post('/' , async (req , res )=>{
    
    const {civility ,firstName , lastName , dateOfBirth,email ,mobile,fixe,adresse,
         codePostal , ville , budgetCPF , budgetDIF , difDisponibility , qualification,rechercheEmploi  
       } = req.body ; 
    var clientId ="" ; 
     try{

      const client = new Client({civility,firstName, lastName,dateOfBirth,email , mobile,fixe, 
                                 adresse,codePostal,ville, budgetCPF, budgetDIF, difDisponibility,
                                 qualification , rechercheEmploi }) ;
       clientId= client['_id'] ;
       const results= await client.save() ;
       
       if(results){
        const { status ,type ,rappelGestionnaire ,dateRappel,provenance ,statusCall,
        vendeur, categorie } = req.body ;  
        try {
        const client = clientId ; 
        const dossier = new Dossier({ status ,  type , rappelGestionnaire , dateRappel ,
                                      provenance ,statusCall ,vendeur , categorie , client}) ; 
        console.log(dossier);

        const results = await  dossier.save() ; 
        res.status(200).send(results) ; 

      } catch(e){
        res.status(201).send(e) ; }
    
    } else{
        res.status(202).send(results) ; }
     }
     catch(e){
         res.status(202).send(e); 
     }
})

module.exports = router;