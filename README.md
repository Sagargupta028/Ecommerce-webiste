# Ecommerce Web App (Node/Express + MongoDB + React)

A full-stack ecommerce application with a Node/Express REST API (MongoDB + Mongoose) backend and a React (Create React App) frontend. Includes authentication (JWT), product/catalog management, cart/checkout flows, and Razorpay payment integration.

## Tech Stack
- **Frontend**: React 18 (Create React App), React Router, Redux/Thunk, Material UI, Tailwind CSS (config present)
- **Backend**: Node.js, Express, Mongoose/MongoDB, JWT, Bcrypt, Razorpay SDK, Dotenv, CORS
- **Build/Tooling**: CRA scripts, Nodemon for backend dev

## Monorepo Structure
```
Ecommerece-/
├─ backend/
│  ├─ src/
│  │  ├─ config/
│  │  ├─ controller/
│  │  ├─ middleware/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ scripts/
│  │  ├─ services/
│  │  ├─ index.js
│  │  └─ server.js
│  ├─ package.json
│  └─ .env (ignored by git)
└─ frontend/
   ├─ public/
   ├─ src/
   │  ├─ Admin/
   │  ├─ customer/
   │  ├─ State/
   │  ├─ Routes/
   │  └─ ...
   ├─ package.json
   ├─ tailwind.config.js
   └─ .env (optional, ignored by git)
```

## Prerequisites
- Node.js 18+ and npm
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- Razorpay account for payment keys (for checkout flows)

## Environment Variables

### Backend Environment Variables
Create a `.env` file in `backend/` with the following variables:
```
# Server
PORT=5454

# Database
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority&appName=<appName>

# Auth
JWT_SECRET=your_jwt_secret_key_here

# Payments (Razorpay)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Frontend Environment Variables
Create a `.env` file in `frontend/` with:
```
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5454
```

**Important**: Replace placeholder values with your actual credentials. The backend runs on port 5454, and the frontend is configured to connect to this port.

## Install Dependencies
- Backend
  - Navigate to `backend/` and run:
    ```bash
    npm install
    ```
- Frontend
  - Navigate to `frontend/` and run:
    ```bash
    npm install
    ```

## Run in Development
Open two terminals:
- Backend (Express + MongoDB):
  ```bash
  # from backend/
  npm run dev
  # Runs nodemon on src/server.js (port 5454)
  ```
- Frontend (React dev server):
  ```bash
  # from frontend/
  npm start
  # Opens http://localhost:3000
  ```

The frontend is already configured to connect to the backend API at `http://localhost:5454` via the `REACT_APP_API_BASE_URL` environment variable.

## Production Builds
- Frontend build:
  ```bash
  # from frontend/
  npm run build
  ```
  Outputs production assets to `frontend/build/`.

- Backend start:
  ```bash
  # from backend/
  npm start
  ```
  Ensure `src/server.js` is the main server entry and environment variables are configured.

## Available Scripts
- Backend (`backend/package.json`):
  - `npm run dev`: Start Express API with Nodemon at `src/server.js`.
  - `npm start`: Start Express API with Node using the server entry.
- Frontend (`frontend/package.json`):
  - `npm start`: Start React dev server at `http://localhost:3000`.
  - `npm run build`: Create production build.
  - `npm test`: Run tests (CRA default).
  - `npm run eject`: Eject CRA (irreversible).

## Notable Directories (Backend)
- `backend/src/routes/`: Express route definitions. Check here for available endpoints.
- `backend/src/controller/`: Request handlers/business logic.
- `backend/src/models/`: Mongoose models/schemas.
- `backend/src/services/`: External service integrations and helpers (e.g., payments, email, etc.).
- `backend/src/middleware/`: Authentication, validation, error handling middleware.
- `backend/src/config/`: Configuration helpers (DB connect, env loaders).

## Notable Directories (Frontend)
- `frontend/src/customer/`: Customer-facing pages/components.
- `frontend/src/Admin/`: Admin dashboard and components.
- `frontend/src/State/`: Redux store, actions, reducers, thunks.
- `frontend/src/Routes/`: Route modules for React Router.
- `frontend/tailwind.config.js`: Tailwind content scanning config.

## API & Data
- Inspect `backend/src/routes/` to see available endpoints and their HTTP methods.
- Common entities: Users, Products, Cart, Orders, Payments.
- Auth: Likely JWT-based; ensure `Authorization: Bearer <token>` on protected routes.

## Common Issues & Tips
- CORS errors: Set `CLIENT_URL` and ensure CORS middleware allows your frontend origin.
- MongoDB connection: Verify `MONGO_URI` and network access for your cluster.
- JWT errors: Ensure `JWT_SECRET` is set and consistent across environments.
- Payments: Configure Razorpay test keys in dev; switch to live keys in prod.

## Contributing
- Create a branch for your feature/fix.
- Keep changes scoped and add helpful comments.
- Follow existing patterns in `controller/`, `services/`, and `routes/`.

