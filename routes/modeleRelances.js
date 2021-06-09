const router = require("express").Router();
const { ModeleMailRelance } = require("../modules/modeleMailRelance");
const { ModeleSMSRelance } = require("../modules/modeleSMSRelance");

router.post("/mail", async (req, res) => {
  const { modele, objet, description } = req.body;

  try {
    const mailrelances = new ModeleMailRelance({
      modele,
      objet,
      description,
    });

    const results = await mailrelances.save();

    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});


router.get("/mail", async (req, res) => {
  try {
    const results = await ModeleMailRelance.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/mail/:id", async (req, res) => {
  try {
    const results = await ModeleMailRelance.find({ _id: req.params.id });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/mail/:modele", async (req, res) => {
  try {
    const results = await ModeleMailRelance.find({ modele: req.params.modele });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.put("/mail", async (req, res) => {
  try {
    const { objet, modele, description } = req.body;

    const filter = { _id: req.body._id };
    console.log(req.body._id);
    const update = {
      objet,
      modele,
      description,
    };
    let mailrelances = await ModeleMailRelance.findByIdAndUpdate(
      filter,
      update,
      {
        new: true,
      }
    );
    console.log(mailrelances);
    res.send(mailrelances);
  } catch (ex) {
    res.send(ex);
  }
});
router.delete("/mail/:id", async (req, res) => {
  const mailrelances = await ModeleMailRelance.findByIdAndDelete(
    req.params.id
  ).exec();
  res.send("success");
});
//SMS

router.post("/SMS", async (req, res) => {
  const { modele, description } = req.body;

  try {
    const smsrelances = new ModeleSMSRelance({
      modele,

      description,
    });

    const results = await smsrelances.save();

    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/SMS", async (req, res) => {
  try {
    const results = await ModeleSMSRelance.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/SMS/:id", async (req, res) => {
  try {
    const results = await ModeleSMSRelance.find({ _id: req.params.id });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/SMS/:modele", async (req, res) => {
  try {
    const results = await ModeleSMSRelance.find({ modele: req.params.modele });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

router.put("/SMS", async (req, res) => {
  try {
    const { modele, description } = req.body;

    const filter = { _id: req.body._id };
    console.log(req.body._id);
    const update = {
      modele,
      description,
    };
    let smsrelances = await ModeleSMSRelance.findByIdAndUpdate(filter, update, {
      new: true,
    });
    console.log(smsrelances);
    res.send(smsrelances);
  } catch (ex) {
    res.send(ex);
  }
});
router.delete("/SMS/:id", async (req, res) => {
  const smsrelances = await ModeleSMSRelance.findByIdAndDelete(
    req.params.id
  ).exec();
  res.send("success");
});

module.exports = router;
