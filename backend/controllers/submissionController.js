const db = require("../config/db");

const getAllSubmissions = (req, res) => {
  const sql = `
    SELECT
      id,
      name,
      email,
      contact,
      country,
      treatment,
      medical_reports,
      medical_history,
      created_at
    FROM contact_submissions
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(
        "❌ Error fetching submissions:",
        err.message
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch submissions.",
      });
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      submissions: results,
    });
  });
};

module.exports = {
  getAllSubmissions,
};