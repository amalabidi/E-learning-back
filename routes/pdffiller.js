const router = require("express").Router();
var pdfFiller   = require('pdffiller');
var fillPdf = require("fill-pdf");
var {fichier, Fichier} = require('../modules/fichier') ; 
const { Dossier } = require("../modules/dossier");



router.post("/fill", async(req,res)=>{

var sourcePDF2 = "./public/2emeDocumentTemplate.pdf"//req.body.pdfPath;
var namePDF2= "filledPDF2 "+Date.now()+".pdf"
var destinationPDF2 =  "./uploads/filledpdf/"+namePDF2;


  const  {dossier_Id,
    client,
intitule,
region,
today,
organisme,
coordOrganisme,
directeur,
entrepriseClient,
beginDate,
endDate,
duree,
attentes1,
attentes2,
attentes3,
attentes4,
deroulement,
prochainesAttentes,
autorisation,
estimation,
questionsRestées,
avisPasserelle,
avisExplication,
suggestions,
connaissance,
correspondanceFormation,
implicationStagiaire,
programmeVu,
progressionStagiaire,
  }=req.body ;


var formData2 = {"client":client,
  "intitule":intitule,
  "region":region,
  "today":today,
  "organisme":organisme,
  "coordOrganisme":coordOrganisme,
  "directeur":directeur,
  "entrepriseClient":entrepriseClient,
  "beginDate":beginDate,
  "endDate":endDate,
  "duree":duree,
  "attentes1":attentes1,
  "attentes2":attentes2,
  "attentes3":attentes3,
  "attentes4":attentes4,
  "deroulement":deroulement,
  "prochainesAttentes":prochainesAttentes,
  "autorisation":autorisation,
  "estimation":estimation,
  "questionsRestées":questionsRestées,
  "avisPasserelle":avisPasserelle,
  "avisExplication":avisExplication,
  "suggestions":suggestions,
  "connaissance":connaissance,
  "correspondanceFormation":correspondanceFormation,
  "implicationStagiaire":implicationStagiaire,
  "programmeVu":programmeVu,
  "progressionStagiaire":progressionStagiaire,};    

 
pdfFiller.fillForm( sourcePDF2, destinationPDF2, formData2,async function(err,output) {
    if (err) 
    {console.log(err) ; 
    res.status(502).send(err) ;
    }
    else{
      console.log("In callback 1 (we're done).");

      const f2 = new Fichier({name : namePDF2}) ;
      f2.save() ;

      var result2 = await Dossier.update(
        {
          _id:dossier_Id,
        },
        { $push: { filledFiles: f2._id } }
      );

         

      var sourcePDF1 =  "./public/1erDocumentTemplate.pdf";
      var namePDF1 = "filledPDF1 "+Date.now()+".pdf";
      var destinationPDF1 = "./uploads/filledpdf/"+namePDF1 ;
   
      const { 
        reference,
        Objectifs,
        Prerequis,
        certification,
        organisme,
        duree,
        public,
        website,
        organismeMail,
        num_activite,
        region,
        organismeTel,
        coordOrganisme,
        siret,
        NAF,
        adresseOrganisme,
        Contenu,
        modalitePedagogique,
        client,
        adresse,
        intitule,
        DateDebut,
        prixAction,
        directeur,
      } = req.body;
    


      var data1 = {
        reference: reference,
        objectifs: Objectifs,
        Prerequis: Prerequis,
        Certification: certification,
        organisme: organisme,
        Duree: duree,
        Public: public,
        website: website,
        organismeMail: organismeMail,
        num_activite: num_activite,
        region: region,
        organismeTel: organismeTel,
        coordOrganisme: coordOrganisme,
        siret: siret,
        NAF: NAF,
        adresseOrganisme: adresseOrganisme,
        contenu: Contenu,
        Modalité_pedagogique: modalitePedagogique,
        client: client,
        adresse_client: adresse,
        intitule: intitule,
        date_debut: DateDebut,
        prix_action: prixAction,
        date_valence: Date.now(),
        directeur: directeur,
      };
    
      pdfFiller.fillForm( sourcePDF1, destinationPDF1, data1, async function(err) {
        if (err) {
          res.status(501).send(err);
        }
        else{ 
          console.log("In callback (we're done).");
          const f1 = new Fichier({name : namePDF1}) ;
          f1.save() ;

          var result1 = await Dossier.update(
            {
              _id:dossier_Id,
            },
            { $push: { filledFiles: f1._id } }
          );

          if(result1){
            res.status(200).send("done") ; 
          }else{

          }
    
            
         }});
    }
});


});





module.exports=router ; 