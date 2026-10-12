
const Subscription = require("../models/Subscription");
const Plan = require("../models/Plan");

// Subscribe to a plan
async function subscribeToPlan(req, res) {
    try {
        const { planId } = req.body;

        if (!planId) {
            return res.status(400).json({
                message: "Plan ID is required"
            });
        }

        const plan = await Plan.findById(planId);

        if (!plan) {
            return res.status(404).json({
                message: "Plan not found"
            });
        }

        const userId = req.user.id;

        const existingSubscription = await Subscription.findOne({
            userId,
            status: "active"
        });

        if (existingSubscription) {
            return res.status(409).json({
                message: "You already have an active subscription. Cancel it before subscribing to another plan."
            });
        }

        const subscription = await Subscription.create({
            userId,
            planId: plan._id,
            startDate: new Date(),
            endDate: plan.name === "Free"
                ? null
                : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: "active"
        });

        return res.status(201).json({
            message: "Subscription created successfully",
            subscription
        });
    } catch (error) {
        console.error("Subscribe error:", error.message);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Get current subscription
async function getMySubscription(req, res) {
    try {
        const subscription = await Subscription.findOne({
            userId: req.user.id,
            status: "active"
        }).populate("planId");

        if (!subscription) {
            return res.status(404).json({
                message: "No active subscription found"
            });
        }

        return res.status(200).json({
            message: "Subscription fetched successfully",
            subscription
        });
    } catch (error) {
        console.error("Get subscription error:", error.message);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Cancel current subscription
async function cancelSubscription(req, res) {
    try {
        const subscription = await Subscription.findOne({
            userId: req.user.id,
            status: "active"
        });

        if (!subscription) {
            return res.status(404).json({
                message: "No active subscription found"
            });
        }

        subscription.status = "cancelled";
        await subscription.save();

        return res.status(200).json({
            message: "Subscription cancelled successfully",
            subscription
        });
    } catch (error) {
        console.error("Cancel subscription error:", error.message);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    subscribeToPlan,
    getMySubscription,
    cancelSubscription
};
