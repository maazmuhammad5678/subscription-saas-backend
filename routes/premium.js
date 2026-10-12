
const express = require("express");
const router = express.Router();

const { checkAuthentication } = require("../middlewares/auth");
const { requirePremium } = require("../middlewares/subscriptionGuard");
const { getPremiumContent } = require("../controllers/premium");

// Protected premium content
router.get(
    "/",
    checkAuthentication,
    requirePremium,
    getPremiumContent
);

module.exports = router;
