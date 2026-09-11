const bcrypt = require("bcryptjs");
const db = require("./config/db");

const adminName = "UniHeal Admin";
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

const createAdmin = async () => {
  try {
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const sql = `
      INSERT INTO admin_users
      (name, email, password_hash)
      VALUES (?, ?, ?)
    `;

    db.query(
      sql,
      [adminName, adminEmail, passwordHash],
      (err, result) => {
        if (err) {
          console.error("❌ Failed to create admin:", err.message);
          process.exit(1);
        }

        console.log("✅ Admin created successfully!");
        console.log("Admin ID:", result.insertId);
        console.log("Email:", adminEmail);

        process.exit(0);
      }
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();