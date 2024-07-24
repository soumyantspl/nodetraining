const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validator = require("../validators/authValidator");


/* SET PASSWORD FOR SIGN IN */
router.post("/setPassword", validator.setPasswordValidator, authController.setPassword);

/* SIGN IN BY PASSWORD */
router.post("/signInByPassword", validator.signInByPasswordValidator, authController.signInByPassword);



module.exports = router;
