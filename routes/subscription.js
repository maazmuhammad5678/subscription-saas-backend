
const express = require("express");
const router = express.Router();

const {
    subscribeToPlan,
    getMySubscription,
    cancelSubscription
} = require("../controllers/subscription");

const { checkAuthentication } = require("../middlewares/auth");

// Subscribe to a plan
router.post("/", checkAuthentication, subscribeToPlan);

// Get the logged-in user's subscription
router.get("/me", checkAuthentication, getMySubscription);

// Cancel the logged-in user's subscription
router.patch("/cancel", checkAuthentication, cancelSubscription);

module.exports = router;
