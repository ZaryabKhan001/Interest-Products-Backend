import { body, param } from "express-validator";
import mongoose from "mongoose";
export const nameValidation = body("name")
  .notEmpty()
  .withMessage("Name is Required");

export const titleValidation = body("title")
  .notEmpty()
  .withMessage("Title is required")
  .bail()
  .isLength({ min: 3 })
  .withMessage("Title must be at least 3 characters long");

export const descriptionValidation = body("description")
  .notEmpty()
  .withMessage("Description is required")
  .bail()
  .isLength({ min: 10 })
  .withMessage("Description must be atleast 10 characters long.");

export const reactionValidation01 = body("type")
  .notEmpty()
  .withMessage("Type is required")
  .isIn(["interested", "notInterested"])
  .withMessage("Type must be either 'interested' or 'notInterested'");

export const reactionValidation02 = param("id")
  .notEmpty()
  .withMessage("ProductId is required")
  .custom((value) => mongoose.Types.ObjectId.isValid(value))
  .withMessage("Invalid ProductID format");

export const reactionValidation = [reactionValidation01, reactionValidation02];
