const multer = require("multer");
const path = require("path");
const router = require("express").Router();
const { Dossier } = require("../modules/dossier");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    filepath = `./uploads/${originalname}`;
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
  const { avatar, _id } = req.body;
  console.log(_id);
  console.log(avatar);
  try {
    var result = await Dossier.update(
      {
        _id,
      },
      { $push: { files: avatar } }
    );
    console.log(result);
    res.send(result);
  } catch (ex) {
    res.send(ex);
  }
});

module.exports = router;
