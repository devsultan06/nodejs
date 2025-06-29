import Product from "../model/product.model.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { name, price, description, category, stock } = req.body;

    if (!name || !price || !description || !category || !stock) {
      const error = new Error("All fields are required");
      error.status = 400;
      return next(error);
    }
    
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      const error = new Error(`Product with name "${name}" already exists`);
      error.status = 409; // 409 Conflict
      return next(error);
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

import mongoose from "mongoose";

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error(`Invalid product ID: ${id}`);
      error.status = 400;
      return next(error);
    }

    const product = await Product.findById(id);

    if (!product) {
      const error = new Error(`No product found with id ${id}`);
      error.status = 404;
      return next(error);
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
