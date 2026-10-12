# Subscription-Based SaaS Backend

A RESTful backend for a subscription-based Software as a Service (SaaS) application, built with Node.js, Express.js, and MongoDB. The project provides user authentication, subscription plan management, and premium content access control.

## Features

- **User Authentication:** User signup and login.
- **Password Security:** Password hashing with bcrypt.
- **JWT Authentication:** Token-based authentication using JSON Web Tokens.
- **Subscription Plans:** Free, Basic, and Premium plans.
- **Subscription Management:** Create, view, and cancel subscriptions.
- **User Profile:** Retrieve authenticated user profile information.
- **User Dashboard:** View subscription details and premium access status.
- **Premium Content Protection:** Restrict premium content to users with an eligible active subscription.
- **MongoDB Integration:** Store users, plans, and subscriptions using Mongoose.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- dotenv

## Project Structure

```text
saas-backend/
├── controllers/
│   ├── plan.js
│   ├── premium.js
│   ├── profile.js
│   ├── subscription.js
│   └── user.js
├── middlewares/
│   ├── auth.js
│   └── subscriptionGuard.js
├── models/
│   ├── plan.js
│   ├── subscription.js
│   └── user.js
├── routes/
│   ├── plan.js
│   ├── premium.js
│   ├── profile.js
│   ├── subscription.js
│   └── user.js
├── scripts/
│   └── seedPlans.js
├── service/
│   └── auth.js
├── .gitignore
├── connection.js
├── index.js
├── package.json
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/maazmuhammad5678/subscription-saas-backend.git
```

### 2. Navigate to the project directory

```bash
cd subscription-saas-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add:

```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/saas-backend
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=1d
```

Replace `your_long_random_secret` with a secure, randomly generated secret. Never commit your real `.env` file to GitHub.

### 5. Start MongoDB

Ensure MongoDB is installed and running locally, or configure `MONGO_URI` to use your MongoDB deployment.

### 6. Seed subscription plans

Run the following command to create or update the default plans:

```bash
node scripts/seedPlans.js
```

### 7. Start the server

```bash
node index.js
```

The server will run on:

`http://localhost:8000`

## API Endpoints

All endpoints use the base URL `http://localhost:8000`.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/signup` | Register a new user |
| POST | `/api/user/login` | Log in and receive a JWT |

### Subscription Plans

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/plans` | Retrieve all plans |
| GET | `/api/plans/:id` | Retrieve a plan by ID |

### Subscriptions

These endpoints require a valid JWT Bearer token.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/subscriptions` | Subscribe to a plan |
| GET | `/api/subscriptions/me` | Get the current subscription |
| PATCH | `/api/subscriptions/cancel` | Cancel the current subscription |

### Profile and Dashboard

These endpoints require authentication.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/profile/me` | Retrieve the user's profile |
| GET | `/api/profile/dashboard` | Retrieve dashboard and subscription information |

### Premium Content

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/premium` | Access protected premium content |

A valid Bearer token and an eligible active subscription are required to access premium content.

## Authentication

After successful login, the API returns a JWT token.

For protected endpoints, include the token in the HTTP request's Authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Replace `YOUR_JWT_TOKEN` with the token returned by the login endpoint.

## Default Subscription Plans

The seed script provides the following sample plans:

| Plan | Price | Storage | Premium Content |
|---|---:|---:|---|
| Free | 0 | 100 MB | No |
| Basic | 500 | 5 GB | No |
| Premium | 1500 | 50 GB | Yes |

Prices are sample values in unspecified currency units. The project does not currently process real payments.

## Testing

The API can be tested using Postman.

Recommended testing sequence:

1. Register a user.
2. Log in and copy the JWT token.
3. Retrieve available subscription plans.
4. Subscribe to a plan using its MongoDB ID.
5. Retrieve the user's profile and dashboard.
6. Test premium content access with different subscription plans.
7. Cancel the subscription and verify the response.

## Security Notes

- Passwords are hashed before being stored.
- Protected routes use JWT authentication.
- Premium content is guarded by subscription checks.
- Environment variables should remain private.
- This project is a learning implementation and should undergo further security review before production use.

## Future Improvements

- Subscription expiry automation.
- Plan upgrades and downgrades.
- Payment gateway integration.
- Automated tests.
- Request validation and rate limiting.
- Production deployment.

## Author

**Muhammad Maaz Bin Aamir**

GitHub: [@maazmuhammad5678](https://github.com/maazmuhammad5678)

---

If you find this project useful, feel free to explore the repository and share feedback.
