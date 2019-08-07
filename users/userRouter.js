const express = "express";
const db = require("./userDb");
const router = require("express").Router();

router.post("/", validateUser, (req, res) => {
  db.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "Error adding user" });
    });
});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving users" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  db.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving user" });
    });
});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  db.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error accessing that user from the database"
      });
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "User data is missing" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Required name field is missing" });
  }
  next();
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "Post data is missing" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "Required text field is missing" });
  }
  next();
}

module.exports = router;
