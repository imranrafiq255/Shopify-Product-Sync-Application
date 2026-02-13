const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: [true, "Token is required field"],
  },
});

const tokenModel = mongoose.model("Token", tokenSchema);

module.exports = { tokenModel };
