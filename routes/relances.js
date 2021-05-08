const router = require("express").Router();
const { Relance } = require("../modules/relance");
const auth = require("../middleware/auth");

router.post("/",auth, async (req, res) => {
  const {
    nom,
    actif,
    jour,
    modeleMail,
    modeleSMS,
    code_Tarif,
    type,
  } = req.body;
  console.log(nom);
  try {
    const relances = new Relance({
      nom,
      actif,
      jour,
      modeleMail,
      modeleSMS,
      code_Tarif,
      type,
    });

    const results = await relances.save();

    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.get("/",auth, async (req, res) => {
  try {
    const results = await Relance.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/etat",auth, async (req, res) => {
  try {
    const results = await Relance.find({ actif: true });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.put("/",auth, async (req, res) => {
  try {
    console.log("hh");
    const {
      nom,
      actif,
      jour,
      modeleMail,
      modeleSMS,
      code_Tarif,
      type,
    } = req.body;
    console.log(nom);
    const filter = { _id: req.body._id };
    console.log(req.body._id);
    const update = {
      nom,
      actif,
      jour,
      modeleMail,
      modeleSMS,
      code_Tarif,
      type,
    };
    let relances = await Relance.findByIdAndUpdate(filter, update, {
      new: true,
    });
    console.log(relances);
    res.send(relances);
  } catch (ex) {
    res.send(ex);
  }
});
router.delete("/:id",auth, async (req, res) => {
  const relances = await Relance.findByIdAndDelete(req.params.id).exec();
  res.send("success");
});
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;
  if (search) {
    const relances = await Relance.find({
      nom: { $regex: search, $options: "i" },
    });
    res.send(relances);
  } else {
    res.send("no type");
  }
});

module.exports = router;
