require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logRequests } = require("./middleware/logEvents");
const logErrors = require("./middleware/errorLogger");
const credentials = require("./middleware/credentials");
const verifyToken = require("./middleware/verifyJWT");
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
const connectDb = require("./config/dbConnection");

connectDb();
app.use(logRequests);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/signup", require("./routes/signUp"));
app.use("/login", require("./routes/login"));
app.use("/refresh", require("./routes/refresh"));
app.use(verifyToken);
app.use("/api/todos", require("./routes/api/todos"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(logErrors);
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
