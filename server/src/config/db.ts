import mongoose from "mongoose";
import { CONFIG } from "./config";

mongoose.set("strictQuery", true);

export const connectDatabase = async () => {
  try {
    await mongoose.connect(CONFIG.DATABASE_URL);
    console.log("Database connected");
  } catch (error) {
    console.log("Could not connect to Database", error);
  }
};
