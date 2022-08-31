const express = require("express");
const path = require("path");

const route = express.Router();

route.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

route.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public/about.html"));
});

route.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public/contact.html"));
});

route.get("/shop", (req, res) => {
  res.sendFile(path.join(__dirname, "public/shop.html"));
});

route.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "public/cart.html"));
});

module.exports = route;
