const router = require("express").Router();

router.post("/", function (req, res) {
  const { filename } = req.body;
  console.log(filename);
  var filePath = `./uploads/${filename}`;
  try {
    res.download(filePath, filename);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
