const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            enum: ["Free", "Basic", "Premium"]
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        features: {
            storageMB: {
                type: Number,
                required: true,
                min: 0
            },
            premiumContent: {
                type: Boolean,
                default: false
            },
            description: {
                type: String,
                default: ""
            }
        },
        level: {
            type: Number,
            required: true,
            min: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);