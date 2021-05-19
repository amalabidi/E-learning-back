const router = require("express").Router();
const admz = require("adm-zip");
const fs = require("fs");

router.post("/", function (req, res) {
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
router.post("/singleFile/", async (req, res) => {
  const {
    name,
    type,
  }=req.body
  console.log(type)
  console.log(name)
  var filePath = './uploads/' + name;
  var stat = fs.statSync(filePath);
  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': stat.size,
    'Content-Disposition': 'attachment; Document'
  });
  var readStream = fs.createReadStream(filePath);
  readStream.on('open', function() {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
  });
  readStream.on('error', function(err) {
    res.end(err);
  });
  //res.send(pdfs);
});

module.exports = router;