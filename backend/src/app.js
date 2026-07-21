const express = require("express");
const urlencoded = require("body-parser/urlencoded");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const reviewRoutes = require("./routes/review.routes");
const cartRoutes = require("./routes/cart.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const machineRoutes = require("./routes/machine.routes");
const machineBookingRoutes = require("./routes/machineBooking.routes");
const notificationRoutes = require("./routes/notification.routes");
const aiRoutes = require("./routes/ai.routes");
const userRoutes = require("./routes/user.routes");
const serviceRequestRoutes = require("./routes/serviceRequest.routes");
const counterRoutes = require("./routes/counter.routes")
const serviceOrders = require("./routes/serviceOrder.routes")

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/machines", machineRoutes);
app.use("/api/machine-bookings", machineBookingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/users", userRoutes);
app.use("/api/service-requests", serviceRequestRoutes);
app.use("/api/counter-offers",counterRoutes)
app.use("/api/service-orders",serviceOrders)

module.exports = app;
