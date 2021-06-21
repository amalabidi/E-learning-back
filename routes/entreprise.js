const router = require("express").Router();
const { Entreprise } = require("../modules/entreprise");

router.post("/", async (req, res) => {
  const {   
    raison_social,
    interne,
    financeur,
    vip,
    categorie,
    forme_juridique,
    n_siret,
    code_ape_naf,
    n_tva,
    email,
    tel,
    website,
    numero_de_rue,
    comp_adresse,
    code_postal,
    ville,
    pays,
    name,
    lastname,
    fonction_entreprise,
    email_princ,
    tel_princ,
    numero_de_rue_contact,
    comp_adresse_contact,
    code_postal_contact,
    ville_contact,
    pays_contact,
    name_autre_contact,
    lastname_autre_contact,
    fonction_entreprisen_autre_contact,
    email_autre_contact,
    tel_autre_contact,
    numero_de_rue_autre_contact,
    comp_adresse_autre_contact,
    code_postal_autre_contact,
    ville_autre_contact,
    pays_autre_contact,
    actif} = req.body;
  try {
    const entreprises = new Entreprise({  
        raison_social,
        interne,
        financeur,
        vip,
        categorie,
        forme_juridique,
        n_siret,
        code_ape_naf,
        n_tva,
        email,
        tel,
        website,
        numero_de_rue,
        comp_adresse,
        code_postal,
        ville,
        pays,
        name,
        lastname,
        fonction_entreprise,
        email_princ,
        tel_princ,
        numero_de_rue_contact,
        comp_adresse_contact,
        code_postal_contact,
        ville_contact,
        pays_contact,
        name_autre_contact,
        lastname_autre_contact,
        fonction_entreprisen_autre_contact,
        email_autre_contact,
        tel_autre_contact,
        numero_de_rue_autre_contact,
        comp_adresse_autre_contact,
        code_postal_autre_contact,
        ville_autre_contact,
        pays_autre_contact,
        actif
        });

    const results = await entreprises.save();

    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await Entreprise.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});


router.put("/", async (req, res) => {
  try {
    const {   
        raison_social,
        interne,
        financeur,
        vip,
        categorie,
        forme_juridique,
        n_siret,
        code_ape_naf,
        n_tva,
        email,
        tel,
        website,
        numero_de_rue,
        comp_adresse,
        code_postal,
        ville,
        pays,
        name,
        lastname,
        fonction_entreprise,
        email_princ,
        tel_princ,
        numero_de_rue_contact,
        comp_adresse_contact,
        code_postal_contact,
        ville_contact,
        pays_contact,
        name_autre_contact,
        lastname_autre_contact,
        fonction_entreprisen_autre_contact,
        email_autre_contact,
        tel_autre_contact,
        numero_de_rue_autre_contact,
        comp_adresse_autre_contact,
        code_postal_autre_contact,
        ville_autre_contact,
        pays_autre_contact,
        actif } = req.body;
    const filter = { _id: req.body._id };
    const update = {
        raison_social,
        interne,
        financeur,
        vip,
        categorie,
        forme_juridique,
        n_siret,
        code_ape_naf,
        n_tva,
        email,
        tel,
        website,
        numero_de_rue,
        comp_adresse,
        code_postal,
        ville,
        pays,
        name,
        lastname,
        fonction_entreprise,
        email_princ,
        tel_princ,
        numero_de_rue_contact,
        comp_adresse_contact,
        code_postal_contact,
        ville_contact,
        pays_contact,
        name_autre_contact,
        lastname_autre_contact,
        fonction_entreprisen_autre_contact,
        email_autre_contact,
        tel_autre_contact,
        numero_de_rue_autre_contact,
        comp_adresse_autre_contact,
        code_postal_autre_contact,
        ville_autre_contact,
        pays_autre_contact,
        actif
    };
    let result = await Entreprise.findByIdAndUpdate(filter, update, { new: true });
    res.send(result);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/etat", async (req, res) => {
  try {
    const results = await Entreprise.find({ "actif": true });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.delete("/:id", async (req, res) => {
  const result = await Entreprise.findByIdAndDelete(req.params.id).exec();
  res.send({suc:"success"});
});


module.exports = router;