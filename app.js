const express = require("express");
const app = express();
const path = require("path");
const route = require("./router");

app.use(express.static(path.join(__dirname, "public")));
app.use(route);
app.all("*", (req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, "/public/error.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);
