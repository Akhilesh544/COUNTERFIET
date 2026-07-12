import type {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token required",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token required",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(
      token,
      jwtSecret
    ) as {
      userId: string;
    };
    console.log("Decoded Token:", decoded);
    console.log("User ID:", decoded.userId);

    req.userId = decoded.userId;

    next();
  } catch (error) {
   console.error("JWT ERROR:", error);

  return res.status(401).json({
    message: "Invalid or expired token",
    error: error instanceof Error ? error.message : String(error),
  });
  }
};