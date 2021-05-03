const router = require("express").Router();
const admz = require("adm-zip");
const fs = require("fs");

router.post("/", function (req, res) {
  const { files } = req.body;

  console.log(files);
  console.log("1");
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
