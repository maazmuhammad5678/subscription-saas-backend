
const Subscription = require("../models/subscription");

function requirePremium(req, res, next) {
    checkPremiumSubscription(req, res, next);
}

async function checkPremiumSubscription(req, res, next) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const subscription = await Subscription.findOne({
            userId: req.user.id,
            status: "active"
        }).populate("planId");

        if (!subscription || !subscription.planId) {
            return res.status(403).json({
                message: "An active subscription is required"
            });
        }

        if (!subscription.planId.features.premiumContent) {
            return res.status(403).json({
                message: "Your current plan does not include premium content"
            });
        }

        if (
            subscription.endDate &&
            subscription.endDate < new Date()
        ) {
            return res.status(403).json({
                message: "Your subscription has expired"
            });
        }

        next();
    } catch (error) {
        console.error("Subscription check error:", error.message);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    requirePremium
};
