const router = require("express").Router();
const { Financeur } = require("../modules/financeur");

router.post("/", async (req, res) => {
  const {
    dispositif_formation,
    financeur,
    actif } = req.body;
  try {
    const financeurs = new Financeur({ 
    dispositif_formation,
    financeur,
    actif });

    const results = await financeurs.save();

    res.send(results);
    console.log("created")
  } catch (ex) {
    res.send(ex);
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await Financeur.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});


router.put("/", async (req, res) => {
  try {
    const { dispositif_formation,
        financeur,
        actif} = req.body;
    const filter = { _id: req.body._id };
    const update = {
        dispositif_formation,
        financeur,
        actif
    };
    let result = await Financeur.findByIdAndUpdate(filter, update, { new: true });
    res.send(result);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/etat", async (req, res) => {
  try {
    const results = await Financeur.find({ "actif": true });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.delete("/:id", async (req, res) => {
  const result = await Financeur.findByIdAndDelete(req.params.id).exec();
  res.send({suc:"success"});
});


module.exports = router;