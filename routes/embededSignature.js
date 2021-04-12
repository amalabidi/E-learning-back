var SignrequestClient = require('signrequest-client');
var express = require('express');
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
        console.error(error);
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
      console.error(error);
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
        console.error(error);
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
    console.error(error);
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
    console.error(error);
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
 


data2.document = file_url;
data2.signers = signers ; 
data2.from_email = from_email;
data2.send_reminders=send_reminders ; 
  
  var callback = function(error, data2, response) {
    if (error) {
      console.error(error);
    } else {
      console.log('API called successfully. Returned data: ' + data2);
      res.send(response) ;
    }
  };

  apiInstance.signrequestsCreate(data2, callback);

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

data.signers = signers ;

data.file_from_url = file_from_url;
data.from_email = from_email;
data.send_reminders=send_reminders ; 

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
    const     result=JSON.parse(response["text"]) ; 

    res.send(result)   ;
    
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
        console.error(error);
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
