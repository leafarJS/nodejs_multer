const { Router } = require("express");
const path = require("path");

const rutas = Router();

//routes
rutas.get("/", (req, res) => {
  res.render("index");
});

rutas.post("/upload", (req, res) => {
  console.log(req.file);
  res.send("uploaded");
});

module.exports = rutas;
