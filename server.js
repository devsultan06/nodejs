import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import logger from "./middleware/logger.js";
import mongoose from "mongoose";

import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import products from "./routes/products.js";
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.use("/api/posts", posts);
app.use("/api/products", products);

app.use(notFound);

app.use(errorHandler);

process.stdin.setEncoding("utf-8");

console.log("What is your name?");
process.stdin.on("data", (input) => {
  console.log(`Hello, ${input.trim()}!`);
  process.exit(); // to end the program
});

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
