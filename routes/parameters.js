const router = require("express").Router();
const { Email } = require("../modules/email");
const { Societe } = require("../modules/societe");
const { Banque } = require("../modules/banque");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/imgs");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    filepath = `${originalname}`;
    cb(null, originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({
  storage: storage,
  limits: {
    fileSize: 1021 * 1021 * 100,
  },
  fileFilter: fileFilter,
});

/*router.post("/" , upload.array("imgs[]", 2), async (req, res) => {
  try {
    const images = req.files;
    const cachet =
      "http://localhost:3001/public/imgs" + images[0]["originalname"];
    const logo =
      "http://localhost:3001/public/imgs" + images[1]["originalname"];

    const { portComm, hostComm, loginComm, passwordComm } = req.body;

    const emailsComm = new Email({
      type: "communication",
      port: portComm,
      host: hostComm,
      login: loginComm,
      password: passwordComm,
    });
    email_communication = emailsComm["_id"];
    const results = await emailsComm.save();
    if (results) {
      const { portRel, hostRel, loginRel, passwordRel } = req.body;
      try {
        const emailsRel = new Email({
          type: "relance",
          port: portRel,
          host: hostRel,
          login: loginRel,
          password: passwordRel,
        });
        email_relance = emailsRel["_id"];
        const result = await emailsRel.save();
        if (result) {
          const { nomprincip, NBICprincip, NIBANprincip } = req.body;
          try {
            const banqueprincip = new Banque({
              type: "principale",
              nom: nomprincip,
              NBIC: NBICprincip,
              NIBAN: NIBANprincip,
            });
            console.log(banqueprincip);
            banque_principal = banqueprincip["_id"];
            const banquesprincip = await banqueprincip.save();
            console.log("save", banquesprincip);
            if (banquesprincip) {
              const { nomfactor, NBICfactor, NIBANfactor } = req.body;
              try {
                const banquefactor = new Banque({
                  type: "factor",
                  nom: nomfactor,
                  NBIC: NBICfactor,
                  NIBAN: NIBANfactor,
                });
                banque_factor = banquefactor["_id"];
                console.log("banqfactor", banque_factor);
                const banquesfactor = await banquefactor.save();
                console.log("oo");
                if (banquesfactor) {
                  const {
                    representant,
                    societe,
                    telephone,
                    mail,
                    url,
                    adresse,
                    code_postal,
                    ville,
                    siret,
                    SAS,
                    RCS,
                    TVA_infra,
                    NDeclaration_activite,
                    code_NAF,
                    forme_juridique,
                    region,
                  } = req.body;
                  try {
                    console.log("ccccccccccc");
                    const society = new Societe({
                      representant,
                      societe,
                      logo: "llll",
                      cachet: "hhhhh",
                      RCS,
                      telephone,
                      mail,
                      url,
                      adresse,
                      code_postal,
                      ville,
                      siret,
                      SAS,
                      TVA_infra,
                      NDeclaration_activite,
                      code_NAF,
                      forme_juridique,
                      region,
                      email_relance,
                      email_communication,
                      banque_principal,
                      banque_factor,
                    });
                    console.log("hey");
                    //console.log(society);
                    const resulta = await society.save();
                    console.log(resulta);
                    console.log("111");
                    console.log(resulta.logo);
                    res.send(resulta);
                  } catch (e) {
                    res.status(201).send(e);
                  }
                } else {
                  res.status(202).send("banqus_factor not created ");
                }
              } catch (e) {
                res.status(203).send(e);
              }
            } else {
              res.status(204).send("banque_principale not created ");
            }
          } catch (e) {
            res.status(205).send(e);
          }
        } else {
          res.status(206).send("email_relance not created ");
        }
      } catch (e) {
        res.status(207).send(e);
      }
    } else {
      res.status(208).send("email_communication not created ");
    }
  } catch (e) {
    res.status(209).send(e);
  }
});*/

router.get("/", async (req, res) => {
  try {
    const results = await Societe.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.put("/", upload.array("imgs[]", 2), async (req, res) => {
  try {
    const images = req.files;
    const cachet =
      "http://localhost:3001/public/imgs" + images[0]["originalname"];
    const logo =
      "http://localhost:3001/public/imgs" + images[1]["originalname"];

    const {
      portComm,
      hostComm,
      loginComm,
      nomfactor,
      NBICfactor,
      NIBANfactor,
      passwordComm,
      nomprincip,
      NBICprincip,
      NIBANprincip,
      portRel,
      hostRel,
      loginRel,
      passwordRel,
      representant,
      societe,
      telephone,
      mail,
      url,
      adresse,
      code_postal,
      ville,
      siret,
      SAS,
      RCS,
      TVA_infra,
      NDeclaration_activite,
      code_NAF,
      forme_juridique,
      region,
    } = req.body;
    const filter = { _id: req.body._id };

    const society = await Societe.findOne(filter);
    console.log("societe", society);
    const mailComm = society["email_communication"];
    const mailRel = society["email_relance"];
    const banquePrincip = society["banque_principal"];

    const banquefactor = society["banque_factor"];

    const updateComm = {
      type: "communication",
      port: portComm,
      host: hostComm,
      login: loginComm,
      password: passwordComm,
    };
    try {
      let mailsComm = await Email.findByIdAndUpdate(
        { _id: mailComm },
        updateComm,
        { new: true }
      );
    } catch (e) {
      console.log(e);
    }

    const updateRel = {
      type: "relance",
      port: portRel,
      host: hostRel,
      login: loginRel,
      password: passwordRel,
    };
    let mailsRel = await Email.findByIdAndUpdate({ _id: mailRel }, updateRel, {
      new: true,
    });

    const updatePrincipale = {
      type: "principale",
      nom: nomprincip,
      NBIC: NBICprincip,
      NIBAN: NIBANprincip,
    };

    try {
      let banquesprincipales = await Banque.findByIdAndUpdate(
        { _id: banquePrincip },
        updatePrincipale,
        { new: true }
      );
    } catch (e) {
      console.log("e", e);
    }
    const updatefactor = {
      type: "factor",
      nom: nomfactor,
      NBIC: NBICfactor,
      NIBAN: NIBANfactor,
    };
    try {
      let banquesfactor = await Banque.findByIdAndUpdate(
        { _id: banquefactor },
        updatefactor,
        { new: true }
      );
    } catch (e) {
      console.log("e", e);
    }

    const update = {
      url,
      adresse,
      code_postal,
      ville,
      logo,
      cachet,
      siret,
      SAS,
      TVA_infra,
      NDeclaration_activite,
      code_NAF,
      forme_juridique,
      region,
      RCS,
      representant,
      societe,
      telephone,
      mail,
      email_communication: mailComm,
      email_relance: mailRel,
      banque_principale: banquePrincip,
      banque_factor: banquefactor,
    };
    try {
      let results = await Societe.findByIdAndUpdate(filter, update, {
        new: true,
      });
      res.send(results);
      console.log("done");
    } catch (e) {
      console.log("e", e);
    }
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/", async (req, res) => {
  try {
    const results = await Societe.find({});
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/relance", async (req, res) => {
  try {
    const results = await Email.find({ type: "relance" });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/communication", async (req, res) => {
  try {
    const results = await Email.find({ type: "communication" });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/principale", async (req, res) => {
  try {
    const results = await Banque.find({ type: "principale" });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});
router.get("/factor", async (req, res) => {
  try {
    const results = await Banque.find({ type: "factor" });
    res.send(results);
  } catch (ex) {
    res.send(ex);
  }
});

module.exports = router;
