var express = require("express");
var router = express.Router();
var fs = require("fs");
const PDFDocument = require("pdfkit");
var csv = require("fast-csv");
var { Dossier } = require("../modules/dossier");
const { modele, Modele } = require("../modules/export_modele");
const admz = require("adm-zip");
var streamToBuffer = require('stream-to-buffer')

router.post("/modele", async (req, res) => {
  const dossierAttributes = req.body.dossierAttributes;
  const clientAttributes = req.body.clientAttributes;
  const factureAttributes = req.body.factureAttributes;
  const workshopAttributes = req.body.workshopAttributes;

  try {
    const modele = new Modele({
      clientAttributes,
      dossierAttributes,
      factureAttributes,
      workshopAttributes,
    });
    const result = await modele.save();
    res.status(200).send(result);
  } catch (e) {
    res.send(e);
  }
});

router.post("/exportdata", async (req, res) => {
  // tableau de dossierId
  const dossierId =  req.body.dossierId;
  const dossierAttributes = req.body.dossierAttributes;
  const clientAttributes = req.body.clientAttributes;
  const factureAttributes = req.body.factureAttributes;
  const workshopAttributes = req.body.workshopAttributes;
  console.log("hhhhhhhh",dossierAttributes)
  try {
    var liste = new Array();
    for (i in dossierId) {
      const dossier = await Dossier.findOne({ _id: dossierId[i] })
        .populate("facturation")
        .populate("idWorkshop")
        .populate("client");
      var result = {};

      for (j in dossierAttributes) {
        result[dossierAttributes[j]] = dossier[dossierAttributes[j]];
      }

      for (j in clientAttributes) {
        result[clientAttributes[j]] = dossier["client"][clientAttributes[j]];
      }

      for (j in factureAttributes) {
        result[factureAttributes[j]] =
          dossier["facturation"][factureAttributes[j]];
      }

      for (j in workshopAttributes) {
        result[workshopAttributes[j]] =
          dossier["idWorkshop"][workshopAttributes[j]];
      }

      liste.push(result);
    }
    var middlepath = Date.now() + "file.csv";
    var ws = fs.createWriteStream("public/"+middlepath); 
   await csv
      .write(liste, { headers: true })
      .on("finish", function () {})
      .pipe(ws).on("finish" , function () {
        var zp = new admz();
        
        zp.addLocalFile("./public/"+middlepath);
    var outputpath = Date.now() + "dossier.zip";
    fs.writeFileSync(outputpath, zp.toBuffer());
    res.download(outputpath, (err) => {
      if (err) {
        res.send("error in downloading");
      }
      fs.unlinkSync(outputpath);
      fs.unlink("./public/"+middlepath,(err)=>{
         console.log(err);
       }); 
    });

      });
            
  } catch (e) {

  }
});

router.post("/exportdata/modele", async (req, res) => {
  const modeleId = req.body.modeleId;

  try {
    const modele = await Modele.findOne({ _id: modeleId });

    const dossierId = req.body.dossierId;
    const dossierAttributes = modele.dossierAttributes;
    const clientAttributes = modele.clientAttributes;
    const factureAttributes = modele.factureAttributes;
    const workshopAttributes = modele.workshopAttributes;
    console.log(modele);
    try {
      var liste = new Array();

      for (i in dossierId) {
        const dossier = await Dossier.findOne({ _id: dossierId[i] })
          .populate("facturation")
          .populate("idWorkshop")
          .populate("client");
        var result = {};

        for (j in dossierAttributes) {
          result[dossierAttributes[j]] = dossier[dossierAttributes[j]];
        }

        for (j in clientAttributes) {
          result[clientAttributes[j]] = dossier["client"][clientAttributes[j]];
        }

        for (j in factureAttributes) {
          result[factureAttributes[j]] =
            dossier["facturation"][factureAttributes[j]];
        }

        for (j in workshopAttributes) {
          result[workshopAttributes[j]] =
            dossier["idWorkshop"][workshopAttributes[j]];
        }

        liste.push(result);
      }

      console.log("hhhhhhh",liste);

      var middlepath = Date.now() + "file.csv";
    var ws = fs.createWriteStream("public/"+middlepath); 
   await csv
      .write(liste, { headers: true })
      .on("finish", function () {})
      .pipe(ws).on("finish" , function () {
        var zp = new admz();
        
        zp.addLocalFile("./public/"+middlepath);
    var outputpath = Date.now() + "dossier.zip";
    fs.writeFileSync(outputpath, zp.toBuffer());
    res.download(outputpath, (err) => {
      if (err) {
        res.send("error in downloading");
      }
      fs.unlinkSync(outputpath);
      fs.unlink("./public/"+middlepath,(err)=>{
         console.log(err);
       }); 
    });

      });
       


    } catch (e) {
      res.send(e);
    }
  } catch (e) {}
});

router.post("/exportdataMSC", async (req, res) => {
  // tableau de dossierId
  const dossierId = req.body.dossierId;
  const dossierAttributes = [
    "numeroEDOF",
    "workshopBeginDate",
    "workshopEndDate",
  ];
  const clientAttributes = ["firstName", "lastName", "email"];
  const factureAttributes = [];
  const workshopAttributes = ["intitule", "reference"];
  try {
    var liste = new Array();

    for (i in dossierId) {
      const dossier = await Dossier.findOne({ _id: dossierId[i] })
        .populate("facturation")
        .populate("idWorkshop")
        .populate("client");
      var result = {};

      for (j in dossierAttributes) {
        result[dossierAttributes[j]] = dossier[dossierAttributes[j]];
      }

      for (j in clientAttributes) {
        result[clientAttributes[j]] = dossier["client"][clientAttributes[j]];
      }

      for (j in factureAttributes) {
        result[factureAttributes[j]] =
          dossier["facturation"][factureAttributes[j]];
      }

      for (j in workshopAttributes) {
        result[workshopAttributes[j]] =
          dossier["idWorkshop"][workshopAttributes[j]];
      }

      liste.push(result);
    }

    console.log(liste);

    var middlepath = Date.now() + "file.csv";
    var ws = fs.createWriteStream("public/"+middlepath); 
   await csv
      .write(liste, { headers: true })
      .on("finish", function () {})
      .pipe(ws).on("finish" , function () {
        var zp = new admz();
        
        zp.addLocalFile("./public/"+middlepath);
    var outputpath = Date.now() + "dossier.zip";
    fs.writeFileSync(outputpath, zp.toBuffer());
    res.download(outputpath, (err) => {
      if (err) {
        res.send("error in downloading");
      }
      fs.unlinkSync(outputpath);
      fs.unlink("./public/"+middlepath,(err)=>{
         console.log(err);
       }); 
    });

      });
       
  } catch (e) {
    res.send(e);
  }
});

router.post("/exportdata/rapportFactor", async (req, res) => {
  // tableau de dossierId
  const dossierId = req.body.dossierId;
  const dossierAttributes = [
    "numeroEDOF",
    "workshopBeginDate",
    "workshopEndDate",
  ];
  const clientAttributes = ["firstName", "lastName", "email"];
  const factureAttributes = ["NFacturation", "MontantFacture"];
  const workshopAttributes = ["intitule", "reference"];
  try {
    var liste = new Array();

    for (i in dossierId) {
      const dossier = await Dossier.findOne({ _id: dossierId[i] })
        .populate("facturation")
        .populate("idWorkshop")
        .populate("client");
      var result = {};

      for (j in dossierAttributes) {
        result[dossierAttributes[j]] = dossier[dossierAttributes[j]];
      }

      for (j in clientAttributes) {
        result[clientAttributes[j]] = dossier["client"][clientAttributes[j]];
      }

      for (j in factureAttributes) {
        result[factureAttributes[j]] =
          dossier["facturation"][factureAttributes[j]];
      }

      for (j in workshopAttributes) {
        result[workshopAttributes[j]] =
          dossier["idWorkshop"][workshopAttributes[j]];
      }

      liste.push(result);
    }

    console.log(liste);

    var middlepath = Date.now() + "file.csv";
    var ws = fs.createWriteStream("public/"+middlepath); 
   await csv
      .write(liste, { headers: true })
      .on("finish", function () {})
      .pipe(ws).on("finish" , function () {
        var zp = new admz();
        
        zp.addLocalFile("./public/"+middlepath);
    var outputpath = Date.now() + "dossier.zip";
    fs.writeFileSync(outputpath, zp.toBuffer());
    res.download(outputpath, (err) => {
      if (err) {
        res.send("error in downloading");
      }
      fs.unlinkSync(outputpath);
      fs.unlink("./public/"+middlepath,(err)=>{
         console.log(err);
       }); 
    });

      });
       
  } catch (e) {
    res.send(e);
  }
});

router.get("/exportpdf", async (req, res) => {
  // Add an image, constrain it to a given size, and center it vertically and horizontally

  // Add another page
  doc.addPage().fontSize(25).text("Here is some vector graphics...", 100, 100);

  // Draw a triangle
  doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");

  // Apply some transforms and render an SVG path with the 'even-odd' fill rule
  doc
    .scale(0.6)
    .translate(470, -380)
    .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
    .fill("red", "even-odd")
    .restore();

  // Add some text with annotations
  doc
    .addPage()
    .fillColor("blue")
    .text("Here is a link!", 100, 100)
    .underline(100, 100, 160, 27, { color: "#0000FF" })
    .link(100, 100, 160, 27, "http://google.com/");

  // Finalize PDF file
  doc.end();
});

module.exports = router;
