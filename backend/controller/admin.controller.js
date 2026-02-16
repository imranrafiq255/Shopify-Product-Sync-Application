const adminModel = require("../model/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { envVariables } = require("../config/env.config");
exports.signUp = async (req, res) => {
  try {
    const data = req.body;
    const admin = await adminModel.create(data);
    return res.json({
      success: true,
      message:
        "Admin with email of " + admin.adminEmail + " is saved successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.signIn = async (req, res) => {
  try {
    const { adminEmail, adminPassword } = req.body;
    if (!adminEmail || !adminPassword) {
      return res.status(404).json({
        success: false,
        message: "Admin email or password is missing!",
      });
    }
    const admin = await adminModel
      .findOne({ adminEmail: adminEmail })
      .select("+adminPassword");
    if (!admin) {
      return res.status(409).json({
        success: false,
        message: "No record found with given email",
      });
    }
    const isPasswordsSame = await bcrypt.compare(
      adminPassword,
      admin.adminPassword,
    );
    if (!isPasswordsSame) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const token = await jwt.sign(
      { _id: admin._id },
      envVariables.adminTokenSecretKey,
    );
    const options = {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 20,
      // sameSite: "none",
      // secure: false,
    }; // 20 minutes
    res.cookie("adminToken", token, options);
    return res.json({
      success: true,
      message: "You signed in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.logout = async (req, res) => {
  try {
    res.clearCookie("adminToken");
    return res.json({
      success: true,
      message: "You signed out successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.loadCurrentLoggedAdmin = async (req, res) => {
  try {
    const admin = req.admin;
    return res.json({
      success: true,
      admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
