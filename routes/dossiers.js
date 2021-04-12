var express = require("express");
var router = express.Router();
var { Dossier } = require("../modules/dossier");
var { Client } = require("../modules/client");
const { PreEvaluation } = require("../modules/PreEvaluation");
const { Evaluation } = require("../modules/Evaluation");
const { CRCoach } = require("../modules/CRCoach");
const { Facturation } = require("../modules/Facturation");
const nodemailer = require("nodemailer");

/* créer un nouveau dossier  */

router.post("/", async (req, res) => {
  var clientId = "";
  var preEvaluationId = "";
  var evaluationId = "";
  var crCoachId = "";
  var facturationId = "";

  const {
    civility,
    firstName,
    lastName,
    dateOfBirth,
    email,
    mobile,
    fixe,
    adresse,
    codePostal,
    ville,
    budgetCPF,
    budgetDIF,
    difDisponibility,
    qualification,
    rechercheEmploi,
  } = req.body;
  try {
    const client = new Client({
      civility,
      firstName,
      lastName,
      dateOfBirth,
      email,
      mobile,
      fixe,
      adresse,
      codePostal,
      ville,
      budgetCPF,
      budgetDIF,
      difDisponibility,
      qualification,
      rechercheEmploi,
    });
    clientId = client["_id"];
    const results = await client.save();
    if (results) {
      const {
        langue,
        niveau,
        niveauEstimation,
        note,
        grammaire,
        vocabulaire,
        comprehensionOrale,
      } = req.body;
      try {
        const preEvaluation = new PreEvaluation({
          langue,
          niveau,
          niveauEstimation,
          note,
          grammaire,
          vocabulaire,
          comprehensionOrale,
        });
        const preEvaluationResults = await preEvaluation.save();
        preEvaluationId = preEvaluation["_id"];
        if (preEvaluationResults) {
          const {
            attentes,
            duree,
            prochainesAttentes,
            autorisation,
            estimation,
            questionsRestées,
            avisPasserelle,
            avisExplication,
            suggestions,
          } = req.body;

          try {
            const evaluation = new Evaluation({
              attentes,
              duree,
              prochainesAttentes,
              autorisation,
              estimation,
              questionsRestées,
              avisPasserelle,
              avisExplication,
              suggestions,
            });
            const evaluationResults = await evaluation.save();
            evaluationId = evaluationResults["_id"];
            if (evaluationResults) {
              const {
                connaissance,
                correspondanceFormation,
                implicationStagiaire,
                compteRenduFormation,
                programmeVu,
                progressionStagiaire,
              } = req.body;

              try {
                const crCoach = new CRCoach({
                  connaissance,
                  correspondanceFormation,
                  implicationStagiaire,
                  compteRenduFormation,
                  programmeVu,
                  progressionStagiaire,
                });
                const crCoachResults = await crCoach.save();
                crCoachId = crCoach["_id"];
                if (crCoachResults) {
                  const {
                    MontantFacture,
                    CoutElearning,
                    DateReglementElearning,
                    CoutCertification,
                    DateReglementCertif,
                    ElearningPaye,
                    CertifPaye,
                    AutreCout1,
                    AutreCout2,
                    DateReglementCout1,
                    DateReglementCout2,
                    Cout1Paye,
                    Cout2Paye,
                    CoutCoach,
                    DateReglementCoach,
                    CoachPaye,
                    CoutVendeur,
                    DateReglementVendeur,
                    VendeurPaye,
                    Factor,
                  } = req.body;
                  try {
                    const facturation = new Facturation({
                      MontantFacture,
                      CoutElearning,
                      DateReglementElearning,
                      CoutCertification,
                      DateReglementCertif,
                      ElearningPaye,
                      CertifPaye,
                      AutreCout1,
                      AutreCout2,
                      DateReglementCout1,
                      DateReglementCout2,
                      Cout1Paye,
                      Cout2Paye,
                      CoutCoach,
                      DateReglementCoach,
                      CoachPaye,
                      CoutVendeur,
                      DateReglementVendeur,
                      VendeurPaye,
                      Factor,
                    });

                    const facturationResults = await facturation.save();
                    facturationId = facturation["_id"];
                    if (facturationResults) {
                      const {
                        status,
                        type,
                        rappelGestionnaire,
                        dateRappel,
                        provenance,
                        statusCall,
                        vendeur,
                        categorie,
                        entreprise,
                        numeroEdOF,
                        confidentialObservation,
                        idWorkshop,
                        priseEnCharge,
                        remise,
                        workshopBeginDate,
                        workshopEndDate,
                        workshopDescription,
                        coaching,
                        coach,
                        certification,
                        certificationId,
                        certificationPassword,
                        appointments,
                        performedAppointments,
                        appointmentsObservation,
                      } = req.body;
                      try {
                        const client = clientId;
                        const preEvaluation = preEvaluationId;
                        const evaluation = evaluationId;
                        const crCoach = crCoachId;
                        const facturation = facturationId;

                        const dossier = new Dossier({
                          status,
                          type,
                          rappelGestionnaire,
                          dateRappel,
                          provenance,
                          statusCall,
                          vendeur,
                          categorie,
                          client,
                          entreprise,
                          numeroEdOF,
                          confidentialObservation,
                          idWorkshop,
                          priseEnCharge,
                          remise,
                          workshopBeginDate,
                          workshopEndDate,
                          workshopDescription,
                          coaching,
                          coach,
                          certification,
                          certificationId,
                          certificationPassword,
                          appointments,
                          performedAppointments,
                          appointmentsObservation,
                          preEvaluation,
                          evaluation,
                          crCoach,
                          facturation,
                        });

                        const results = await dossier.save();
                        res.status(200).send(results);
                      } catch (e) {
                        res.status(201).send(e);
                      }
                    } else {
                      res.status(202).send("facturation not created ");
                    }
                  } catch (e) {
                    res.status(203).send(e);
                  }
                } else {
                  res.status(204).send("crCoach not created ");
                }
              } catch (e) {
                res.status(205).send(e);
              }
            } else {
              res.status(206).send("evaluation not created ");
            }
          } catch (e) {
            res.status(207).send(e);
          }
        } else {
          res.status(208).send("preEvaluation not created ");
        }
      } catch (e) {
        res.status(209).send(e);
      }
    } else {
      res.status(210).send("client not created");
    }
  } catch (e) {
    res.status(211).send(e);
  }
});

router.post("/email", async (req, res) => {
  const {
    subject,
    receivermail,
    message,
    path,
    senderEmail,
    senderpassword,
    filename,
  } = req.body;
  var transport = nodemailer.createTransport({
    host: "smtp.facacademy.fr",
    secure: false,

    auth: {
      user: senderEmail,
      pass: senderpassword,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });
  var mailOptions = {
    from: senderEmail,
    to: receivermail,
    subject: subject,
    text: message,
    attachements: [
      {
        filename: filename,
        path: path,
      },
    ],
  };
  try {
    let info = await transport.sendMail(mailOptions);
    res.send("email sent successfully");
  } catch (e) {
    res.send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await Dossier.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.put("/", async (req, res) => {
  try {
    const {
      civility,
      firstName,
      lastName,
      dateOfBirth,
      email,
      mobile,
      fixe,
      adresse,
      codePostal,
      ville,
      budgetCPF,
      budgetDIF,
      difDisponibility,
      qualification,
      rechercheEmploi,
      _id,
    } = req.body;

    let dossier = await Dossier.findById(_id);

    let idclient = dossier["client"];
    const update = {
      civility,
      firstName,
      lastName,
      dateOfBirth,
      email,
      mobile,
      fixe,
      adresse,
      codePostal,
      ville,
      budgetCPF,
      budgetDIF,
      difDisponibility,
      qualification,
      rechercheEmploi,
    };
    filter = { _id: idclient };

    let clients = await Client.findByIdAndUpdate(filter, update, {
      new: true,
    });

    if (clients) {
      const {
        langue,
        niveau,
        niveauEstimation,
        note,
        grammaire,
        vocabulaire,
        comprehensionOrale,
      } = req.body;
      try {
        updatepre = {
          langue,
          niveau,
          niveauEstimation,
          note,
          grammaire,
          vocabulaire,
          comprehensionOrale,
        };
        preevaluationid = dossier["preEvaluation"];
        filterpreEvaluation = { _id: preevaluationid };
        let preEvaluations = await PreEvaluation.findByIdAndUpdate(
          filterpreEvaluation,
          updatepre,
          {
            new: true,
          }
        );
        console.log("preevaluation");

        if (preEvaluations) {
          const {
            attentes,
            duree,
            prochainesAttentes,
            autorisation,
            estimation,
            questionsRestées,
            avisPasserelle,
            avisExplication,
            suggestions,
          } = req.body;
          try {
            updateev = {
              attentes,
              duree,
              prochainesAttentes,
              autorisation,
              estimation,
              questionsRestées,
              avisPasserelle,
              avisExplication,
              suggestions,
            };
            evaluationid = dossier["evaluation"];
            filterEvaluation = { _id: evaluationid };
            let Evaluations = await Evaluation.findByIdAndUpdate(
              filterEvaluation,
              updateev,
              {
                new: true,
              }
            );
            console.log("evaluation");

            if (Evaluations) {
              const {
                connaissance,
                correspondanceFormation,
                implicationStagiaire,
                compteRenduFormation,
                programmeVu,
                progressionStagiaire,
              } = req.body;
              try {
                updateCRCoach = {
                  connaissance,
                  correspondanceFormation,
                  implicationStagiaire,
                  compteRenduFormation,
                  programmeVu,
                  progressionStagiaire,
                };
                CRCoachid = dossier["crCoach"];
                filtercrCoach = { _id: CRCoachid };
                let crCoachs = await CRCoach.findByIdAndUpdate(
                  filtercrCoach,
                  updateCRCoach,
                  {
                    new: true,
                  }
                );

                console.log("crcoach");

                if (crCoachs) {
                  const {
                    MontantFacture,
                    CoutElearning,
                    DateReglementElearning,
                    CoutCertification,
                    DateReglementCertif,
                    ElearningPaye,
                    CertifPaye,
                    AutreCout1,
                    AutreCout2,
                    DateReglementCout1,
                    DateReglementCout2,
                    Cout1Paye,
                    Cout2Paye,
                    CoutCoach,
                    DateReglementCoach,
                    CoachPaye,
                    CoutVendeur,
                    DateReglementVendeur,
                    VendeurPaye,
                    Factor,
                    NFacturation,
                    DateFacturation,
                    NAvoir,
                    DateAvoir,
                  } = req.body;
                  try {
                    updateFacturation = {
                      MontantFacture,
                      CoutElearning,
                      DateReglementElearning,
                      CoutCertification,
                      DateReglementCertif,
                      ElearningPaye,
                      CertifPaye,
                      AutreCout1,
                      AutreCout2,
                      DateReglementCout1,
                      DateReglementCout2,
                      Cout1Paye,
                      Cout2Paye,
                      CoutCoach,
                      DateReglementCoach,
                      CoachPaye,
                      CoutVendeur,
                      DateReglementVendeur,
                      VendeurPaye,
                      Factor,
                      NFacturation,
                      DateFacturation,
                      NAvoir,
                      DateAvoir,
                    };

                    factureid = dossier["facturation"];
                    console.log(factureid);
                    filterfacture = { _id: factureid };
                    let facturations = await Facturation.findByIdAndUpdate(
                      filterfacture,
                      updateFacturation,
                      {
                        new: true,
                      }
                    );
                    console.log("facturation");

                    if (facturations) {
                      const {
                        status,
                        type,
                        rappelGestionnaire,
                        dateRappel,
                        provenance,
                        statusCall,
                        vendeur,
                        categorie,
                        entreprise,
                        numeroEdOF,
                        confidentialObservation,
                        idWorkshop,
                        priseEnCharge,
                        remise,
                        workshopBeginDate,
                        workshopEndDate,
                        workshopDescription,
                        coaching,
                        coach,
                        certification,
                        certificationId,
                        certificationPassword,
                        appointments,
                        performedAppointments,
                        appointmentsObservation,
                      } = req.body;
                      try {
                        client = idclient;
                        preEvaluation = preevaluationid;
                        evaluation = evaluationid;
                        crCoach = CRCoachid;
                        facturation = factureid;
                        updatedossier = {
                          client,
                          preEvaluation,
                          evaluation,
                          crCoach,
                          facturation,
                          status,
                          type,
                          rappelGestionnaire,
                          dateRappel,
                          provenance,
                          statusCall,
                          vendeur,
                          categorie,
                          entreprise,
                          numeroEdOF,
                          confidentialObservation,
                          idWorkshop,
                          priseEnCharge,
                          remise,
                          workshopBeginDate,
                          workshopEndDate,
                          workshopDescription,
                          coaching,
                          coach,
                          certification,
                          certificationId,
                          certificationPassword,
                          appointments,
                          performedAppointments,
                          appointmentsObservation,
                        };

                        filterdossier = { _id: req.body._id };
                        let dossiers = await Dossier.findByIdAndUpdate(
                          filterdossier,
                          updatedossier,
                          {
                            new: true,
                          }
                        );
                        res.send("okk");
                        console.log("done");
                      } catch (e) {
                        res.status(201).send(e);
                      }
                    } else {
                      res.status(202).send("facturation not updated ");
                    }
                  } catch (e) {
                    res.status(203).send(e);
                  }
                } else {
                  res.status(204).send("crCoach not updated ");
                }
              } catch (e) {
                res.status(205).send(e);
              }
            } else {
              res.status(206).send("evaluation not updated ");
            }
          } catch (e) {
            res.status(207).send(e);
          }
        } else {
          res.status(208).send("preEvaluation not updated ");
        }
      } catch (e) {
        res.status(209).send(e);
      }
    } else {
      res.status(210).send("client not updated");
    }
  } catch (e) {
    res.status(211).send(e);
  }
});

module.exports = router;
