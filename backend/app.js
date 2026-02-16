const express = require("express");
const { databaseConnection } = require("./config/db.config.js");
const productRouter = require("./route/product.route.js");
const productWebhookRouter = require("./route/product-webhook.route.js");
const tokenRouter = require("./route/token.route.js");
const adminRouter = require("./route/admin.route.js");
const cors = require("cors");
const { envVariables } = require("./config/env.config.js");
const app = express();
const cookieParser = require("cookie-parser");
databaseConnection(envVariables.mongoUri);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/webhook", productWebhookRouter);

app.use("/products", productRouter);
app.use("/auth", tokenRouter);
app.use("/admin", adminRouter);
module.exports = app;
