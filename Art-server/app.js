//Required dependencies
const mongoose = require("mongoose");
const express = require("express");

//Creating an Express Application
const app = express();

//Middlewares
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Importing routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBRoutes");

//.env
require("dotenv").config();

//Connecting to mongodb
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

//Using middleware in app
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Using routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);

//Port
const port = process.env.PORT || 5000;

//Starting server
app.listen(port, () => {
  console.log(`App is up and running at ${port}`);
});
