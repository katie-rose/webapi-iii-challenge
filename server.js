const express = "express";
const server = require("express").Router();

server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  res.status(200).json({ api: "the logger is working" });
    next();
}

module.exports = server;
