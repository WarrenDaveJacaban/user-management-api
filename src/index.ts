import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/user";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

/**
 *  Middleware Configuration
 */
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

/**
 *  Middleware for Request Validation
 * Ensures all incoming requests contain valid JSON
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.is("application/json") && req.method !== "GET") {
    return res.status(400).json({ error: "Invalid request format. JSON required." });
  }
  next();
});

/**
 *  Routes
 */

// 👉 Add a welcome message for the root URL
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Welcome to the User Management API 🚀</h1><p>Use <code>/users</code> to interact with the API.</p>");
});

// User routes

// Function to check if required environment variables are set
const validateEnv = () => {
  const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_NAME"];
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      console.error(`❌ Missing environment variable: ${varName}`);
      process.exit(1);
    }
  });
};

// Initialize Database & Start Server
const startServer = async () => {
  try {
    validateEnv(); // Ensure all required environment variables are set

    await AppDataSource.initialize();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1); // Exit process on failure
  }
};

// Start the server
startServer();
