require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
const connectDb = require("./config/dbConnection");

connectDb();

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser);

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
