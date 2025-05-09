import { Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { ErrorCode } from "../types/apiResponse";
import { TodoModel } from "../models/todo.model";
import { JwtPayload } from "../types/jwt";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const getTodos = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const todos = await TodoModel.find({ userId: req.user?.id });
    return sendResponse(
      res,
      200,
      true,
      "Todos fetched successfully",
      todos,
      null
    );
  } catch (error) {
    sendResponse(res, 500, false, "Failed to fetch todos", null, {
      code: ErrorCode.INTERNAL_ERROR,
      details: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};

export const createTodo = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { title } = req.body;
    const todo = await TodoModel.create({
      userId: req.user?.id,
      title: title,
    });

    return sendResponse(
      res,
      201,
      true,
      "Todo created successfully",
      todo,
      null
    );
  } catch (error) {
    sendResponse(res, 500, false, "Failed to create todo", null, {
      code: ErrorCode.INTERNAL_ERROR,
      details: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};

export const updateTodo = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findOneAndUpdate(
      { _id: id, userId: req.user?.id },
      req.body,
      { new: true }
    );
    if (!todo) {
      sendResponse(res, 404, false, "Todo not found", null, {
        code: ErrorCode.NOT_FOUND,
        details: `No todo found with id ${id} for this user.`,
      });
      return;
    }

    sendResponse(res, 200, true, "Todo updated successfully", todo, null);
  } catch (error) {
    sendResponse(res, 500, false, "Failed to update todo", null, {
      code: ErrorCode.INTERNAL_ERROR,
      details: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};

export const deleteTodo = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.deleteOne({ _id: id });

    if (!todo.deletedCount) {
      sendResponse(res, 404, false, "Todo not found", null, {
        code: ErrorCode.NOT_FOUND,
        details: `No todo found with id ${id} for this user.`,
      });
      return;
    }

    sendResponse(res, 200, true, "Todo deleted successfully", null, null);
  } catch (error) {
    sendResponse(res, 500, false, "Failed to delete todo", null, {
      code: ErrorCode.INTERNAL_ERROR,
      details: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};
