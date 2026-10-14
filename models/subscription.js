
const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plan",
            required: true
        },

        startDate: {
            type: Date,
            required: true
        },

        endDate: {
            type: Date,
            default: null
        },

        status: {
            type: String,
            enum: ["active", "cancelled", "expired"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

module.exports =module.exports =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);
