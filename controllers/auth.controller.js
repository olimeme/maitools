var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");

exports.signup = (req, res) => {
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user
    .save()
    .then((user) => {
      console.log(`User registered: \n\n ${user}`);
      res.status(200).send({
        message: "User Registered successfully",
      });
    })
    .catch((err) =>
      res.status(500).send({
        message: err,
      })
    );
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User Not found.",
        });
      }

      //comparing passwords
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // checking if password was valid and send response accordingly
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      //signing token with user id
      var token = jwt.sign(
        {
          id: user.id,
        },
        process.env.API_SECRET,
        {
          expiresIn: 3600,
        }
      );
      console.log(`User logged in: \n\n ${user}`);
      // res.cookie("jwt", token, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "strict", // Restrict cookie to same site
      //   maxAge: 3600,
      // });
      return res.status(200).send({
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          token: token,
        },
        message: "Login successful",
      });
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message,
      })
    );
};
