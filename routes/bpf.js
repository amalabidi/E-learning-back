const router = require("express").Router();
var { fichier, Fichier } = require("../modules/fichier");
const { Dossier } = require("../modules/dossier");
const { Societe } = require("../modules/societe");
const { Facturation } = require("../modules/Facturation");
const { Cout } = require("../modules/cout")

const fs = require("fs");
const path = require("path");
const assert = require("assert");
var pdfFiller = require("pdffiller");
const { PDFDocument } = require("pdf-lib");

router.post("/fill", async (req, res) => {

  const {
    numeroDa,
    siret,
    codeNAF,
    email,
    telephone,
    dateDebutExerciceComptable,
    dateFinExerciceComptable,
  } = req.body;
  const payeParEntr = await Facturation.find({payePar:"Entreprise"})
  const cpf = await Dossier.find({cpf:true})
  const fp = await Dossier.find({financementPerso:true})
  const Couts = await Cout.find({inclut:true})
  var totalCharge=0
  Couts.forEach(cout=>{
    totalCharge = totalCharge + cout.Montant_ht
  })
  
  var totalChargeSalarie =0
  const salaries = await Cout.find({inclut:true,categorie:"Salaires des Formateurs"})
  salaries.forEach(s=>{
    totalChargeSalarie = totalChargeSalarie + s.Montant_ht
  })
  var totalChargePrest =0
  const achatPrest = await Cout.find({inclut:true,categorie:"achats des prestations"})
  achatPrest.forEach(p=>{
    totalChargePrest = totalChargePrest + p.Montant_ht
  })
  var total = cpf.length
  var totalC=total + payeParEntr.length + fp.length
  salariesEmployeursPrivesNbHeures=0
  const salariesEmployeursPrives = await Dossier.find({categorie:"Salarié"}).populate("idWorkshop")
  salariesEmployeursPrives.forEach(s=>{
    salariesEmployeursPrivesNbHeures=salariesEmployeursPrivesNbHeures+s.idWorkshop.nombre_Heures
  })
  apprentisNbHeures=0
  const apprentisNbStagiaires = await Dossier.find({categorie:"Apprenti"}).populate("idWorkshop")
  apprentisNbStagiaires.forEach(s=>{
    apprentisNbHeures=apprentisNbHeures+s.idWorkshop.nombre_Heures
  })
  personnesRechercheEmploiNbHeures=0
  const personnesRechercheEmploiNbStagiaires = await Dossier.find({categorie:"Demandeur d'emploi"}).populate("idWorkshop")
  personnesRechercheEmploiNbStagiaires.forEach(s=>{
    personnesRechercheEmploiNbHeures=personnesRechercheEmploiNbHeures+s.idWorkshop.nombre_Heures
  })
  particulierPropresFraisNbHeures=0
  const particulierPropresFraisNbStagiaires = await Dossier.find({categorie:"Particulier"}).populate("idWorkshop")
  particulierPropresFraisNbStagiaires.forEach(s=>{
    particulierPropresFraisNbHeures=particulierPropresFraisNbHeures+s.idWorkshop.nombre_Heures
  })
  autresStagiairesNbHeures=0
  const autresStagiairesNbStagiaires = await Dossier.find({categorie:"Autre"}).populate("idWorkshop")
  autresStagiairesNbStagiaires.forEach(s=>{
    autresStagiairesNbHeures=autresStagiairesNbHeures+s.idWorkshop.nombre_Heures
  })
  totalHeuresStagiaires=salariesEmployeursPrivesNbHeures+apprentisNbHeures+personnesRechercheEmploiNbHeures+particulierPropresFraisNbHeures+autresStagiairesNbHeures
  var totalF1= salariesEmployeursPrives.length + apprentisNbStagiaires.length + personnesRechercheEmploiNbStagiaires.length +particulierPropresFraisNbStagiaires.length+autresStagiairesNbStagiaires.length
  const  stagiairesADistanceNbStagiaires = await Dossier.find({}).populate({path:"idWorkshop",select:"type",match:{ type:"Présentiel"}})
  var nbStagDist=0
  stagiairesADistanceNbStagiaires.forEach(s=>{
        if(!s.idWorkshop){
            nbStagDist++
        }
  })                                                                                 
    console.log("distance",nbStagDist)                                                                                
  var sourcePDF2 = "./public/BPF_template.pdf";
  var namePDF2 = "BPF.pdf";
  var destinationPDF2 = './uploads/filledpdf/' + namePDF2;

  var formData2 = {
    numeroDa:numeroDa,
    siret:siret,
    codeNAF:codeNAF,
    email:email,
    telephone:telephone,
    dateDebutExerciceComptable:dateDebutExerciceComptable,
    dateFinExerciceComptable:dateFinExerciceComptable,
    entreprisesFormationSalaries:payeParEntr.length,
    comptePersonnelFormation:cpf.length,
    totalOrganismesParitairesCollecteursGestionnaires:total,
    contratsConclusTitreIndividuel:fp.length,
    totalGeneralProduits:totalC,
    totalChargesOrganismes:totalCharge,
    dontSalairesFormateurs:totalChargeSalarie,
    dontAchatsPrestationFormation:totalChargePrest,
    salariesEmployeursPrivesNbStagiaires:salariesEmployeursPrives.length,
    apprentisNbStagiaires:apprentisNbStagiaires.length,
    personnesRechercheEmploiNbStagiaires:personnesRechercheEmploiNbStagiaires.length,
    particulierPropresFraisNbStagiaires:particulierPropresFraisNbStagiaires.length,
    autresStagiairesNbStagiaires:autresStagiairesNbStagiaires.length,
    totalStagiaires:totalF1,
    stagiairesADistanceNbStagiaires:nbStagDist,
    salariesEmployeursPrivesNbHeures:salariesEmployeursPrivesNbHeures,
    apprentisNbHeures:apprentisNbHeures,
    personnesRechercheEmploiNbHeures:personnesRechercheEmploiNbHeures,
    particulierPropresFraisNbHeures:particulierPropresFraisNbHeures,
    autresStagiairesNbHeures:autresStagiairesNbHeures,
    totalHeuresStagiaires:totalHeuresStagiaires,
  };
  var shouldFlatten = false;
  pdfFiller.fillFormWithFlatten(
    sourcePDF2,
    destinationPDF2,
    formData2,
    shouldFlatten,
    async function (err, output) {
      if (err) {
        console.log(err);
        res.status(502).send(err);
      } else {
        console.log("In callback 1 (we're done).");
        const pdfDoc = await PDFDocument.load(fs.readFileSync(destinationPDF2));
        const pdfBytes = await pdfDoc.save();
        const newFilePath = destinationPDF2; //`${path.basename(destinationPDF1, '.pdf')}-result.pdf`;
        fs.writeFileSync(newFilePath, pdfBytes);
       
      }

      res.status(200).send("done");

    }
  );
});
router.get("/filledPdf", async (req, res) => {
  var filePath = './uploads/filledpdf/BPF.pdf';
  var stat = fs.statSync(filePath);
  res.writeHead(200, {
    'Content-Type': 'pdf',
    'Content-Length': stat.size,
    'Content-Disposition': 'attachment; Document'
  });
  var readStream = fs.createReadStream(filePath);
  readStream.on('open', function() {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
  });
  readStream.on('error', function(err) {
    res.end(err);
  });
  //res.send(pdfs);
});
router.get("/data", async (req, res)=>{
    const cpf = await Dossier.find({cpf:true})
    
    const payeParAprrenant= await Facturation.find({payePar:"Apprenant"})

})
module.exports = router;