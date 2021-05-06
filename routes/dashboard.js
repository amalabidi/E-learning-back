var express = require("express");
const { Dossier } = require("../modules/dossier");
const { Workshop } = require("../modules/workshop");
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    const resultats = [];
    const dossiers = await Dossier.find({}).populate("idWorkshop");

    var total = 0;
    if (dossiers.length != 0) {
      dossiers.forEach(function (dossier) {
        total += dossier.idWorkshop.tarif - dossier.remise;
      });

      const doss = {
        nombreTotalDossiers: dossiers.length,
        totalCoutDossiers: total,
      };
      resultats.push(doss);
      total = 0;
      const valide = await Dossier.find({ status: "Validé" }).populate(
        "idWorkshop"
      );
      if (valide.length != 0) {
        valide.forEach(function (dossier) {
          total += dossier.idWorkshop.tarif - dossier.remise;
        });
        const val = {
          nombreTotalValide: valide.length,
          totalCoutValide: total,
        };
        resultats.push(val);
      } else {
        resultats.push({ nombreTotalValide: 0, totalCoutValide: 0 });
      }

      total = 0;
      const entreeAFaire = await Dossier.find({
        status: "Entrée à faire",
      }).populate("idWorkshop");
      console.log("entree a faire", entreeAFaire);
      if (entreeAFaire.length != 0) {
        entreeAFaire.forEach(function (dossier) {
          total += dossier.idWorkshop.tarif - dossier.remise;
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
        status: "En formation",
      }).populate("idWorkshop");
      if (EnFormation.length != 0) {
        EnFormation.forEach(function (dossier) {
          total += dossier.idWorkshop.tarif - dossier.remise;
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
      }).populate("idWorkshop");
      if (AEvaluer.length != 0) {
        AEvaluer.forEach(function (dossier) {
          total += dossier.idWorkshop.tarif - dossier.remise;
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
      }).populate("idWorkshop");
      if (ADeclarer.length != 0) {
        ADeclarer.forEach(function (dossier) {
          total += dossier.idWorkshop.tarif - dossier.remise;
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
      }).populate("idWorkshop");
      if (Declare.length != 0) {
        Declare.forEach(function (dossier) {
          total += dossier.idWorkshop.tarif - dossier.remise;
        });
        const declare = {
          nombreTotalDeclaré: Declare.length,
          totalCoutDeclaré: total,
        };
        resultats.push(declare);
      } else {
        resultats.push({ nombreTotalDeclaré: 0, totalCoutDeclaré: 0 });
      }
      total = 0;
      const Facture = await Dossier.find({ status: "Facturé" }).populate(
        "idWorkshop"
      );
      if (Facture.length != 0) {
        Facture.forEach(function (dossier) {
          total += dossier.idWorkshop.tarif - dossier.remise;
        });
        const facturer = {
          nombreTotalFacturé: Facture.length,
          totalCoutFacturé: total,
        };
        resultats.push(facturer);
      } else {
        resultats.push({ nombreTotalFacturé: 0, totalCoutFacturé: 0 });
      }
      total = 0;
      const Factor = await Dossier.find({ status: "Factor" }).populate(
        "idWorkshop"
      );
      if (Factor.length != 0) {
        Factor.forEach(function (dossier) {
          total += dossier.idWorkshop.tarif - dossier.remise;
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
        "idWorkshop"
      );

      if (Paye.length != 0) {
        Paye.forEach(function (dossier) {
          total += dossier.idWorkshop.tarif - dossier.remise;
        });
        const payer = {
          nombreTotalPayé: Paye.length,
          totalCoutPayé: total,
        };

        resultats.push(payer);
      } else {
        resultats.push({ nombreTotalPayé: 0, totalCoutPayé: 0 });
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
