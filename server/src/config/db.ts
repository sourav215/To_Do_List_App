import mongoose from "mongoose";
import { CONFIG } from "./config";

mongoose.set("strictQuery", true);

export const connectDatabase = async () => {
  try {
    console.log("Database called");
    await mongoose.connect(CONFIG.DATABASE_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("Could not connect to Database", error);
  }
};
