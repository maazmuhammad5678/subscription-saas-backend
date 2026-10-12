
async function getPremiumContent(req, res) {
    return res.status(200).json({
        message: "Premium content accessed successfully!",
        content: {
            title: "Welcome to Premium",
            description: "You have access to exclusive premium content.",
            features: [
                "Access to exclusive content",
                "Premium learning resources",
                "Advanced features"
            ]
        }
    });
}

module.exports = {
    getPremiumContent
};
