import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.model";
import { generateToken } from "../utils/jwt";
import { generateCustomId } from "../utils/generateCustomId";
import { sendResponse } from "../utils/sendResponse";
import { ErrorCode } from "../types/apiResponse";



export const registerNewUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      sendResponse(res, 400, false, "User already exist", null, {
        code: ErrorCode.VALIDATION_ERROR,
        details: "An account with this email already exists.",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customId = await generateCustomId();

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      userCode: customId,
    });

    const token = generateToken(user.id, user.userCode, user.role);

    sendResponse(res, 201, true, "User registered successfully", { token });
  } catch (error) {
    sendResponse(res, 500, false, "Registration failed", null, {
      code: ErrorCode.INTERNAL_ERROR,
      details: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const dbUser = await UserModel.findOne({ email });
    if (!dbUser) {
      sendResponse(res, 401, false, "Invalid credentials", null, {
        code: ErrorCode.UNAUTHORIZED,
        details: "Email or password is incorrect.",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordValid) {
      return sendResponse(res, 401, false, "Invalid credentials", null, {
        code: ErrorCode.UNAUTHORIZED,
        details: "Email or password is incorrect.",
      });
    }
    const token = generateToken(dbUser?.id, dbUser?.userCode, dbUser?.role);
    return sendResponse(res, 200, true, "Login successful", { token });
  } catch (error) {
    sendResponse(res, 500, false, "Login failed", null, {
      code: ErrorCode.INTERNAL_ERROR,
      details: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};
