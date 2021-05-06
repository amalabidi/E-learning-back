var SignrequestClient = require('signrequest-client');
var express = require('express');
const { Signature } = require('../modules/signature');
const { JournalAppel } = require('../modules/JournalAppel');
const { Dossier } = require('../modules/dossier');
const { Modification } = require('../modules/modification');
var router = express.Router();
var defaultClient = SignrequestClient.ApiClient.instance;

// Configure API key authorization: Token
var Token = defaultClient.authentications["Token"];
Token.apiKey = "20f3458acb1736fcfb8534328a0bf88a0f3beb0e";
Token.apiKeyPrefix = "Token";


// retrieve the documents created and return list of documents

router.get('/documents',async(req,res)=>{
    var apiInstance = new SignrequestClient.DocumentsApi();
    var opts = {
      'page': 1,
      'limit': 20
    };
    
    var callback = function(error, data, response) {
      if (error) {
        res.status(404).send(error) ;
      } else {
        console.log('API called successfully. Returned data: ' + data);
        res.send(JSON.parse(response["text"]));
      }
    };

    apiInstance.documentsList(opts, callback); 
})

// this route  returns  documents that  haave at least one signer with  a "need_to_sign" true  and
// he didn't sign yet  .  it returns documents which are missing required signatures

router.get('/documents/notsigned',async(req,res)=>{
 
  var apiInstance = new SignrequestClient.DocumentsApi();
  var list=new Array() ;
  var opts = {
    'page': 1,
    'limit': 20000
  };
  
  var callback = function(error, data, response)  {
    if (error) {
      res.status(404).send(error) ;
    } else {
      console.log('API called successfully. Returned data: ' + data);
      var tab=JSON.parse(response["text"])["results"] ;

      tab.forEach((element)=>{
       
        var signers = element["signrequest"]["signers"] ;
           
           for(i=0 ; i<signers.length ; i++){
            
              if(signers[i]["needs_to_sign"]&&(!signers[i]["signed"])){
            
                list.push(element) ;
                 break ;
               }
          }

          }) ;          
        

        res.send(list); }}
  apiInstance.documentsList(opts, callback); 
})



// count signed documents 


router.get('/documents/compteurSigned',async(req,res)=>{
 
  var apiInstance = new SignrequestClient.DocumentsSearchApi();
  
  var opts = {
    'status': 'si'
  };
  
  var callback = function(error, data, response) {
    if (error) {
      res.status(404).send(error) ;
    } else {
  
      var tab =JSON.parse(response["text"])['results']  ;
  
      beginDate = req.body.beginDate ; 
      endDate =  req.body.endDate ; 
      const filters = {
        
        finished_on: (finished_on) => {
               
  
           if ((new Date(finished_on) >= new Date(beginDate))&&(new Date(finished_on) <= new Date(endDate))) { 
              
            return true;
            }
    
            return false;
          }
        }
  
      try{
  
          const filterKeys = Object.keys(filters);
  
          const result = tab.filter((item) => {
            // validates all filter criteria
            return filterKeys.every((key) => {
              // ignores non-function predicates
              if (typeof filters[key] !== "function") return true;
              return filters[key](item[key]);
            });
          });
  
          res.status(200).send("Consommation Signature : " + result.length);
  
      }catch(e){
  
     res.status(400).send(e) ; 
      }
      
    }
  };
  
  apiInstance.documentsSearchList(opts, callback);
    
  })
  
  









// retrieve created documents   and return their uuids  

router.get('/documents/uuid',async(req,res)=>{
    var apiInstance = new SignrequestClient.DocumentsApi();
    var list=new Array() ;
    var opts = {
      'page': 1,
      'limit': 20
    };
    
    var callback = function(error, data, response) {
      if (error) {
        res.status(404).send(error) ;
      } else {
        console.log('API called successfully. Returned data: ' + data);
       var tab = JSON.parse(response["text"])["results"] ;

       tab.forEach((element)=>{
       
        list.push(element["uuid"]) ;  
           })
        res.send(list);
      }
    };

    apiInstance.documentsList(opts, callback); 
})

// return the url of a signed document by giving it's uuid 

router.get('/documents/signedUrl',async(req,res)=>{
   
var apiInstance = new SignrequestClient.DocumentsApi();
var uuid = req.body['uuid'];

var callback = function(error, data, response) {
  if (error) {
    res.status(404).send(error) ;
  } else {

    console.log('API called successfully. Returned data: ' + data);
    res.send(JSON.parse(response['text']).pdf) ;

  }
};

apiInstance.documentsRead(uuid, callback);

   
})






// create a document by giving it's url in the cloud  
//it returns a document object that contains the url of the document  in the api 

router.post('/documents',async(req,res)=>{

var api = new SignrequestClient.DocumentsApi();
var data = new SignrequestClient.Document();
var url = req.body["documentUrl"] ; 

data.file_from_url =url ;

var callback = function(error, data, response) {
  if (error) {
    res.status(404).send(error) ;
  } else {
    console.log("API called successfully. Returned data: " + data);
     
    const     result=JSON.parse(response["text"]) ; 

    res.send(result)   ;
}
};
 api.documentsCreate(data, callback);

})


//  create  a sign request of an already created document 
// it requires an  url given by the API after  creating the document 
//ex :"https://signrequest.com/api/v1/documents/3bfe4a65-fa58-4be4-b3fd-095cf62a097e/
// it requires signers wich is a table of maps each map represent a signer  
// for sms verification you need to provide "verify_phone_number" for that signer 
// from_email represents the email of the user that demands the signature 

router.post('/req' , async(req,res)=>{

var data2 = new SignrequestClient.SignRequest();
var apiInstance = new SignrequestClient.SignrequestsApi();
var {file_url,signers , from_email,send_reminders} = req.body ;
 
var dossier_Id = req.body.dossier_Id ; 
var fileName = req.body.fileName ; 

data2.document = file_url;
data2.signers = signers ; 
data2.from_email = from_email;
data2.send_reminders=send_reminders ; 
  
  var callback = async function(error, data2, response) {
    if (error) {
      
      res.status(404).send(error) ;
    } else {
      try{
        const sg = await new Signature({dossier_Id,fileName}) ; 
        const result1 = await sg.save() ; 
  
        if(result1){
  
          try{
  
            var result2 = await Dossier.updateOne(
              {
                _id:dossier_Id,
              },
              { $push: { sigantures: sg._id } }
            );
  
            const Sujet = "Document à signer" ; 
            const Commentaire = fileName ;
            const Journal = await  new  JournalAppel({Sujet,Commentaire})   ; 
            const result3 = await Journal.save() ;
            
            if(result3){
  
              var result4 = await Dossier.updateOne(
                {
                  _id:dossier_Id,
                },
                { $push: { journalAppel : Journal._id } }
              );
            
          
              const dossier = await  Dossier.findById(dossier_Id); 
           if (dossier){
            
              const client = dossier["client"]["_id"];
              
                      console.log(client);
             const operation = "Commentaire";
            
             const user = req.body.userId; //req.user._id; after adding jwt token
          
             const modif = await new Modification({
                                      client,
                                      operation,
                                      user,});
            
             const result5 = await modif.save();
           
            console.log('API called successfully. Returned data: ' + data);
            
            const result6=JSON.parse(response["text"]) ; 
        
            res.send(result6)   ;
             }else{
               res.send("dossier not found ");
             }
            }
  
          }catch(e){
  
            res.status(403).send(e)
          }
  
  
        }else {
          res.status(402).send("siganture not created") ; 
        }
  
      }catch(e){
  
        res.status(400).send(e)
      }
     
  
    }
  };

  try{

    apiInstance.signrequestsCreate(data2, callback);

  }catch(e){

    res.send(e) ;
  }
  

})

// Use this endpoint when you need to create a document and send the SignRequest in one API call.

// create a document by giving it's url in the cloud  and   create  a sign request for that document 
// it requires an url for the document 
// it requires signers which is a table of maps each map represent a signer  
// for sms verification you need to provide "verify_phone_number" for that signer 
// from_email represents the email of the user that demands the signature 



router.post('/quickReq' , async(req,res)=>{

 var apiInstance = new SignrequestClient.SignrequestQuickCreateApi();
var data = new SignrequestClient.SignRequestQuickCreate();
var {file_from_url,signers , from_email,send_reminders} = req.body ;
var dossier_Id = req.body.dossier_Id ; 
var fileName = req.body.fileName ; 

data.signers = signers ;

data.file_from_url = file_from_url;
data.from_email = from_email;
data.send_reminders=send_reminders ; 


var callback = async function(error, data, response) {
  if (error) {
    res.status(404).send(error) ;
    try{
      const sg = await new Signature({dossier_Id,fileName}) ; 
      const result1 = await sg.save() ; 

      if(result1){

        try{

          var result2 = await Dossier.updateOne(
            {
              _id:dossier_Id,
            },
            { $push: { sigantures: sg._id } }
          );

          const Sujet = "Document à signer" ; 
          const Commentaire = fileName ;
          const Journal = await  new  JournalAppel({Sujet,Commentaire})   ; 
          const result3 = await Journal.save() ;
          
          if(result3){

            var result4 = await Dossier.updateOne(
              {
                _id:dossier_Id,
              },
              { $push: { journalAppel : Journal._id } }
            );
          
        
            const dossier = await  Dossier.findById(dossier_Id); 
         if (dossier){
          
            const client = dossier["client"]["_id"];
            
                    console.log(client);
           const operation = "Commentaire";
          
           const user = req.body.userId; //req.user._id; after adding jwt token
        
           const modif = await new Modification({
                                    client,
                                    operation,
                                    user,});
          
           const result5 = await modif.save();
         
          console.log('API called successfully. Returned data: ' + data);
          
          const result6=JSON.parse(response["text"]) ; 
      
          res.send(result6)   ;
           }else{
             res.send("dossier not found ");
           }
          }

        }catch(e){

          res.status(403).send(e)
        }


      }else {
        res.status(402).send("siganture not created") ; 
      }

    }catch(e){

      res.status(400).send(e)
    }
   
    
  }
};

apiInstance.signrequestQuickCreateCreate(data, callback);
 })
    



// delete a document by providing it's uuid 
router.delete('/documents',async(req,res)=>{
    var apiInstance = new SignrequestClient.DocumentsApi();

    var uuid = req.body;
    
    var callback = function(error, data, response) {
      if (error) {
        res.status(404).send(error) ;
      } else {
        console.log('API called successfully.');
           res.send(response) ; 
      }
    };
        apiInstance.documentsDelete(uuid, callback);
    }) 

   
// delete many documents by providing a table of uuids
 router.delete('/documents/multiple',async(req,res)=>{

        var apiInstance = new SignrequestClient.DocumentsApi();
        
        var {uuid} = req.body;
        
        var callback = function(error, data, response) {
          if (error) {
            console.error(error);
          } else {
            console.log('API called successfully.');
               res.send(response) ; 
          }
        };
        
        uuid.forEach((element)=>{
            apiInstance.documentsDelete(element, callback);
        })    })
        



module.exports=router ; 
