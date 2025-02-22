import express, { json } from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();
app.use(express.json()); //allow to use json data in req body

app.post("/api/products", async (req, res) => {
  const product = await req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {}
});

app.listen(5000, () => {
  connectDb();
  console.log("server is running http://localhost:5000");
});

//  WybBsEx0mVWgfYZ5

// mongodb+srv://cphasanulbanna:WybBsEx0mVWgfYZ5@cluster0.1v6hy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
