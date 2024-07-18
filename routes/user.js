var express = require("express"),
  router = express.Router(),
  verifyToken = require("../middlewares/authJWT"),
  { signup, signin } = require("../controllers/auth.controller.js");

router.post("/register", signup, function (req, res) {});

router.post("/login", signin, function (req, res) {});

router.get("/hiddencontent", function (req, res) {
  res.status(200).send({
    message: "You have accessed the hidden content!",
  });
});

module.exports = router;
