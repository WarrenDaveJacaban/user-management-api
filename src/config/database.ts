import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

//  Load environment variables
dotenv.config();

//  Debugging: Log database connection details (avoid logging sensitive data in production)
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS ? "****" : "Not Set"); // Mask password for security
console.log("DB_NAME:", process.env.DB_NAME);

//  Validate required environment variables
const requiredEnvVars = ["DB_HOST", "DB_USER", "DB_NAME"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Missing required environment variable: ${varName}`);
    process.exit(1); // Exit process if a required variable is missing
  }
});

//  Check if ormconfig.json exists
let ormConfig;
const ormConfigPath = path.join(__dirname, "../../ormconfig.json");

if (fs.existsSync(ormConfigPath)) {
  ormConfig = require(ormConfigPath);
  console.log("✅ Using ormconfig.json for database configuration.");
} else {
  ormConfig = {
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "user_management",
    synchronize: true, // ⚠️ For development only. Set to false in production.
    logging: true, // Enable query logging for debugging
    entities: [User],
  };
  console.log("✅ Using .env for database configuration.");
}

// Database Connection Setup
export const AppDataSource = new DataSource(ormConfig);

// Database Initialization Function
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1); // Exit process on failure
  }
};
