import express from "express";
import {
  handleCreateNew,
  handleGetAllProducts,
  handleReaction,
  handleAddBid,
  handleGetBids,
} from "../../controller/product.controller.js";
import { productValidation } from "../../validations/productValidations.js";
import { reactionValidation } from "../../validations/commonValidations.js";
import {
  addBidValidation,
  getBidValidation,
} from "../../validations/bid.validations.js";
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
router.get("/:id/bids", getBidValidation, validateRequest, handleGetBids);
router.post("/:id/bid", addBidValidation, validateRequest, handleAddBid);

export default router;
