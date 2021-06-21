var express = require("express");
const { Cout } = require("../modules/cout");
var router = express.Router();
const multer = require("multer");
const { Fichier } = require("../modules/fichier");

/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    cb(null, originalname);
  },
});

let upload = multer({ storage: storage });*/

router.post("/", /*upload.single("fich")*/ async (req, res) => {
  const fichier = req.file;

  const {
    categorie,
    Designation,
    Date_fact,
    Montant_ttc,
    Montant_ht,
    Montant_tva,
    inclut
  } = req.body;
  /*var fich = new Fichier({
    name: fichier.originalname,
    taille: fichier.size,
  });*/

  try {
    /*const fichiers = await fich.save();*/
    /*const file = fichiers["_id"];*/
    var couts = new Cout({
      categorie,
      Designation,
      Date_fact,
      Montant_ttc,
      Montant_ht,
      Montant_tva,
      inclut,
      //file,
    });

    const result = await couts.save();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});
router.get("/", async (req, res) => {
  try {
    const results = await Cout.find({}).populate("file");
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.put("/", async (req, res) => {
  try {
    const {
      categorie,
      Designation,
      Date_fact,
      Montant_ttc,
      Montant_ht,
      Montant_tva,
      inclut,
    } = req.body;
    const filter = { _id: req.body._id };

    const update = {
      categorie,
      Designation,
      Date_fact,
      Montant_ttc,
      Montant_ht,
      Montant_tva,
      inclut,
    };

    let couts = await Cout.findByIdAndUpdate(filter, update, {
      new: true,
    });

    res.send(couts);
  } catch (ex) {
    res.send(ex);
  }
});
router.delete("/:id", async (req, res) => {
  const cout = await Cout.findById(req.params.id);
  const idfichier = cout["file"];
  const result = await Fichier.findByIdAndDelete(idfichier).exec();
  const results = await Cout.findByIdAndDelete(req.params.id).exec();

  res.send({ suc: "success" });
});

module.exports = router;