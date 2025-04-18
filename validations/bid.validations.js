import { param, body } from "express-validator";

export const getBidValidation = param("id")
  .notEmpty()
  .withMessage("Product Id is required");

export const amountValidation = body("amount")
  .notEmpty()
  .withMessage("Bid Amount is required")
  .bail()
  .isNumeric()
  .withMessage("Bid amount must be numeric value")
  .bail()
  .custom((value) => value > 0)
  .withMessage("Amount must be a positive number");

export const userIdValidation = body("userId")
  .notEmpty()
  .withMessage("userId is required")
  .bail();

export const addBidValidation = [
  amountValidation,
  userIdValidation,
  getBidValidation,
];
