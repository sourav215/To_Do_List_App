import { Request, Response } from "express";
import { ErrorCode } from "../types/apiResponse";
import { sendResponse } from "../utils/sendResponse";
import { UserModel } from "../models/user.model";
import { TodoModel } from "../models/todo.model";

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      sendResponse(res, 404, false, "User not found", null, {
        code: ErrorCode.NOT_FOUND,
        details: `No user found with ID ${id}`,
      });
      return;
    }

    await TodoModel.deleteMany({ userId: id });
    sendResponse(
      res,
      200,
      true,
      "User and their todos deleted successfully",
      null,
      null
    );
  } catch (error) {
    return sendResponse(res, 500, false, "Failed to delete user", null, {
      code: ErrorCode.INTERNAL_ERROR,
      details: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};


export const getAllUsers = async(req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    sendResponse(res, 200, true, "Users fetched successfully", users, null);
  } catch (error) {
    sendResponse(res, 500, false, "Failed to fetch users", null, {
      code: ErrorCode.INTERNAL_ERROR,
      details: error instanceof Error ? error.message : "Unexpected error",
    });
  }
}
