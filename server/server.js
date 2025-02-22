import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDb } from "./config/db.js";

import ProductRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json()); //allow to use json data in req body
app.use("/api/products", ProductRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  //render react app if any get requests comes for routes other than express routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDb();
  console.log(`server is running http://localhost:${PORT}`);
});
