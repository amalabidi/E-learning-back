const router = require("express").Router();
const { Environment } = require("../modules/environmentWorkshop");

router.post("/", async (req, res) => {
  const { environment, actif } = req.body;

  try {
    const environments = new Environment({ environment, actif });

    const results = await environments.save();

    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.get("/", async (req, res) => {
  try {
    const results = await Environment.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.get("/etat", async (req, res) => {
  try {
    const results = await Environment.find({ actif: true });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
 });


router.put("/", async (req, res) => {
  try {
    const { actif, environment } = req.body;
    const filter = { _id: req.body._id };

    const update = {
      actif,
      environment,
    };

    let environments = await Environment.findByIdAndUpdate(filter, update, {
      new: true,
    });

    res.send(environments);
  } catch (ex) {
    res.send(ex);
  }
});
//making search functionality
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;
  console.log(search);
  if (search) {
    const environments = await Environment.find({
      environment: { $regex: search, $options: "i" },
    });
    res.send(environments);
  } else {
    res.send("no environment");
  }
});
router.delete("/:id", async (req, res) => {
  const environments = await Environment.findByIdAndDelete(req.params.id).exec();
  res.send({suc:"success"});
});

module.exports = router;
