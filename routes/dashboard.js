var express = require("express");
const { Dossier } = require("../modules/dossier");
const { Workshop } = require("../modules/workshop");
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    const resultats = [];
    const dossiers = await Dossier.find({}).populate("facturation");

    var total = 0;
    if (dossiers.length != 0) {

      console.log("1")
      total = 0;
      const valide = await Dossier.find({
        status: "Validé",
      }).populate("facturation");
      var val = {
        nombreTotalValide: 0,
        totalCoutValide: 0,
      };
      if (valide.length != 0) {
        valide.forEach(function (dossier) {
          total += dossier.facturation.MontantFacture;
        });
        val = {
          nombreTotalValide: valide.length,
          totalCoutValide: total,
        };
        resultats.push(val);
      } else {
        resultats.push({ nombreTotalValide: 0, totalCoutValide: 0 });
      }
      dossiers.forEach(function (dossier) {
        console.log(dossier.facturation.MontantFacture)
        total += dossier.facturation.MontantFacture;
      });

      const doss = {
        nombreTotalDossiers: dossiers.length - val.nombreTotalValide,
        totalCoutDossiers: total - val.totalCoutValide,
      };
      resultats.push(doss);
      total = 0;
      const entreeAFaire = await Dossier.find({
        status: "Entrée à faire",
      }).populate("facturation");
      console.log("entree a faire", entreeAFaire);
      if (entreeAFaire.length != 0) {
        entreeAFaire.forEach(function (dossier) {
          total += dossier.facturation.MontantFacture;
        });
        const Entree = {
          nombreTotalEntreeAFaire: entreeAFaire.length,
          totalCoutEntreeAFaire: total,
        };
        resultats.push(Entree);
      } else {
        resultats.push({
          nombreTotalEntreeAFaire: 0,
          totalCoutEntreeAFaire: 0,
        });
      }
      total = 0;
      const EnFormation = await Dossier.find({
        status: "En Formation",
      }).populate("facturation");
      if (EnFormation.length != 0) {
        EnFormation.forEach(function (dossier) {
          total += dossier.facturation.MontantFacture;
        });
        const Enformation = {
          nombreTotalEnFormation: EnFormation.length,
          totalCoutEnFormation: total,
        };
        resultats.push(Enformation);
      } else {
        resultats.push({ nombreTotalEnFormation: 0, totalCoutEnFormation: 0 });
      }
      total = 0;
      const AEvaluer = await Dossier.find({
        status: "Evaluation à faire",
      }).populate("facturation");
      if (AEvaluer.length != 0) {
        AEvaluer.forEach(function (dossier) {
          total += dossier.facturation.MontantFacture;
        });
        const evalue = {
          nombreTotalAEvaluer: AEvaluer.length,
          totalCoutAEvaluer: total,
        };
        resultats.push(evalue);
      } else {
        resultats.push({ nombreTotalAEvaluer: 0, totalCoutAEvaluer: 0 });
      }
      total = 0;
      const ADeclarer = await Dossier.find({
        status: "Service à déclarer",
      }).populate("facturation");
      if (ADeclarer.length != 0) {
        ADeclarer.forEach(function (dossier) {
          total += dossier.facturation.MontantFacture;
        });
        const declarer = {
          nombreTotalADeclarer: ADeclarer.length,
          totalCoutADeclarer: total,
        };
        resultats.push(declarer);
      } else {
        resultats.push({ nombreTotalADeclarer: 0, totalCoutADeclarer: 0 });
      }
      total = 0;
      const Declare = await Dossier.find({
        status: "Service déclaré",
      }).populate("facturation");
      if (Declare.length != 0) {
        Declare.forEach(function (dossier) {
          total += dossier.facturation.MontantFacture;
        });
        const declare = {
          nombreTotalDeclarer: Declare.length,
          totalCoutDeclarer: total,
        };
        resultats.push(declare);
      } else {
        resultats.push({ nombreTotalDeclarer: 0, totalCoutDeclarer: 0 });
      }
      total = 0;
      const Facture = await Dossier.find({ status: "Facturé" }).populate(
        "facturation"
      );
      if (Facture.length != 0) {
        var monthP=[0,0,0,0,0,0,0,0,0,0,0,0]
        Facture.forEach(function (dossier) {
          const m=dossier.workshopBeginDate.getMonth()
          
          if(m==0){
            monthP[0]+=dossier.facturation.MontantFacture
          }
          if(m==1){
            monthP[1]+=dossier.facturation.MontantFacture
          }
          if(m==2){
            monthP[2]+=dossier.facturation.MontantFacture
          }
          if(m==3){
            monthP[3]+=dossier.facturation.MontantFacture
          }
          if(m==4){
            monthP[4]+=dossier.facturation.MontantFacture
          }
          if(m==5){
            monthP[5]+=dossier.facturation.MontantFacture
          }
          if(m==6){
            monthP[6]+=dossier.facturation.MontantFacture
          }
          if(m==7){
            monthP[7]+=dossier.facturation.MontantFacture
          }
          if(m==8){
            monthP[8]+=dossier.facturation.MontantFacture
          }
          if(m==9){
            monthP[9]+=dossier.facturation.MontantFacture
          }
          if(m==10){
            monthP[10]+=dossier.facturation.MontantFacture
          }
          if(m==11){
            monthP[11]+=dossier.facturation.MontantFacture
          }

          total += dossier.facturation.MontantFacture;
        });
        const facturer = {
          nombreTotalFacturer: Facture.length,
          totalCoutFacturer: total,
        };
        resultats.push(facturer);
      } else {
        resultats.push({ nombreTotalFacturer: 0, totalCoutFacturer: 0 });
      }
      total = 0;
      const Factor = await Dossier.find({ status: "Factor" }).populate(
        "facturation"
      );
      if (Factor.length != 0) {
        Factor.forEach(function (dossier) {
          total += dossier.facturation.MontantFacture;
        });
        const factor = {
          nombreTotalFactor: Factor.length,
          totalCoutFactor: total,
        };
        resultats.push(factor);
      } else {
        resultats.push({ nombreTotalFactor: 0, totalCoutFactor: 0 });
      }
      total = 0;
      const Paye = await Dossier.find({ status: "Payé" }).populate(
        "facturation"
      );
      var month=[0,0,0,0,0,0,0,0,0,0,0,0]
      if (Paye.length != 0) {
        Paye.forEach(function (dossier) {
          const m=dossier.workshopBeginDate.getMonth()
          
          if(m==0){
            month[0]+=dossier.facturation.MontantFacture
          }
          if(m==1){
            month[1]+=dossier.facturation.MontantFacture
          }
          if(m==2){
            month[2]+=dossier.facturation.MontantFacture
          }
          if(m==3){
            month[3]+=dossier.facturation.MontantFacture
          }
          if(m==4){
            month[4]+=dossier.facturation.MontantFacture
          }
          if(m==5){
            month[5]+=dossier.facturation.MontantFacture
          }
          if(m==6){
            month[6]+=dossier.facturation.MontantFacture
          }
          if(m==7){
            month[7]+=dossier.facturation.MontantFacture
          }
          if(m==8){
            month[8]+=dossier.facturation.MontantFacture
          }
          if(m==9){
            month[9]+=dossier.facturation.MontantFacture
          }
          if(m==10){
            month[10]+=dossier.facturation.MontantFacture
          }
          if(m==11){
            month[11]+=dossier.facturation.MontantFacture
          }
  
          total += dossier.facturation.MontantFacture;
        });
        const monthPaye ={
          totalP: month
        }
        const monthFact ={
          totalF: monthP
        }
        const payer = {
          nombreTotalPayer: Paye.length,
          totalCoutPayer: total,
        };

        resultats.push(payer);
        resultats.push(monthPaye)
        resultats.push(monthFact)

      } else {
        resultats.push({ nombreTotalPayer: 0, totalCoutPayer: 0 });
      }
    } else {
      resultats.push({ nombreTotalDossiers: 0, totalCoutDossiers: 0 });
    }

    res.send(resultats);
    console.log(resultats);
  } catch (e) {
    res.send(e);
  }
});
module.exports = router;