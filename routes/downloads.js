const router = require("express").Router();
const admz = require("adm-zip");
const auth = require("../middleware/auth");
const fs = require("fs");

router.post("/",auth, function (req, res) {
  console.log(req.body);
  const { files } = req.body;

  console.log(files);
  var zp = new admz();
  if (files) {
    for (i = 0; i < files.length; i++) {
      zp.addLocalFile("./uploads/" + files[i]);
    }
  }
  var outputpath = Date.now() + "dossier.zip";
  fs.writeFileSync(outputpath, zp.toBuffer());
  res.download(outputpath, (err) => {
    if (err) {
      res.send("error in downloading");
    }

    fs.unlinkSync(outputpath);
  });
});

module.exports = router;
