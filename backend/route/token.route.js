const express = require("express");
const { tokenController } = require("../controller/token.controller");

const router = express.Router();
router.get("/callback", tokenController);
module.exports = router;
