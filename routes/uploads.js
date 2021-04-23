const multer = require("multer");
const path = require("path");
const router = require("express").Router();
const { Dossier } = require("../modules/dossier");
const { Fichier } = require("../modules/fichier");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    filepath = `${originalname}`;
    req.body.avatar = filepath;
    cb(
      null,
      originalname /*originalname + "-" + Date.now() + path.extname(file.originalname)*/
    );
  },
});
console.log("2");
let upload = multer({ storage: storage });

router.post("/", upload.single("avatar"), async (req, res) => {
  const { avatar, _id, taille } = req.body;
  console.log(_id);
  console.log(avatar);
  console.log(taille);
  try {
    var result = new Fichier({ name: avatar, taille: taille });
    const fichiers = await result.save();
    const idfichier = fichiers["_id"];
    console.log(idfichier);
    var result = await Dossier.update(
      {
        _id,
      },
      { $push: { files: idfichier } }
    );

    console.log(result);
    res.send(result);
  } catch (ex) {
    res.send(ex);
  }
});

module.exports = router;
