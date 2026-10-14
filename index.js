require("dotenv").config();

const express = require("express");
const UserRoute=require("./routes/user");
const PlanRoute = require("./routes/plan");
const SubscriptionRoute = require("./routes/subscription");
const ProfileRoute = require("./routes/profile");
const PremiumRoute = require("./routes/premium");
const {connectMongoDb}=require("./connection");

const app=express();
const port=process.env.PORT;

// Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Routes
app.use("/api/user",UserRoute);
app.use("/api/plans", PlanRoute);
app.use("/api/subscriptions", SubscriptionRoute);
app.use("/api/profile", ProfileRoute);
app.use("/api/premium", PremiumRoute);

// Home Route
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Subscription-Based SaaS Backend is running"
    });
});

// Connection

const mongoUri = process.env.MONGO_URI;

console.log("Mongo URI exists:", Boolean(mongoUri));
console.log(
  "Mongo URI scheme:",
  mongoUri ? mongoUri.split(":")[0] : "MISSING"
);

connectMongoDb(mongoUri)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
    process.exit(1);
  });

app.listen(port,()=>{
    console.log(`Server Started At Port ${port}`);
});