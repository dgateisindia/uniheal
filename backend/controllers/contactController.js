const db = require("../config/db");

const createContactSubmission = (req, res) => {

  const {
    name,
    email,
    contact,
    country,
    treatment,
    medicalHistory,
  } = req.body;

  if (
    !name ||
    !email ||
    !contact ||
    !country ||
    !treatment ||
    !medicalHistory
  ) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be filled.",
    });
  }

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  const phonePattern =
    /^[6-9]\d{9}$/;

  if (!phonePattern.test(contact)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid 10-digit mobile number.",
    });
  }


  let medicalReports = null;

  if (req.files && req.files.length > 0) {

    medicalReports = req.files
      .map((file) => file.filename)
      .join(",");
  }


  const sql = `
    INSERT INTO contact_submissions
    (
      name,
      email,
      contact,
      country,
      treatment,
      medical_reports,
      medical_history
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;


  const values = [
    name.trim(),
    email.trim(),
    contact.trim(),
    country.trim(),
    treatment.trim(),
    medicalReports,
    medicalHistory.trim(),
  ];


  db.query(sql, values, (err, result) => {

    if (err) {

      console.error(
        "❌ Error saving contact submission:",
        err
      );

      return res.status(500).json({
        success: false,
        message: "Failed to save contact submission.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Contact submission saved successfully.",
      submissionId: result.insertId,
    });

  });

};


module.exports = {
  createContactSubmission,
};