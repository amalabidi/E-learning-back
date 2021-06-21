const router = require("express").Router();
const { Participant } = require("../modules/participant");

router.post("/", async (req, res) => {
  const {  civilite,
    nir,
    name,
    lastname, 
    tel,
    email,
    date_de_naissance,
    lieu_de_naissance,
    nationalites,
    numero_de_rue,
    comp_adresse,
    code_postal,
    ville,
    pays,
    profil,
    entreprise,
    dernier_diplome,
    n_pole_emploi,
    dis_formation,
    financeur,
    actif } = req.body;
  try {
    const participants = new Participant({ 
         civilite,
        nir,
        name, 
        lastname, 
        tel,
        email,
        date_de_naissance,
        lieu_de_naissance,
        nationalites,
        numero_de_rue,
        comp_adresse,
        code_postal,
        ville,
        pays,
        profil,
        entreprise,
        dernier_diplome,
        n_pole_emploi,
        dis_formation,
        financeur,
        actif});

    const results = await participants.save();

    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await Participant.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});


router.put("/", async (req, res) => {
  try {
    const {  civilite,
        nir,
        name, 
        lastname, 
        tel,
        email,
        date_de_naissance,
        lieu_de_naissance,
        nationalites,
        numero_de_rue,
        comp_adresse,
        code_postal,
        ville,
        pays,
        profil,
        entreprise,
        dernier_diplome,
        n_pole_emploi,
        dis_formation,
        financeur,
        actif } = req.body;
    const filter = { _id: req.body._id };
    const update = {
        civilite,
        nir,
        name, 
        lastname, 
        tel,
        email,
        date_de_naissance,
        lieu_de_naissance,
        nationalites,
        numero_de_rue,
        comp_adresse,
        code_postal,
        ville,
        pays,
        profil,
        entreprise,
        dernier_diplome,
        n_pole_emploi,
        dis_formation,
        financeur,
        actif
    };
    let result = await Participant.findByIdAndUpdate(filter, update, { new: true });
    res.send(result);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/etat", async (req, res) => {
  try {
    const results = await Participant.find({ "actif": true });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.delete("/:id", async (req, res) => {
  const result = await Participant.findByIdAndDelete(req.params.id).exec();
  res.send({suc:"success"});
});


module.exports = router;