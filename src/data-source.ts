import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User"; // Ensure this path is correct

export const AppDataSource = new DataSource({
  type: "mysql", // Database type (you are using XAMPP, so MySQL)
  host: process.env.DB_HOST || "localhost", // Use environment variable or default to localhost
  port: Number(process.env.DB_PORT) || 3306, // Default MySQL port
  username: process.env.DB_USER || "root", // Default XAMPP user
  password: process.env.DB_PASSWORD || "", // Default is empty in XAMPP
  database: process.env.DB_NAME || "user_management", // Your database name
  synchronize: true, // Automatically sync database schema (set to false in production)
  logging: false, // Set to true for debugging SQL queries
  entities: [User], // List of entity models
  migrations: [],
  subscribers: [],
});

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully!");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });
