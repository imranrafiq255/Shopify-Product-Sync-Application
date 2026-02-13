const mongoose = require("mongoose");
const databaseConnection = (MONGO_URI) => {
  mongoose
    .connect(MONGO_URI)
    .then((con) =>
      console.log(`MongoDB is connected on ${con.connection.host}`),
    )
    .catch((error) => console.log(error));
};

module.exports = { databaseConnection };
