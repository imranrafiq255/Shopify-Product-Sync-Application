const express = require("express");
const {
  signIn,
  signUp,
  logout,
  loadCurrentLoggedAdmin,
} = require("../controller/admin.controller");
const { isAdminAuthenticated } = require("../middleware/admin.middleware");

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/logout", isAdminAuthenticated, logout);
router.get(
  "/load-current-logged-admin",
  isAdminAuthenticated,
  loadCurrentLoggedAdmin,
);

module.exports = router;
