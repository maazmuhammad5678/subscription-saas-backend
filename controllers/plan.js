
const Plan = require("../models/plan");

// Get all subscription plans
async function getAllPlans(req, res) {
    try {
        const plans = await Plan.find().sort({ level: 1 });

        return res.status(200).json({
            message: "Plans fetched successfully",
            count: plans.length,
            plans
        });
    } catch (error) {
        console.error("Get plans error:", error.message);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Get a single plan by ID
async function getPlanById(req, res) {
    try {
        const { id } = req.params;

        const plan = await Plan.findById(id);

        if (!plan) {
            return res.status(404).json({
                message: "Plan not found"
            });
        }

        return res.status(200).json({
            message: "Plan fetched successfully",
            plan
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid plan ID"
            });
        }

        console.error("Get plan error:", error.message);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    getAllPlans,
    getPlanById
};
