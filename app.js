var express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const environments = require("./routes/environments");
const types = require("./routes/types");
const reset = require("./routes/ResetPassword");
const workshops = require("./routes/workshops");
const provenances = require("./routes/provenances");
const users = require("./routes/users");
const bodyParser = require("body-parser");
const dossiers = require("./routes/dossiers");
const auth = require("./routes/authentication");
const uploads = require("./routes/uploads");
const parametres = require("./routes/parameters");
const downloads = require("./routes/downloads");
const modifications = require("./routes/modifications");
const cout = require("./routes/cout");
const sig = require("./routes/embededSignature");
const exp = require("./routes/export");
const pdf = require("./routes/pdffiller");
const email = require("./routes/emails");
const filters = require("./routes/filters");
const relances = require("./routes/relances");
const dashboard = require("./routes/dashboard");
const app = express();

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    limit: "300mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(express.static("public"));
//app.use(cors({ origin: "http://localhost:4200" }));
app.use(cors({ origin: "https://fac-academy.ureachus.com" }));


// connecting to mongodb

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
mongoose
  .connect(
    `mongodb+srv://E-learning-Project:E-learning-Project@cluster0.gq6ri.mongodb.net/test`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connected to mongodb successfully"))
  .catch((err) => console.log("couldnt connect to mongodb" + err));

//delegating a router to a given url

app.use("/environment", environments);
app.use("/type", types);
app.use("/workshop", workshops);
app.use("/provenance", provenances);
app.use("/user", users);
app.use("/auth", auth);
app.use("/signature", sig);
app.use("/dossier", dossiers);
app.use("/uploads", uploads);
app.use("/dashboard", dashboard);

app.use("/filters", filters);
app.use("/relances", relances);
app.use("/parameters", parametres);
app.use("/reset", reset);

app.use("/modifications", modifications);
app.use("/pdf", pdf);
app.use("/downloads", downloads);
app.use("/export", exp);
app.use("/cout/", cout);
app.use("/email", email);

//choose the backend port
const port = process.env.PORT || 3001;

app.use("/public", express.static(__dirname + "/public"));

//starting the backend server
app.listen(port, () => console.log("listening on port:" + port));

module.exports = app;
