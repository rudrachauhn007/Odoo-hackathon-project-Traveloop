const express = require("express");
const router = express.Router();
const { createNewTrip } = require("../controllers/tripController");
const auth = require("../middleware/auth"); // JWT Middleware

// Requirement: Form to initiate a new trip [cite: 37]
router.post("/", auth, createNewTrip);

module.exports = router;
