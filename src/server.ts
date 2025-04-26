import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.route.js";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // Allow frontend URL or all origins (*)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies (for authentication)
  })
);
app.use(errorHandler);

app.use("/api/v1/todos", todoRoutes);

const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${5000}`);
  });

  app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to todo server" });
  });
});
