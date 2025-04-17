import { validationResult } from "express-validator";
import { ApiError } from "../services/ApiError.js";
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(new ApiError(400, errors.array()));
  }

  next();
};
