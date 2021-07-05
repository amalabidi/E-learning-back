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


function countOccurences(tab){
	var result = {};
	tab.forEach(function(elem){
		if(elem in result){
			result[elem] = ++result[elem];
		}
		else{
			result[elem] = 1;
		}
	});
	return result;
}

function compare( a, b ) {
  if ( a < b ){
    return 1;
  }
  if ( a > b ){
    return -1;
  }
  return 0;
}

router.post("/fill", async (req, res) => {

  const {
    numeroDa,
    siret,
    codeNAF,
    email,
    telephone,
    dateDebutExerciceComptable,
    dateFinExerciceComptable,
    dirigeantNomPrenom,
    dirigeantFonction,
    lieu,
    date,
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
  /*Cadre  F3 */
  dontNiveau1NbHeures=0
  dontNiveau1NbStagiaires=0
  const Niveau1NbStagiaires = await Dossier.find({}).populate({path:"idWorkshop",match:{ niveau_form:"A1 Formation enregistrée au Répertoire national des certifications professionnelles (RNCP) de niveau 6 à 8"}})                                                                             
  Niveau1NbStagiaires.forEach(s=>{
    if(s.idWorkshop){
      dontNiveau1NbStagiaires++
      dontNiveau1NbHeures=dontNiveau1NbHeures+s.idWorkshop.nombre_Heures
    }
  })
  dontNiveau3NbHeures=0
  dontNiveau3NbStagiaires=0
  const Niveau3NbStagiaires = await Dossier.find({}).populate({path:"idWorkshop",match:{ niveau_form:"A2 Formation enregistrée au Répertoire national des certifications professionnelles (RNCP) de niveau 5"}})                                                                             
  Niveau3NbStagiaires.forEach(s=>{
    if(s.idWorkshop){
      dontNiveau3NbStagiaires++
      dontNiveau3NbHeures=dontNiveau3NbHeures+s.idWorkshop.nombre_Heures

    }
  })    
  dontNiveau4NbHeures=0
  dontNiveau4NbStagiaires=0
  const Niveau4NbStagiaires = await Dossier.find({}).populate({path:"idWorkshop",match:{ niveau_form:"A3 Formation enregistrée au Répertoire national des certifications professionnelles (RNCP) de niveau 4"}})                                                                             
  Niveau4NbStagiaires.forEach(s=>{
    if(s.idWorkshop){
      dontNiveau4NbStagiaires++
      dontNiveau4NbHeures=dontNiveau4NbHeures+s.idWorkshop.nombre_Heures

    }
  }) 
  dontNiveau5NbHeures=0
  dontNiveau5NbStagiaires=0
  const Niveau5NbStagiaires = await Dossier.find({}).populate({path:"idWorkshop",match:{ niveau_form:"A4 Formation enregistrée au Répertoire national des certifications professionnelles (RNCP) de niveau 3"}})                                                                             
  Niveau5NbStagiaires.forEach(s=>{
    if(s.idWorkshop){
      dontNiveau5NbStagiaires++
      dontNiveau5NbHeures=dontNiveau5NbHeures+s.idWorkshop.nombre_Heures

    }
  })
  dontNiveau2NbHeures2019=0
  dontNiveau2NbStagiaires2019=0
  const Niveau2NbStagiaires = await Dossier.find({}).populate({path:"idWorkshop",match:{ niveau_form:"A5 Formation enregistrée au Répertoire national des certifications professionnelles (RNCP) de niveau 2"}})                                                                             
  Niveau2NbStagiaires.forEach(s=>{
    if(s.idWorkshop){
      dontNiveau2NbStagiaires2019++
      dontNiveau2NbHeures2019=dontNiveau2NbHeures2019+s.idWorkshop.nombre_Heures

    }
  })
  dontNiveauCQPNbHeures2019=0
  dontNiveauCQPNbStagiaires2019=0
  const NiveauCQPNbStagiaires2019 = await Dossier.find({}).populate({path:"idWorkshop",match:{ niveau_form:"A6 Formation enregistrée au Répertoire national des certifications professionnelles (RNCP) : CQP sans niveau de qualification"}})                                                                             
  NiveauCQPNbStagiaires2019.forEach(s=>{
    if(s.idWorkshop){
      dontNiveauCQPNbStagiaires2019++
      dontNiveauCQPNbHeures2019=dontNiveauCQPNbHeures2019+s.idWorkshop.nombre_Heures

    }
  }) 
  formationVisantDiplomeRNCPNbHeures=dontNiveau1NbHeures+dontNiveau3NbHeures+dontNiveau4NbHeures+dontNiveau5NbHeures+dontNiveau2NbHeures2019+dontNiveauCQPNbHeures2019
  formationVisantDiplomeRNCPNbStagiaires= dontNiveau1NbStagiaires+dontNiveau3NbStagiaires+dontNiveau4NbStagiaires+dontNiveau5NbStagiaires+dontNiveau2NbStagiaires2019+dontNiveauCQPNbStagiaires2019
  
  formationCQPEnrNbHeures2019=0
  formationCQPEnrNbStagiaires2019=0
  const dontformationCQPEnrNbStagiaires2019 = await Dossier.find({}).populate({path:"idWorkshop",match:{ niveau_form:"B Formation visant une certification (dont CQP) ou une habilitation (RS)"}})                                                                             
  dontformationCQPEnrNbStagiaires2019.forEach(s=>{
    if(s.idWorkshop){
      formationCQPEnrNbStagiaires2019++
      formationCQPEnrNbHeures2019=formationCQPEnrNbHeures2019+s.idWorkshop.nombre_Heures

    }
  }) 

  formationCQPNonEnrNbHeures2019=0
  formationCQPNonEnrNbStagiaires2019=0
  const dontformationCQPNonEnrNbStagiaires2019 = await Dossier.find({}).populate({path:"idWorkshop",match:{ niveau_form:"C Formation visant un CQP non enregistrée au RNCP ou au RS"}})                                                                             
  dontformationCQPNonEnrNbStagiaires2019.forEach(s=>{
    if(s.idWorkshop){
      formationCQPNonEnrNbStagiaires2019++
      formationCQPNonEnrNbHeures2019=formationCQPNonEnrNbHeures2019+s.idWorkshop.nombre_Heures

    }
  }) 

  autresFormationsNbHeures=0
  autresFormationsNbStagiaires=0
  const dontautresFormationsNbStagiaires = await Dossier.find({}).populate({path:"idWorkshop",match:{ niveau_form:"D Autre formation professionnelle"}})                                                                             
  dontautresFormationsNbStagiaires.forEach(s=>{
    if(s.idWorkshop){
      autresFormationsNbStagiaires++
      autresFormationsNbHeures=autresFormationsNbHeures+s.idWorkshop.nombre_Heures

    }
  }) 

  bilanCompetenceNbHeures=0
  bilanCompetenceNbStagiaires=0
  const dontbilanCompetenceNbStagiaires = await Dossier.find({}).populate({path:"idWorkshop",match:{ niveau_form:"E Bilan de compétence"}})                                                                             
  dontbilanCompetenceNbStagiaires.forEach(s=>{
    if(s.idWorkshop){
      bilanCompetenceNbStagiaires++
      bilanCompetenceNbHeures=bilanCompetenceNbHeures+s.idWorkshop.nombre_Heures

    }
  }) 

  actionsAccompagnementVAENbHeures=0
  actionsAccompagnementVAENbStagiaires=0
  const dontactionsAccompagnementVAENbStagiaires = await Dossier.find({}).populate({path:"idWorkshop",match:{ niveau_form:"F Action d'accompagnement à la validation des acquis de l'expérience (VAE)"}})                                                                             
  dontactionsAccompagnementVAENbStagiaires.forEach(s=>{
    if(s.idWorkshop){
      actionsAccompagnementVAENbStagiaires++
      actionsAccompagnementVAENbHeures=actionsAccompagnementVAENbHeures+s.idWorkshop.nombre_Heures

    }
  }) 
  totalStagiairesObjectifGeneralPrestation=formationVisantDiplomeRNCPNbStagiaires+formationCQPEnrNbStagiaires2019+formationCQPNonEnrNbStagiaires2019+autresFormationsNbStagiaires+bilanCompetenceNbStagiaires+actionsAccompagnementVAENbStagiaires
  totalHeuresObjectifGeneralPrestation=formationVisantDiplomeRNCPNbHeures+formationCQPEnrNbHeures2019+formationCQPNonEnrNbHeures2019+autresFormationsNbHeures+bilanCompetenceNbHeures+actionsAccompagnementVAENbHeures
  /*=====================================Cadre F4===================================== */

  const resultAgg= await Dossier.find({}).populate("idWorkshop")
  specialite = []
  nb_heures = []
  resultAgg.forEach(r=>{
    specialite.push(r.idWorkshop.code_BFP)
    nb_heures.push({spec:r.idWorkshop.code_BFP,nbh:r.idWorkshop.nombre_Heures})

  })
  const occ =countOccurences(specialite)
  var sorted = Object.keys(occ).map(function(key){
    return [key, occ[key]];
  })
  sorted.sort(function(first, second) {
    return second[1] - first[1];
  })
  specialiteDeFormationLibelle0=""
  specialiteDeFormationLibelle1=""
  specialiteDeFormationLibelle2=""
  specialiteDeFormationLibelle3=""
  specialiteDeFormationLibelle4=""

  specialiteDeFormationCode0=""
  specialiteDeFormationCode1=""
  specialiteDeFormationCode2=""
  specialiteDeFormationCode3=""
  specialiteDeFormationCode4=""

  detailSpecialiteDeFormationNbStagiaires0=0
  detailSpecialiteDeFormationNbStagiaires1=0
  detailSpecialiteDeFormationNbStagiaires2=0
  detailSpecialiteDeFormationNbStagiaires3=0
  detailSpecialiteDeFormationNbStagiaires4=0

  detailSpecialiteDeFormationNbHeures0=0
  detailSpecialiteDeFormationNbHeures1=0
  detailSpecialiteDeFormationNbHeures2=0
  detailSpecialiteDeFormationNbHeures3=0
  detailSpecialiteDeFormationNbHeures4=0
  try{
    specialiteDeFormationLibelle0=sorted[0][0].substring(6,sorted[0][0].length)
    specialiteDeFormationLibelle1=sorted[1][0].substring(6,sorted[1][0].length)
    specialiteDeFormationLibelle2=sorted[2][0].substring(6,sorted[2][0].length)
    specialiteDeFormationLibelle3=sorted[3][0].substring(6,sorted[3][0].length)
    specialiteDeFormationLibelle4=sorted[4][0].substring(6,sorted[4][0].length)
  }
  catch(e){

  }
  try{
    specialiteDeFormationCode0=sorted[0][0].substring(0,3)
    specialiteDeFormationCode1=sorted[1][0].substring(0,3)
    specialiteDeFormationCode2=sorted[2][0].substring(0,3)
    specialiteDeFormationCode3=sorted[3][0].substring(0,3)
    specialiteDeFormationCode4=sorted[4][0].substring(0,3)
  }
  catch(e){

  }

  try{
    detailSpecialiteDeFormationNbStagiaires0=sorted[0][1]
    detailSpecialiteDeFormationNbStagiaires1=sorted[1][1]
    detailSpecialiteDeFormationNbStagiaires2=sorted[2][1]
    detailSpecialiteDeFormationNbStagiaires3=sorted[3][1]
    detailSpecialiteDeFormationNbStagiaires4=sorted[4][1]
  }
  catch(e){

  }
  try{
    const duree0 = nb_heures.filter(h=>h.spec==sorted[0][0])
    console.log(duree0)
    duree0.forEach(d=>{
      detailSpecialiteDeFormationNbHeures0=detailSpecialiteDeFormationNbHeures0+d.nbh
    })

    const duree1 = nb_heures.filter(h=>h.spec==sorted[1][0])
    duree1.forEach(d=>{
      detailSpecialiteDeFormationNbHeures1=detailSpecialiteDeFormationNbHeures1+d.nbh
    })

    const duree2 = nb_heures.filter(h=>h.spec==sorted[2][0])
    duree2.forEach(d=>{
      detailSpecialiteDeFormationNbHeures2=detailSpecialiteDeFormationNbHeures2+d.nbh
    })

    const duree3 = nb_heures.filter(h=>h.spec==sorted[3][0])
    duree3.forEach(d=>{
      detailSpecialiteDeFormationNbHeures3=detailSpecialiteDeFormationNbHeures3+d.nbh
    })

    const duree4 = nb_heures.filter(h=>h.spec==sorted[4][0])
    duree4.forEach(d=>{
      detailSpecialiteDeFormationNbHeures4=detailSpecialiteDeFormationNbHeures4+d.nbh
    })

    autreDetailSpecialiteDeFormationsNbHeures=0
    const duree5 = nb_heures.filter(h=>!(h.spec==sorted[0][0] || h.spec==sorted[1][0] || h.spec==sorted[2][0] ||h.spec==sorted[3][0] || h.spec==sorted[4][0]))
    duree5.forEach(d=>{
      console.log("nb_heures",d.nbh)
      autreDetailSpecialiteDeFormationsNbHeures=autreDetailSpecialiteDeFormationsNbHeures+d.nbh
    })
  }
  catch(e){

  }
  autreDetailSpecialiteDeFormationsNbStagiaires=0
  
  try{
    for(i=5;i<sorted.length;i++){
      autreDetailSpecialiteDeFormationsNbStagiaires=autreDetailSpecialiteDeFormationsNbStagiaires+sorted[i][1]
      
    }
  }
  catch(e){

  }
  totalDetailSpecialiteDeFormationNbStagiaires=detailSpecialiteDeFormationNbStagiaires0+detailSpecialiteDeFormationNbStagiaires1+detailSpecialiteDeFormationNbStagiaires2+detailSpecialiteDeFormationNbStagiaires3+detailSpecialiteDeFormationNbStagiaires4+autreDetailSpecialiteDeFormationsNbStagiaires
  totalDetailSpecialiteDeFormationNbHeures=detailSpecialiteDeFormationNbHeures0+detailSpecialiteDeFormationNbHeures1+detailSpecialiteDeFormationNbHeures2+detailSpecialiteDeFormationNbHeures3+detailSpecialiteDeFormationNbHeures4+autreDetailSpecialiteDeFormationsNbHeures

  /*===================================================================================*/
                                                                             
  var sourcePDF2 = "./public/BPF_template.pdf";
  var namePDF2 = "BPF.pdf";
  var destinationPDF2 = './uploads/filledpdf/' + namePDF2;

  var formData2 = {
    dirigeantNomPrenom:dirigeantNomPrenom,
    dirigeantFonction:dirigeantFonction,
    lieu:lieu,
    date:date,
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
    dontNiveau1NbStagiaires:dontNiveau1NbStagiaires,
    dontNiveau3NbStagiaires:dontNiveau3NbStagiaires,
    dontNiveau4NbStagiaires:dontNiveau4NbStagiaires,
    dontNiveau5NbStagiaires:dontNiveau5NbStagiaires,
    dontNiveau2NbStagiaires2019:dontNiveau2NbStagiaires2019,
    dontNiveauCQPNbStagiaires2019:dontNiveauCQPNbStagiaires2019,
    formationVisantDiplomeRNCPNbStagiaires:formationVisantDiplomeRNCPNbStagiaires,
    dontNiveau1NbHeures:dontNiveau1NbHeures,
    dontNiveau3NbHeures:dontNiveau3NbHeures,
    dontNiveau4NbHeures:dontNiveau4NbHeures,
    dontNiveau5NbHeures:dontNiveau5NbHeures,
    dontNiveau2NbHeures2019:dontNiveau2NbHeures2019,
    dontNiveauCQPNbHeures2019:dontNiveauCQPNbHeures2019,
    formationVisantDiplomeRNCPNbHeures:formationVisantDiplomeRNCPNbHeures,
    formationCQPEnrNbStagiaires2019:formationCQPEnrNbStagiaires2019,
    formationCQPNonEnrNbStagiaires2019:formationCQPNonEnrNbStagiaires2019,
    autresFormationsNbStagiaires:autresFormationsNbStagiaires,
    bilanCompetenceNbStagiaires:bilanCompetenceNbStagiaires,
    actionsAccompagnementVAENbStagiaires:actionsAccompagnementVAENbStagiaires,
    formationCQPEnrNbHeures2019:formationCQPEnrNbHeures2019,
    formationCQPNonEnrNbHeures2019:formationCQPNonEnrNbHeures2019,
    autresFormationsNbHeures:autresFormationsNbHeures,
    bilanCompetenceNbHeures:bilanCompetenceNbHeures,
    actionsAccompagnementVAENbHeures:actionsAccompagnementVAENbHeures,
    totalStagiairesObjectifGeneralPrestation:totalStagiairesObjectifGeneralPrestation,
    totalHeuresObjectifGeneralPrestation:totalHeuresObjectifGeneralPrestation,
    specialiteDeFormationLibelle0:specialiteDeFormationLibelle0,
    specialiteDeFormationLibelle1:specialiteDeFormationLibelle1,
    specialiteDeFormationLibelle2:specialiteDeFormationLibelle2,
    specialiteDeFormationLibelle3:specialiteDeFormationLibelle3,
    specialiteDeFormationLibelle4:specialiteDeFormationLibelle4,

    specialiteDeFormationCode0:specialiteDeFormationCode0,
    specialiteDeFormationCode1:specialiteDeFormationCode1,
    specialiteDeFormationCode2:specialiteDeFormationCode2,
    specialiteDeFormationCode3:specialiteDeFormationCode3,
    specialiteDeFormationCode4:specialiteDeFormationCode4,

    detailSpecialiteDeFormationNbStagiaires0:detailSpecialiteDeFormationNbStagiaires0,
    detailSpecialiteDeFormationNbStagiaires1:detailSpecialiteDeFormationNbStagiaires1,
    detailSpecialiteDeFormationNbStagiaires2:detailSpecialiteDeFormationNbStagiaires2,
    detailSpecialiteDeFormationNbStagiaires3:detailSpecialiteDeFormationNbStagiaires3,
    detailSpecialiteDeFormationNbStagiaires4:detailSpecialiteDeFormationNbStagiaires4,

    detailSpecialiteDeFormationNbHeures0:detailSpecialiteDeFormationNbHeures0,
    detailSpecialiteDeFormationNbHeures1:detailSpecialiteDeFormationNbHeures1,
    detailSpecialiteDeFormationNbHeures2:detailSpecialiteDeFormationNbHeures2,
    detailSpecialiteDeFormationNbHeures3:detailSpecialiteDeFormationNbHeures3,
    detailSpecialiteDeFormationNbHeures4:detailSpecialiteDeFormationNbHeures4,

    autreDetailSpecialiteDeFormationsNbStagiaires:autreDetailSpecialiteDeFormationsNbStagiaires,
    autreDetailSpecialiteDeFormationsNbHeures:autreDetailSpecialiteDeFormationsNbHeures,

    totalDetailSpecialiteDeFormationNbStagiaires:totalDetailSpecialiteDeFormationNbStagiaires,
    totalDetailSpecialiteDeFormationNbHeures:totalDetailSpecialiteDeFormationNbHeures,
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