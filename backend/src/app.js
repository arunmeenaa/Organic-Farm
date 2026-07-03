const express = require("express");
const urlencoded = require('body-parser/urlencoded');
const cors = require('cors');
const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/product.routes")
const orderRoutes = require("./routes/order.routes")
const reviewRoutes = require("./routes/review.routes")
const cartRoutes = require("./routes/cart.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth",authRoutes )
app.use("/api/product", productRoutes);
app.use("/api/orders", orderRoutes)
app.use("/api/review", reviewRoutes)
app.use("/api/cart", cartRoutes);

app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
