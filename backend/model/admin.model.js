const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema({
  adminName: {
    type: String,
    required: [true, "Admin name is required"],
  },
  adminEmail: {
    type: String,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: "Invalid email address",
    },
    unique: [true, "Admin email should be unique"],
    required: [true, "Admin email is required"],
  },
  adminPassword: {
    type: String,
    minlength: [8, "admin password should be greater than or equal to 8"],
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v);
      },
      message: (props) => {
        if (!/(?=.*[a-z])/.test(props.value))
          return "Password must contain at least one lowercase letter";
        if (!/(?=.*[A-Z])/.test(props.value))
          return "Password must contain at least one uppercase letter";
        if (!/(?=.*\d)/.test(props.value))
          return "Password must contain at least one number";
        if (!/(?=.*[\W_])/.test(props.value))
          return "Password must contain at least one special character";
        return "Invalid password";
      },
    },
    required: [true, "admin password is required"],
    select: false,
  },
});
adminSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("adminPassword")) return;
    this.adminPassword = await bcrypt.hash(this.adminPassword, 10);
  } catch (error) {
    throw error;
  }
});
const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;
