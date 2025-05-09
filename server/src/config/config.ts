export const CONFIG: {
  DATABASE_URL: string;
  PORT: number;
  JWT_SECRET: string;
} = {
  DATABASE_URL: process.env.MONGODB_DATABASE_CONNECTION_URL || "",
  PORT: parseInt(process.env.PORT || "8080", 10),
  JWT_SECRET: process.env.JWT_SECRET_KEY || "",
};
