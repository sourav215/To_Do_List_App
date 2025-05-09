import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import timeout from "connect-timeout";
import { CONFIG } from "./config/config";
import { connectDatabase } from "./config/db";

import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";
import adminRoutes from "./routes/admin.routes";

import timeoutError from "./middlewares/timeoutError.middleware";

// Middlewares
const app = express();
app.use(express.json());
app.use(timeout("20s"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/admin", adminRoutes);

// 404 Not Found handler (for unmatched routes)
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// Error-handling middleware
app.use(timeoutError);

// app.use("/", (req: Request, res: Response) => {
//     res.json({
//       isSuccess: true,
//       message: "Server is Running",
//     });
//   });

app.listen(CONFIG.PORT, async () => {
  try {
    await connectDatabase();
    console.log(`Server is Listening..`);
  } catch (error) {
    console.log(error);
  }
});
