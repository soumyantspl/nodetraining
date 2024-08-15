const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const validator = require("../validators/employeeValidator");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Serve static files from the 'uploads' directory
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* CREATE EMPLOYEE  */
router.post(
  "/createEmployee",
  validator.createEmployeeValidator,
  upload.fields([
    { name: "employeeImage", maxCount: 1 }
  ]),
  authMiddleware.verifyUserToken,
  employeeController.createEmployee
);

/* EDIT EMPLOYEE  */
router.put(
  "/editEmployee/:id",
  validator.editEmployeeValidator,
  authMiddleware.verifyUserToken,
  employeeController.editEmployee
);
/* DELETE EMPLOYEE  */
router.delete(
  "/deleteEmployee/:id",
  validator.deleteEmployeValidator,
  authMiddleware.verifyUserToken,
  employeeController.deleteEmployee
);
/* VIEW EMPLOYEE  */
router.post(
  "/listEmployee",
  validator.listEmployesValidator,
  authMiddleware.verifyUserToken,
  employeeController.listEmployee
);
/* VIEW SINGLE EMPLOYEE  */
router.get(
  "/viewSingleEmployee/:id",
  validator.viewSingleEmployeeValidator,
  authMiddleware.verifyUserToken,
  employeeController.viewSingleEmployee
);

module.exports = router;
