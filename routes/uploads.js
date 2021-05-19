  
const multer = require("multer");
const path = require("path");
const router = require("express").Router();
const { Dossier } = require("../modules/dossier");
const { Fichier } = require("../modules/fichier");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
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

let upload = multer({ storage: storage });

router.post("/", upload.single("avatar"), async (req, res) => {
  const { avatar, _id, taille,type,name } = req.body;
  console.log(_id);
  console.log(avatar);
  console.log(taille);
  console.log(type);
  try {
    var file = await Fichier.find({ dossier_Id: _id });
    console.log(file);
    if (file.length == 0) {
      console.log("11111111111");
      var fich = new Fichier({ dossier_Id:_id,name: name, taille: taille,type:type });
      const fichiers = await fich.save();
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
    } else {
      console.log("222222222222222");
      var dossier = await Dossier.findById(_id);
      for (i = 0; i < file.length; i++) {
        const a = dossier.files.indexOf(file["_id"]);
        console.log(a);
        if (dossier.files.indexOf(file["_id"]) == -1) {
          console.log("3333333333333");
          var fich = new Fichier({ name: name, taille: taille,type:type,dossier_Id:_id });
          const fichiers = await fich.save();
          const idfichier = fichiers["_id"];
          console.log(idfichier);
          var result = await Dossier.update(
            {
              _id,
            },
            { $push: { files: idfichier } }
          );
          res.send(result);
        } else {
          console.log("44444444444");
          res.send("file exists");
        }
      }
    }
  } catch (ex) {
    res.send(ex);
  }
});

module.exports = router;
