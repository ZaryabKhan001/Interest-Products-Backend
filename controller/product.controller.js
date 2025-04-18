import { ApiError } from "../services/ApiError.js";
import { ApiResponse } from "../services/ApiResponse.js";
import Product from "../models/product.model.js";

export const handleCreateNew = async (req, res) => {
  try {
    const { name, title, description, price } = req.body;

    const newProduct = await Product.create({
      createdBy: name,
      title,
      description,
      price,
    });

    const response = await newProduct.save();

    if (!response) {
      return res.status(403).json(new ApiError(403, "Error in adding Product"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, response, "Product added successfully"));
  } catch (error) {
    console.log("Error in adding Product", error);
    return res
      .status(500)
      .json(new ApiError(500, error.message || "Error in adding Product"));
  }
};

export const handleGetAllProducts = async (req, res) => {
  try {
    const response = await Product.find().sort({ createdAt: -1 });

    if (!response) {
      return res
        .status(403)
        .json(new ApiError(403, "Error in fetching Products"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, response, "Products fetched successfully"));
  } catch (error) {
    console.log("Error in fetching Products", error);
    return res
      .status(500)
      .json(new ApiError(500, error.message || "Error in fetching Products"));
  }
};

export const handleReaction = async (req, res) => {
  const { type } = req.body;
  const { id } = req.params;
  try {
    if (type === "interested") {
      const response = await Product.updateOne(
        { _id: id },
        { $inc: { interestedCount: 1 } }
      );

      if (!response) {
        return res.status(404).json(new ApiError(404, "Error in Reacting"));
      }

      return res
        .status(200)
        .json(new ApiResponse(200, response, "Reacted successfully"));
    }
    if (type === "notInterested") {
      const response = await Product.updateOne(
        { _id: id },
        { $inc: { interestedCount: -1 } }
      );

      if (!response) {
        return res.status(403).json(new ApiError(403, "Error in Reacting"));
      }

      return res
        .status(200)
        .json(new ApiResponse(200, response, "Reacted successfully"));
    }
  } catch (error) {
    console.log("Error in Reacting", error);
    return res
      .status(500)
      .json(new ApiError(500, error.message || "Error in Reacting"));
  }
};

export const handleAddBid = async (req, res) => {
  const { id } = req.params;
  const { amount, userId } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json(new ApiError(404, "Product not found"));

    product.bids.push({ amount, userId });
    await product.save();

    return res
      .status(200)
      .json(new ApiResponse(200, product.bids, "Bid added successfully"));
  } catch (err) {
    return res.status(500).json(new ApiError(500, "Error in adding bid"));
  }
};

export const handleGetBids = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json(new ApiError(404, "Product not found"));

    return res.status(200).json(
      new ApiResponse(
        200,
        product.bids.sort((a, b) => b.amount - a.amount),
        "Bids fetched successfully"
      )
    );
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
