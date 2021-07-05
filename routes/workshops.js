const router = require("express").Router();
const { Workshop } = require("../modules/workshop");

router.post("/", async (req, res) => {
  const {
    certification,
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
    code_BFP,
    Url_formation,
    prestataire_Elearning,
    cout_Elearning,
    niveau_form,
    date_modif,
  } = req.body;
  try {
    const workshop = new Workshop({
      certification: certification,
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
      reference: referance,
      nombre_Heures: nombre_Heures,
      code_BFP: code_BFP,
      Url_Formation: Url_formation,
      environment: environment,
      prestataire_Elearning: prestataire_Elearning,
      Cout_Elearning: cout_Elearning,
      niveau_form: niveau_form,
      date_modif:date_modif,
    });
    console.log("workshop",workshop)
    const results = await workshop.save();
    res.send(results);
  } catch (ex) {
    console.log(ex)
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
  res.send({suc:"success"});
});

router.put("/", async (req, res) => {
  try {
    const {
      certification,
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
      code_BFP,
      Url_formation,
      prestataire_Elearning,
      cout_Elearning,
      niveau_form,
      date_modif,
    } = req.body;
    const filter = { _id: req.body._id };
    console.log('filter',req.body.nombre_Heures)
    const update = {
      certification,
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
      code_BFP,
      Url_formation,
      prestataire_Elearning,
      cout_Elearning,
      niveau_form,
      date_modif
    };
    
    let workshops = await Workshop.findByIdAndUpdate(filter, update, {
      new: true,
    });
    console.log("update",workshops.tarif)
    res.send(workshops);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/etat", async (req, res) => {
  try {
    const results = await Workshop.find({ "etat": true });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/:id", async (req, res) => {
  const {id}=req.params;
  try {
    const results = await Workshop.find({ "_id":id });
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
