
const express = require("express");
const router = express.Router();

const {
    getProfile,
    getDashboard
} = require("../controllers/profile");

const { checkAuthentication } = require("../middlewares/auth");

// Get logged-in user's profile
router.get("/me", checkAuthentication, getProfile);

// Get logged-in user's dashboard
router.get("/dashboard", checkAuthentication, getDashboard);

module.exports = router;
