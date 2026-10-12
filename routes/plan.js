
const express = require("express");

const router = express.Router();

const {
    getAllPlans,
    getPlanById
} = require("../controllers/plan");

// Get all plans
router.get("/", getAllPlans);

// Get one plan by ID
router.get("/:id", getPlanById);

module.exports = router;
