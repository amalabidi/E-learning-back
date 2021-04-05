var express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const environments = require("./routes/environments");
const types = require("./routes/types");
const workshops = require("./routes/workshops");
const provenances = require("./routes/provenances");
const users = require("./routes/users");
const dossiers = require("./routes/dossiers") ; 
const auth = require("./routes/authentication");
const app = express();
app.use(express.json());
app.use(cors( {origin: 'http://localhost:4200'}));

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
app.use("/dossier" , dossiers) ; 
//choose the backend port
const port = process.env.PORT || 3001;

//starting the backend server
app.listen(port, () => console.log("listening on port:" + port));

module.exports = app;
