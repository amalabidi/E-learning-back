const router = require("express").Router();
const { User } = require("../modules/user");
const { ResetToken } = require("../modules/reset_token");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const auth = require("../middleware/auth");
const Crypto = require("crypto");

router.post("/reset", async (req, res) => {
  if (!req.body.email) {
    return res.status(500).json({ message: "Email is required" });
  }
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(409).json({ message: "Email does not exist" });
  }
  var resettoken = new ResetToken({
    userId: user._id,
    resettoken: Crypto.randomBytes(16).toString("hex"),
  });

  resettoken.save(async function (err) {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
    ResetToken.find({
      userId: user._id,
      resettoken: { $ne: resettoken.resettoken },
    })
      .remove()
      .exec();
    // res.status(200).json({ message: "Reset Password successfully." });
    var transporter = nodemailer.createTransport({
      host: "ssl0.ovh.net",
      port: 587,
      secure: false,
      auth: {
        user: "noreply@facacademy.fr",
        pass: "Fac20032017",
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      to: req.body.email,
      from: "noreply@facacademy.fr",
      subject: "Fac academy Password Reset",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
        "http://localhost:4200/reset/" +
        resettoken.resettoken +
        "\n\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };
    try {
      let info = await transporter.sendMail(mailOptions);
      res.send("email sent successfully");
    } catch (e) {
      res.send(e);
      console.log(e);
    }
  });
});

router.get("/:resettoken", async (req, res) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  if (!req.params.resettoken) {
    return res.status(500).json({ message: "Token is required" });
  }
  const user = await ResetToken.findOne({
    resettoken: req.params.resettoken,
  });
  if (!user) {
    return res.status(409).json({ message: "Invalid URL" });
  }
  User.findOneAndUpdate({ _id: user.userId })
    .then(() => {
      res.status(200).json({ message: "Token verified successfully." });
    })
    .catch((err) => {
      return res.status(500).send({ msg: err.message });
    });
});

router.post("/", async (req, res) => {
  try {
    const userToken = await ResetToken.findOne({
      resettoken: req.body.resettoken,
    });
    console.log(userToken);
    if (!userToken) {
      res.send("token non valid");
    }
    console.log(userToken);
    console.log("11");
    try {
      const userEmail = await User.findOne({
        _id: userToken.userId,
      });
      if (!userEmail) {
        console.log("2");
        res.send("user does not exist");
      }
      console.log("usermail: ", userEmail);

      try {
        const passwd = await bcrypt.hash(req.body.newPassword, 10);

        userEmail.hashedPassword = passwd;

        try {
          const results = await userEmail.save();
          console.log(results);
          res.send("ok");
        } catch (e) {
          res.send(e);
        }
      } catch (e) {
        res.send(e);
      }
    } catch (e) {
      res.send(e);
    }
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
