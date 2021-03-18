const router = require("express").Router();
const { Type } = require("../modules/typeWorkshop");

router.post("/", async (req, res) => {
  const { type, actif } = req.body;

  try {
    const types = new Type({ type, actif });

    const results = await types.save();

    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await Type.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/etat", async (req, res) => {
  try {
    const results = await Type.find({ actif: true });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.put("/", async (req, res) => {
  try {
    const { actif, type } = req.body;
    const filter = { _id: req.body.id };

    const update = {
      actif,
      type,
    };

    let types = await Type.findByIdAndUpdate(filter, update, { new: true });

    res.send(types);
  } catch (ex) {
    res.send(ex);
  }
});
//making search functionality
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;
  if (search) {
    const types = await Type.find({ type: { $regex: search, $options: "i" } });
    res.send(types);
  } else {
    res.send("no type");
  }
});

module.exports = router;
