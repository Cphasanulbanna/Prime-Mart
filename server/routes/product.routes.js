import express from "express";
import mongoose from "mongoose";

import Product from "../models/product.model.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/", createProduct);

router.get("/", getAllProducts);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
