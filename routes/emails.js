var express = require("express");
var router = express.Router();
const multer = require("multer");
const { Modification } = require("../modules/modification");
const { Dossier } = require("../modules/dossier");
const { JournalAppel } = require("../modules/JournalAppel");
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
router.post("/text",auth, async (req, res) => {
  const {
    subject,
    receivermails,
    message,
    senderEmail,
    senderpassword,
  } = req.body;

  var transport = nodemailer.createTransport({
    host: "ssl0.ovh.net" /*"smtp.facacademy.fr",*/,
    port: 587,
    secure: false,
    auth: {
      user: senderEmail,
      pass: senderpassword,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });
  var mailOptions = {
    from: "contact@facacademy.fr",
    to: receivermails,
    subject: subject,
    text: message,
  };
  try {
    let info = await transport.sendMail(mailOptions);
    res.send("email sent successfully");
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

router.post("/signdocemail",auth, async (req, res) => {
  var attachs = [];
  const {
    dossier_Id,
    receivermails,
    senderEmail,
    senderpassword,
    filenames,
    userId,
  } = req.body;
  console.log(filenames);

  for (i = 0; i < filenames.length; i++) {
    attachs.push({
      filename: filenames[i],
      path: "./uploads/filledpdf/" + filenames[i],
    });
  }

  console.log(attachs);

  var transport = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 587,
    secure: false,
    auth: {
      user: senderEmail,
      pass: senderpassword,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });
  var mailOptions = {
    from: senderEmail,
    to: receivermails,
    attachments: attachs,
  };

  try {
    let info = await transport.sendMail(mailOptions);
    const Sujet = "Envoie de Document";
    const Commentaire = filenames;
    const Journal = await new JournalAppel({ Sujet, Commentaire });
    const result3 = await Journal.save();

    if (result3) {
      var result4 = await Dossier.updateOne(
        {
          _id: dossier_Id,
        },
        { $push: { journalAppel: Journal._id } }
      );

      const dossier = await Dossier.findById(dossier_Id);

      if (dossier) {
        const client = dossier["client"]["_id"];
        console.log(client);

        const operation = "Commentaire";

        const user = req.user._id; //after adding jwt token

        const modif = await new Modification({
          client,
          operation,
          user,
        });

        const result5 = await modif.save();

        res.send("email sent successfully");
      } else {
        res.send("dossier not found ");
      }
    }
  } catch (e) {
    res.status(403).send(e);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/emails/");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    filepath = `${originalname}`;
    cb(null, originalname);
  },
});

let upload = multer({
  storage: storage,
  limits: {
    fileSize: 1021 * 1021 * 100,
  },
});

router.post("/fichiers",auth, upload.array("docs[]", 3), async (req, res) => {
  var attachs = [];
  const filenames = req.files;
  console.log(filenames);
  const {
    subject,
    receivermails,
    message,
    senderEmail,
    senderpassword,
  } = req.body;
  console.log(filenames[0].filename);
  if (typeof filenames !== "undefined") {
    for (i = 0; i < filenames.length; i++) {
      attachs.push({
        filename: filenames[i].originalname,
        path: "./public/emails/" + `${filenames[i].originalname}`,
      });
    }
  }
  console.log(attachs);

  var transport = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 587,
    secure: false,
    auth: {
      user: senderEmail,
      pass: senderpassword,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });
  var mailOptions = {
    from: senderEmail,
    to: receivermails,
    subject: subject,
    text: message,
    attachments: attachs,
  };
  try {
    let info = await transport.sendMail(mailOptions);
    res.send("email sent successfully");
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

module.exports = router;
