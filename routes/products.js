import express from "express";
import Product from "../model/product.model.js";
import {
  addProduct,
  getProductById,
  getProducts,
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", upload.none(), addProduct);

router.get("/:id", getProductById);

export default router;
