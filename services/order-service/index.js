const express = require("express");
const app = express();

app.get("/orders", (req, res) => {
  res.json(["Order-101", "Order-102"]);
});

app.listen(5002);
