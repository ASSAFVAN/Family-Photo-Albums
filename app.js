const express = require("express");
const cors = require("cors");
const path = require("path");
require("./src/db/mongoose");
const userRouter = require("./src/routes/userRoutes");
const app = express();
app.use(express.json());
app.use("/api", userRouter); //user router

const port = process.env.PORT || 5000;

const publicPath = path.join(__dirname, "client/build");
app.use(cors());
app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
