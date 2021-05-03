const router = require("express").Router();
const { Provenance } = require("../modules/provenance");

router.post("/", async (req, res) => {
  const { provenance, actif, user } = req.body;

  try {
    const provenances = new Provenance({
      provenance,
      actif,
      user,
    });
    const results = await provenances.save();
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await Provenance.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/etat", async (req, res) => {
  try {
    const results = await Provenance.find({ actif: true });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.put("/", async (req, res) => {
  try {
    const { actif, provenance } = req.body;
    const filter = { _id: req.body._id };

    const update = {
      actif,
      provenance,
    };
    let provenances = await Provenance.findByIdAndUpdate(filter, update, {
      new: true,
    });
    res.send(provenances);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/:id", async (req, res) => {
  const{id}=req.params
  try{
    const results = await Provenance.find({"_id":id});
    res.send(results);
  }catch(ex){
    res.send(ex)
  }
});

router.delete("/:id", async (req, res) => {

  const provenance = await Provenance.findByIdAndDelete(req.params.id).exec();

  res.send("success");
});

//making search functionality
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;
  if (search) {
    const types = await Provenance.find({
      provenance: { $regex: search, $options: "i" },
    });
    res.send(types);
  } else {
    res.send("no type");
  }
});

module.exports = router;
