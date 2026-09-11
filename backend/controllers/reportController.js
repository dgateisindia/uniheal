const fs = require("fs");
const path = require("path");

const getMedicalReport = (req, res) => {
  const { filename } = req.params;

  if (!filename) {
    return res.status(400).json({
      success: false,
      message: "Report filename is required.",
    });
  }

  // Prevent path traversal attacks
  const safeFilename = path.basename(filename);

  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    safeFilename
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "Medical report not found.",
    });
  }

  res.sendFile(filePath);
};

module.exports = {
  getMedicalReport,
};