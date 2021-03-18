const router = require("express").Router();
const { Workshop } = require("../modules/workshop");

router.post("/", async (req, res) => {
  const {
    coutCertification,
    prestataireCertification,
    intituleCertification,
    UrlCertification,
    modalitePedagogique,
    Objectifs,
    Prerequis,
    resultats_attendus,
    Duree,
    public,
    contenu,
    etat,
    type,
    environment,
    intitule,
    designation,
    referance,
    nombre_Heures,
    tarif,
    code_tarif,
    code_BFP,
    Url_formation,
    prestataire_Elearning,
    cout_Elearning,
  } = req.body;

  try {
    const workshop = new Workshop({
      intitule: intitule,
      CoutCertification: coutCertification,
      PrestataireCertification: prestataireCertification,
      intituleCertification: intituleCertification,
      UrlCertification: UrlCertification,
      modalitePedagogique: modalitePedagogique,
      Objectifs: Objectifs,
      Prerequis: Prerequis,
      resultats_attendus: resultats_attendus,
      Duree: Duree,
      public: public,
      contenu: contenu,
      etat: etat,
      type: type,
      tarif: tarif,
      designation: designation,
      referance: referance,
      nombre_Heures: nombre_Heures,
      code_tarif: code_tarif,
      code_BFP: code_BFP,
      Url_formation: Url_formation,
      environment: environment,
      prestataire_Elearning: prestataire_Elearning,
      Cout_Elearning: cout_Elearning,
    });

    const results = await workshop.save();

    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await Workshop.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.delete("/:id", async (req, res) => {
  const workshop = await Workshop.findByIdAndDelete(req.params.id).exec();
  res.send("success");
});

router.put("/", async (req, res) => {
  try {
    const {
      coutCertification,
      prestataireCertification,
      intituleCertification,
      UrlCertification,
      modalitePedagogique,
      Objectifs,
      Prerequis,
      resultats_attendus,
      Duree,
      public,
      contenu,
      etat,
      type,
      environment,
      intitule,
      designation,
      referance,
      nombre_Heures,
      tarif,
      code_tarif,
      code_BFP,
      Url_formation,
      prestataire_Elearning,
      cout_Elearning,
    } = req.body;
    const filter = { _id: req.body.id };

    const update = {
      coutCertification,
      prestataireCertification,
      intituleCertification,
      UrlCertification,
      modalitePedagogique,
      Objectifs,
      Prerequis,
      resultats_attendus,
      Duree,
      public,
      contenu,
      etat,
      type,
      environment,
      intitule,
      designation,
      referance,
      nombre_Heures,
      tarif,
      code_tarif,
      code_BFP,
      Url_formation,
      prestataire_Elearning,
      cout_Elearning,
    };

    let workshops = await Workshop.findByIdAndUpdate(filter, update, {
      new: true,
    });

    res.send(workshops);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/etat", async (req, res) => {
  try {
    const results = await Workshop.find({ etat: true });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

//making search functionality
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;
  console.log(search);
  if (search) {
    const workshops = await Workshop.find({
      intitule: { $regex: search, $options: "i" },
    });
    res.send(workshops);
  } else {
    res.send("no workshop");
  }
});

module.exports = router;
