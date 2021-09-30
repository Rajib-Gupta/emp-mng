const express = require("express");
const path = require("path");
const compression = require("compression");

const PORT = 9003;
const app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, "/dist/emp-mng")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/emp-mng/index.html"));
});
app.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT}`);
});