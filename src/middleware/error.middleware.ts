import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: error.message });
};
