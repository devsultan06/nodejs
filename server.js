import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.use("/api/posts", posts);

app.listen(port, () => {
  console.log("Server is running on port 8000");
});
