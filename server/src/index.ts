import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import newsRouter from "./routes/news";
import marketRouter from "./routes/market";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: ["http://localhost:5173", "https://gleaming-banoffee-3e9705.netlify.app"] }));
app.use(express.json());

app.use("/api/news", newsRouter);
app.use("/api/market", marketRouter);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});