const express = require("express");
const cors = require("cors");

require("dotenv").config();

require("./config/db");

const contactRoutes = require("./routes/contactRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

/* =========================================
   MIDDLEWARE
========================================= */

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* =========================================
   CONTACT ROUTES
========================================= */

app.use(
  "/api/contact",
  contactRoutes
);

/* =========================================
   TEST ROUTE
========================================= */

app.get("/", (req, res) => {
  res.json({
    message: "UniHeal backend is running",
  });
});

/* =========================================
   START SERVER
========================================= */

app.listen(PORT, () => {
  console.log(
    `🚀 UniHeal backend running on port ${PORT}`
  );
});