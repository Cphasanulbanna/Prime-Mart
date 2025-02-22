import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {});

app.listen(5000, () => {
  connectDb();
  console.log("server is running http://localhost:5000");
});

//  WybBsEx0mVWgfYZ5

// mongodb+srv://cphasanulbanna:WybBsEx0mVWgfYZ5@cluster0.1v6hy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
