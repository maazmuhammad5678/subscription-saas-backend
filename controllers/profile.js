
const User = require("../models/User");
const Subscription = require("../models/Subscription");

// Get logged-in user's profile
async function getProfile(req, res) {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile fetched successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error("Get profile error:", error.message);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Get logged-in user's dashboard
async function getDashboard(req, res) {
    try {
        const subscription = await Subscription.findOne({
            userId: req.user.id,
            status: "active"
        }).populate("planId");

        return res.status(200).json({
            message: "Dashboard fetched successfully",
            user: {
                id: req.user.id
            },
            subscription: subscription || null,
            hasPremiumAccess: Boolean(
                subscription &&
                subscription.planId &&
                subscription.planId.features.premiumContent
            )
        });
    } catch (error) {
        console.error("Get dashboard error:", error.message);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    getProfile,
    getDashboard
};
