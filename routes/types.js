const router = require("express").Router();
const { Type } = require("../modules/typeWorkshop");
const auth = require("../middleware/auth");

router.post("/",auth, async (req, res) => {
  const { type, actif } = req.body;
  try {
    const types = new Type({ type, actif });

    const results = await types.save();

    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.get("/",auth, async (req, res) => {
  try {
    const results = await Type.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/etat",auth, async (req, res) => {
  try {
    const results = await Type.find({ actif: true });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.put("/",auth, async (req, res) => {
  try {
    const { actif, type } = req.body;
    const filter = { _id: req.body._id };
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
router.get("/search/:search",auth, async (req, res) => {
  const { search } = req.params;
  if (search) {
    const types = await Type.find({ type: { $regex: search, $options: "i" } });
    res.send(types);
  } else {
    res.send("no type");
  }
});
router.delete("/:id",auth, async (req, res) => {
  const types = await Type.findByIdAndDelete(req.params.id).exec();
  res.send({suc:"success"});
});


module.exports = router;
