const express = require("express");
const app = express();

app.get("/auth/health", (req, res) => {
  res.json({ status: "Auth Service OK" });
});

app.listen(5000, () => {
  console.log("Auth service running on port 5000");
});
