var express = require("express"),
  router = express.Router(),
  Todo = require("../models/todo"),
  verifyToken = require("../middlewares/authJWT");

router.get("/todos", verifyToken, function (req, res) {
  if (!req.user) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  }

  Todo.find({
    created_by: req.user.id,
  })
    .populate("created_by", "-password")
    .then((todos) => {
      res.status(200).send({
        todos: todos,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
});

router.post("/todos/create", verifyToken, function (req, res) {
  if (!req.user) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  }

  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    created_by: req.user.id,
  });

  todo
    .save()
    .then((todo) => {
      res.status(200).send({
        message: "Todo created successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
});

router.delete("/todos/:id", verifyToken, function (req, res) {
  if (!req.user) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  }

  Todo.findByIdAndDelete(req.params.id)
    .then((todo) => {
      res.status(200).send({
        message: "Todo deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
});

module.exports = router;
