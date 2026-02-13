const jwt = require("jsonwebtoken");
const { envVariables } = require("../config/env.config");
const adminModel = require("../model/admin.model");
const isAdminAuthenticated = async (req, res, next) => {
  try {
    const { adminToken } = req.cookies;
    if (!adminToken) {
      return res.status(401).json({
        success: false,
        message: "Admin not authenticated, please sign in!",
      });
    }
    const decodedToken = jwt.verify(
      adminToken,
      envVariables.adminTokenSecretKey,
    );
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    const admin = await adminModel.findOne({ _id: decodedToken?._id });
    if (!admin) {
      res.clearCookie("adminToken");
      return res.status(401).json({
        success: false,
        message: "Please sign in again!",
      });
    }
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { isAdminAuthenticated };
