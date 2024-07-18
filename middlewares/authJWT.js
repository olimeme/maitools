const jwt = require("jsonwebtoken");
User = require("../models/user");

const verifyToken = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.API_SECRET,
      function (err, decode) {
        if (!decode || err) {
          req.user = undefined;
          res.status(403).send({ message: "Invalid JWT token" });
        }

        User.findOne({
          _id: decode.id,
        })
          .exec()
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) =>
            res.status(500).send({
              message: "Please login in order to use this feature",
            })
          );
      }
    );
  } else {
    req.user = undefined;
    next();
  }
};
module.exports = verifyToken;
