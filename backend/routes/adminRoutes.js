const express = require("express");

const {
  adminLogin,
} = require("../controllers/adminController");

const {
  getAllSubmissions,
} = require("../controllers/submissionController");

const {
  getMedicalReport,
} = require("../controllers/reportController");

const {
  verifyAdminToken,
} = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================================
   ADMIN LOGIN
   Public route
========================================= */

router.post(
  "/login",
  adminLogin
);

/* =========================================
   GET ALL PATIENT SUBMISSIONS
   Protected route
========================================= */

router.get(
  "/submissions",
  verifyAdminToken,
  getAllSubmissions
);

/* =========================================
   VIEW MEDICAL REPORT
   Protected route
========================================= */

router.get(
  "/reports/:filename",
  verifyAdminToken,
  getMedicalReport
);

module.exports = router;