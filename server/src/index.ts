import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import newsRouter from "./routes/news";
import marketRouter from "./routes/market";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use("/api/news", newsRouter);
app.use("/api/market", marketRouter);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});