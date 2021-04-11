const multer = require("multer");
const path = require("path");
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    cb(
      null,
      originalname /*originalname + "-" + Date.now() + path.extname(file.originalname)*/
    );
  },
});
console.log("2");
let upload = multer({ storage: storage });

router.post("/", upload.single("fichier"), (req, res) => {
  return res.json({ status: "ok" });
});

module.exports = router;
