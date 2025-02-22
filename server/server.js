import express from "express";
import dotenv from "dotenv";

import { connectDb } from "./config/db.js";

import ProductRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); //allow to use json data in req body
app.use("/api/products", ProductRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log(`server is running http://localhost:${PORT}`);
});
