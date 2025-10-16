import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { getResults, getStudentResults } from "./resultController.js";


dotenv.config();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

//app.get("/", (req, res) => res.send("Show Results Service is running"));
app.get("/results", getResults);
app.get("/results/:studentName", getStudentResults);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "results.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`📊 Show Results Service running on port ${process.env.PORT || 5000}`);
});
