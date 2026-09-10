const express = require("express");

const {
  createContactSubmission,
} = require("../controllers/contactController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();


router.post(
  "/",
  upload.array("medicalReports", 5),
  createContactSubmission
);

module.exports = router;