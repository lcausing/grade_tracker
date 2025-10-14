import express from "express";
import dotenv from "dotenv";
import "./db.js";
import { login } from "./authController.js";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/login", login);

app.get("/", (req, res) => res.send("Authentication Service is running"));

app.listen(process.env.PORT, () => {
  console.log(`Auth service running on port ${process.env.PORT}`);
});
