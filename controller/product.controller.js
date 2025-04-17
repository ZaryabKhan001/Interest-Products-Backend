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
      return res.json(new ApiError(403, "Error in adding Product"));
    }

    return res.json(
      new ApiResponse(200, response, "Product added successfully")
    );
  } catch (error) {
    console.log("Error in adding Product", error);
    return res.json(
      new ApiError(500, error.message || "Error in adding Product")
    );
  }
};

export const handleGetAllProducts = async (req, res) => {
  try {
    const response = await Product.find().sort({ createdAt: -1 });

    if (!response) {
      return res.json(new ApiError(403, "Error in fetching Products"));
    }

    return res.json(
      new ApiResponse(200, response, "Products fetched successfully")
    );
  } catch (error) {
    console.log("Error in fetching Products", error);
    return res.json(
      new ApiError(500, error.message || "Error in fetching Products")
    );
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
        return res.json(new ApiError(403, "Error in Reacting"));
      }

      return res.json(new ApiResponse(200, response, "Reacted successfully"));
    }
    if (type === "notInterested") {
      const response = await Product.updateOne(
        { _id: id },
        { $inc: { interestedCount: -1 } }
      );

      if (!response) {
        return res.json(new ApiError(403, "Error in Reacting"));
      }

      return res.json(new ApiResponse(200, response, "Reacted successfully"));
    }
  } catch (error) {
    console.log("Error in Reacting", error);
    return res.json(new ApiError(500, error.message || "Error in Reacting"));
  }
};
