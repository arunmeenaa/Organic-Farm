const express = require("express");
const urlencoded = require('body-parser/urlencoded');
const cors = require('cors');
const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/product.routes")

const app = express();
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));



app.use("/api/auth",authRoutes )
app.use("/api/product",productRoutes)

module.exports = app;
