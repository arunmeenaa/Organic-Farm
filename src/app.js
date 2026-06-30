const express = require("express");
const urlencoded = require('body-parser/urlencoded');
const cors = require('cors');
const authRoutes = require("./routes/auth.routes")

const app = express();
app.use(express.json())
app.use(cors());
app.use(express.urlencoded())



app.use("/api/auth",authRoutes )

module.exports = app;
