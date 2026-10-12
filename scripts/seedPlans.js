
require("dotenv").config();

const mongoose = require("mongoose");
const { connectMongoDb } = require("../connection");
const Plan = require("../models/plan");

const plans = [
    {
        name: "Free",
        price: 0,
        features: {
            storageMB: 100,
            premiumContent: false,
            description: "Basic access for free users"
        },
        level: 0
    },
    {
        name: "Basic",
        price: 500,
        features: {
            storageMB: 5120,
            premiumContent: false,
            description: "More storage for regular users"
        },
        level: 1
    },
    {
        name: "Premium",
        price: 1500,
        features: {
            storageMB: 51200,
            premiumContent: true,
            description: "Full access to premium features"
        },
        level: 2
    }
];

async function seedPlans() {
    try {
        await connectMongoDb(
            process.env.MONGO_URI ||
            "mongodb://127.0.0.1:27017/saas-backend"
        );

        for (const plan of plans) {
            await Plan.findOneAndUpdate(
                { name: plan.name },
                { $set: plan },
                {
                    upsert: true,
                    runValidators: true
                }
            );

            console.log(`${plan.name} plan seeded successfully`);
        }

        console.log("All plans seeded successfully");
    } catch (error) {
        console.error("Error seeding plans:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedPlans();
