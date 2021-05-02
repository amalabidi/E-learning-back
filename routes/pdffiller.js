const router = require("express").Router();
var pdfFiller   = require('pdffiller');
var {Dossier} = require('../modules/dossier') ; 





router.post("/fill",async(req,res)=>{

var sourcePDF = req.body.pdfPath;
var dossierId= req.body.dossierId ; 
var destinationPDF =  "public/test_complete.pdf";
 
try{

    const result = await Dossier.findOne({_id:dossierId}).populate("idWorkshop").populate("evaluation") ; 


  if(result){
    res.status(200).send(result) ; 
  }else{
    res.status(401).send("dossier not found ") ; 
  }
  

}catch(e){

 res.status(400).send(e) ; 

}


var data = {
        "Formation" : "John",
        "first_name" : "Doe",
        "date" : "Jan 1, 2013",
        "football" : "Off",
        "baseball" : "Yes",
        "basketball" : "Off",
        "hockey" : "Yes",
        "nascar" : "Off"
    };
    

 //pdfFiller.fillForm( sourcePDF, destinationPDF, data, function(err) {
 //   if (err) console.log( err);
  //  console.log("In callback (we're done).");
//});

})

module.exports=router ; 