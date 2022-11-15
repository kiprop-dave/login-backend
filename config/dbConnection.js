const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    console.log("connecting to db...");
    mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
