import express from "express";
import {
  handleCreateNew,
  handleGetAllProducts,
  handleReaction,
} from "../../controller/product.controller.js";
import { productValidation } from "../../validations/productValidations.js";
import { reactionValidation } from "../../validations/commonValidations.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
const router = express.Router();

router.get("/", handleGetAllProducts);
router.post("/create", productValidation, validateRequest, handleCreateNew);
router.patch(
  "/:id/reaction",
  reactionValidation,
  validateRequest,
  handleReaction
);

export default router;
